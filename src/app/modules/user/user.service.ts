import User from '../user.model';
import { TOrder, TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
  const isUserExist = await User.isUserExists(userData.userId);

  if (isUserExist) {
    throw new Error('User already exists!');
  }

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

const getSingleUserFromDb = async (userId: number) => {
  const isUserExist = await User.isUserExists(userId);

  if (!isUserExist) {
    throw new Error('User not Found');
  }

  const result = await User.findOne({ userId }, { _id: 0, password: 0 });

  return result;
};

const updateSingleUserFromDb = async (userId: number, updatedData: object) => {
  const isUserExist = await User.isUserExists(userId);

  if (!isUserExist) {
    throw new Error('User not Found');
  }

  const result = await User.findOneAndUpdate(
    { userId: Number(userId) },
    { $set: updatedData },
    { new: true },
  );

  return result;
};

const deleteSingleUserFromDb = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  const result = await User.findOneAndDelete({ userId });
  return result;
};

const addProductToOrder = async (userId: number, order: TOrder) => {
  const user = await User.isUserExists(userId);
  if (user) {
    throw new Error('User already exists!');
  }

  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { new: true },
  );

  return result;
};

const getAllOrders = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  const result = await User.findOne({ userId });
  return result || null;
};

const calculateTotalPrice = async (userId: number) => {
  const user = await User.isUserExists(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  const result = await User.findOne({ userId });
  return result?.orders
    ? result.orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0,
      )
    : 0;
};

export const UserServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
  updateSingleUserFromDb,
  deleteSingleUserFromDb,

  addProductToOrder,
  getAllOrders,
  calculateTotalPrice,
};
