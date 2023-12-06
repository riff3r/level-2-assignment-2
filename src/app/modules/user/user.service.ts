import User from '../user.model';
import { TOrder, TUser } from './user.interface';

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
  const result = await User.findOne({ userId }, { _id: 0, password: 0 });

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

const addProductToOrder = async (userId: string, order: TOrder) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { new: true },
  );

  return result;
};

const getAllOrders = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result || null;
};

const calculateTotalPrice = async (userId: string) => {
  const user = await User.findOne({ userId });
  return user?.orders
    ? user.orders.reduce((acc, order) => acc + order.price * order.quantity, 0)
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
