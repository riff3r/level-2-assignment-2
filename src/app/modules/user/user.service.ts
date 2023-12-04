import User from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

const getAllUserFromDb = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
};
