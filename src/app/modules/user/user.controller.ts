import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { TOrder } from './user.interface';
import { UserZodSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Data Validation Using Zod
    const validatedData = UserZodSchema.parse(userData);

    const result = await UserServices.createUserIntoDb(validatedData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const result = await UserServices.updateSingleUserFromDb(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await UserServices.deleteSingleUserFromDb(userId);

  try {
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const product: TOrder = req.body;

    const result = await UserServices.addProductToOrder(userId, product);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await UserServices.getAllOrders(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: user?.orders || [],
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err,
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const totalPrice = await UserServices.calculateTotalPrice(userId);

    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  allUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addProductToOrder,
  getAllOrders,
  calculateTotalPrice,
};
