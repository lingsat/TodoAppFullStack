import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validator =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const message = error.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ message });
    }
    next();
  };
