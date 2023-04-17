import { Request } from 'express';
import { EStatus } from './status.enum';

export interface ReqWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}
export interface ReqWithUserQuery extends ReqWithUser {
  query: {
    search: string;
    status: EStatus;
    page: string;
  };
}

export interface ReqWithAuthBody extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface ReqWithEmailBody extends Request {
  body: {
    email: string;
  };
}

export interface ReqWithUpdateEmailBody extends Request {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}
