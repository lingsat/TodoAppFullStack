import bcrypt from 'bcryptjs';
import { User } from '../entities/User.entity';
import { IUser } from '../types/user.type';

export default class UserService {
  async addUser(email: string, password: string): Promise<IUser | null> {
    const userExist = await User.findOneBy({ email });
    if (!userExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = User.create({ email, password: hashedPassword });
      await newUser.save();
      return newUser;
    }
    return null;
  }

  async getUser(email: string): Promise<IUser | null> {
    const user = await User.findOne({
      select: {
        id: true,
        email: true,
        password: true
      },
      where: { email }
    });
    return user;
  }

  async updateUserEmail(id: number, newEmail: string): Promise<IUser | null> {
    const newEmailExist = await User.findBy({ email: newEmail });
    if (newEmailExist.length === 0) {
      const user = await User.findOne({
        select: {
          id: true,
          email: true,
          password: true
        },
        where: { id }
      });
      if (user) {
        user.email = newEmail;
        await user.save();
        return user;
      }
    }
    return null;
  }

  async updateUserPassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<string | null> {
    const user = await User.findOne({
      select: {
        id: true,
        email: true,
        password: true
      },
      where: { id }
    });
    if (user && (await bcrypt.compare(String(oldPassword), String(user.password)))) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return 'Password updated successfully!';
    }
    return null;
  }
}
