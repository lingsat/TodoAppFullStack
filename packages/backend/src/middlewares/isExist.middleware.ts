import { Request, Response, NextFunction } from 'express';

type AsyncCallback = (id: number) => Promise<boolean>;

export const isExist =
  (callback: AsyncCallback) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await callback(+id);
    if (!result) {
      return res.status(400).json({ message: 'Item not found!' });
    }
    next();
  };
