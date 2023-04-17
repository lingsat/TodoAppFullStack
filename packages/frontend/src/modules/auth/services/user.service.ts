import { AxiosResponse } from 'axios';
import { HttpService } from '../../common/services/http.service';
import { APP_KEYS } from '../../common/consts';
import { IUserBody } from '../types/userBody.type';
import { IUser } from '../types/user.type';

export class UserService extends HttpService {
  registerUser(user: IUserBody): Promise<AxiosResponse<IUser>> {
    return this.post({
      data: user,
      url: APP_KEYS.BACKEND_KEYS.USER_REGISTER
    });
  }

  loginUser(user: IUserBody): Promise<AxiosResponse<IUser>> {
    return this.post({
      data: user,
      url: APP_KEYS.BACKEND_KEYS.USER_LOGIN
    });
  }

  getUserInfo(): Promise<AxiosResponse> {
    return this.get({ url: APP_KEYS.BACKEND_KEYS.USER }, true);
  }

  updateUserEmail(user: IUserBody): Promise<AxiosResponse<IUser>> {
    const { id, email } = user;
    return this.put(
      {
        data: { email },
        url: `${APP_KEYS.BACKEND_KEYS.USER_PROFILE}/${id!.toString()}`
      },
      true
    );
  }

  updateUserPassword(user: IUserBody): Promise<AxiosResponse<{ message: string }>> {
    const { id, oldPassword, newPassword } = user;
    return this.put(
      {
        data: { oldPassword, newPassword },
        url: `${APP_KEYS.BACKEND_KEYS.USER_PASSWORD}/${id!.toString()}`
      },
      true
    );
  }
}

export const userService = new UserService();
