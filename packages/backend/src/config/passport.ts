import { JwtPayload } from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { User } from '../entities/User.entity';

export const setStrategy = (passport: PassportStatic) => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(
    new Strategy(opts, async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await User.findOneBy({ id: jwt_payload.id });

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
