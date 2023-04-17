import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user.type';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: Error, user: IUser) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!user) {
      return res.status(400).json({ message: 'Unauthorized User!' });
    }

    req.user = user;
    next();
  })(req, res, next);
};
