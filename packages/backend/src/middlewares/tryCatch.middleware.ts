import { Request, Response, NextFunction } from 'express';

export const tryCatch =
  <T extends Function>(controller: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res, next);
      res.send(response);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
    }
  };
