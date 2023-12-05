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

const getSingleUserFromDb = async (userId: string) => {
  const result = await User.find({ userId }, { _id: 0, password: 0 });

  return result;
};

const updateSingleUserFromDb = async (userId: string, updatedData: object) => {
  const result = await User.findOneAndUpdate(
    { userId: Number(userId) },
    { $set: updatedData },
    { new: true },
  );

  return result;
};

const deleteSingleUserFromDb = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserFromDb,
  deleteSingleUserFromDb,
};
