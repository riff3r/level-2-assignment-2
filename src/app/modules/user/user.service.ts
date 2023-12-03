import User from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

export const UserServices = {
  createUserIntoDb,
};
