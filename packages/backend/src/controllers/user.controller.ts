import bcrypt from 'bcryptjs';
import UserService from '../services/user.service';
import CustomError from '../utils/errorCreator';
import { generateToken } from '../utils/tokenGenerator';
import { IUser } from '../types/user.type';
import { IMessage } from '../types/message.type';
import {
  ReqWithAuthBody,
  ReqWithEmailBody,
  ReqWithUpdateEmailBody,
  ReqWithUser
} from '../types/userRequest.type';

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: ReqWithAuthBody): Promise<IUser> {
    const { email, password } = req.body;
    const user = await this.userService.addUser(email, password);
    if (user) {
      const token = generateToken({ id: user.id, email: user.email });
      const userRes: IUser = {
        id: user.id,
        email: user.email,
        token
      };
      return userRes;
    }
    throw new CustomError(400, 'User already exists!');
  }

  async loginUser(req: ReqWithAuthBody): Promise<IUser> {
    const { email, password } = req.body;
    const user = await this.userService.getUser(email);
    if (user) {
      const isPasswordCorrect: boolean = await bcrypt.compare(
        String(password),
        String(user.password)
      );
      if (isPasswordCorrect) {
        const token = generateToken({ id: user.id, email: user.email });
        const userRes: IUser = {
          id: user.id,
          email: user.email,
          token
        };
        return userRes;
      }
      throw new CustomError(400, 'Wrong Password!');
    } else {
      throw new CustomError(400, 'User doesn`t found!');
    }
  }

  async getUserInfo(req: ReqWithUser): Promise<IUser> {
    const { email } = req.user;
    const user = await this.userService.getUser(email);
    if (user) {
      const userRes: IUser = { id: user.id, email: user.email };
      return userRes;
    }
    throw new CustomError(400, 'User doesn`t found!');
  }

  async updateUser(req: ReqWithEmailBody): Promise<IUser> {
    const { id } = req.params;
    const { email } = req.body;
    const user = await this.userService.updateUserEmail(+id, email);
    if (user) {
      const userRes: IUser = { id: user.id, email: user.email };
      return userRes;
    }
    throw new CustomError(400, `Update fails! User ${email} already exist!`);
  }

  async updateUserPassword(req: ReqWithUpdateEmailBody): Promise<IMessage> {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const updateResultMsg = await this.userService.updateUserPassword(
      +id,
      oldPassword,
      newPassword
    );
    if (updateResultMsg) {
      return { message: updateResultMsg };
    }
    throw new CustomError(400, 'Update fails! Wrong password!');
  }
}

const userController = new UserController(new UserService());
export default userController;
