import axios from 'axios';
import queryString from 'query-string';
import { HabitInterface, HabitGetQueryInterface } from 'interfaces/habit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getHabits = async (query?: HabitGetQueryInterface): Promise<PaginatedInterface<HabitInterface>> => {
  const response = await axios.get('/api/habits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createHabit = async (habit: HabitInterface) => {
  const response = await axios.post('/api/habits', habit);
  return response.data;
};

export const updateHabitById = async (id: string, habit: HabitInterface) => {
  const response = await axios.put(`/api/habits/${id}`, habit);
  return response.data;
};

export const getHabitById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/habits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHabitById = async (id: string) => {
  const response = await axios.delete(`/api/habits/${id}`);
  return response.data;
};
