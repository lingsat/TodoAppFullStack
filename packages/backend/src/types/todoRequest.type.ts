import { Request } from 'express';
import { EStatus } from './status.enum';

export interface ReqWithNewTodoBody extends Request {
  body: {
    title: string;
    description: string;
    isPrivate: boolean;
    userId: number;
  };
}

export interface ReqWithTodoUpdateBody extends Request {
  body: {
    title: string;
    description: string;
    isPrivate: boolean;
    isComplete: boolean;
  };
}

export interface IQuery {
  search: string;
  status: EStatus;
  page: string;
}
