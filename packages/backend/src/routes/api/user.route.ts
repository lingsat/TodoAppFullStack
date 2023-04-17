import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { tryCatch } from '../../middlewares/tryCatch.middleware';
import { validator } from '../../middlewares/validator.middleware';
import { isExist } from '../../middlewares/isExist.middleware';
import { auth } from '../../middlewares/auth.middleware';
import { userExist } from '../../services/entityExist.service';
import { changePasswordSchema, emailSchema, userAuthSchema } from '../../models/User';

const userRouter: Router = Router();

// Register new User
userRouter.post(
  '/register',
  validator(userAuthSchema),
  tryCatch(userController.registerUser.bind(userController))
);

// Login User
userRouter.post(
  '/login',
  validator(userAuthSchema),
  tryCatch(userController.loginUser.bind(userController))
);

// Get User Info
userRouter.get('', auth, tryCatch(userController.getUserInfo.bind(userController)));

// Change User email
userRouter.put(
  '/profile/:id',
  auth,
  isExist(userExist),
  validator(emailSchema),
  tryCatch(userController.updateUser.bind(userController))
);

// Change User password
userRouter.put(
  '/password/:id',
  auth,
  isExist(userExist),
  validator(changePasswordSchema),
  tryCatch(userController.updateUserPassword.bind(userController))
);

export default userRouter;
