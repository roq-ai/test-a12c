import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { habitValidationSchema } from 'validationSchema/habits';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.habit
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getHabitById();
    case 'PUT':
      return updateHabitById();
    case 'DELETE':
      return deleteHabitById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHabitById() {
    const data = await prisma.habit.findFirst(convertQueryToPrismaUtil(req.query, 'habit'));
    return res.status(200).json(data);
  }

  async function updateHabitById() {
    await habitValidationSchema.validate(req.body);
    const data = await prisma.habit.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteHabitById() {
    const data = await prisma.habit.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
