import { IUser } from './user.type';

export interface ITodo {
  title: string;
  description: string;
  isComplete: boolean;
  isPrivate: boolean;
  id?: number;
  user?: IUser;
}

export interface ITodoWithCount {
  todos: ITodo[];
  count: number;
  nextPage: number | undefined;
}
