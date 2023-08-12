import * as yup from 'yup';

export const habitValidationSchema = yup.object().shape({
  habit_name: yup.string().required(),
  training_program: yup.string().required(),
  user_id: yup.string().nullable(),
});
