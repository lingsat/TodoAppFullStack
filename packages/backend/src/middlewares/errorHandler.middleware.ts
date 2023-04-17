import { Request, Response } from 'express';

export const errorHandler = (error: any, _req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ message });
};
