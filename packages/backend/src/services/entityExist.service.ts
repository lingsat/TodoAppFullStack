import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';

export const todoExist = async (id: number) => {
  const todo = await Todo.findOneBy({ id });
  return !!todo;
};

export const userExist = async (id: number) => {
  const user = await User.findOneBy({ id });
  return !!user;
};
