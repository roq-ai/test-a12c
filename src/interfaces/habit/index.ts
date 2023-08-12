import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HabitInterface {
  id?: string;
  habit_name: string;
  training_program: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface HabitGetQueryInterface extends GetQueryInterface {
  id?: string;
  habit_name?: string;
  training_program?: string;
  user_id?: string;
}
