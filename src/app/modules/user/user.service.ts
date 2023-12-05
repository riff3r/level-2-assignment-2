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
  const result = await User.aggregate([
    { $match: { userId: Number(userId) } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: {
          firstName: '$fullName.firstName',
          lastName: '$fullName.lastName',
        },
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: {
          street: '$address.street',
          city: '$address.city',
          country: '$address.country',
        },
      },
    },
  ]);

  return result;
};

const updateSingleUserFromDb = async (userId: string, updatedData: object) => {
  const result = await User.findOneAndUpdate(
    { userId: Number(userId) },
    updatedData,
  );

  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserFromDb,
};
