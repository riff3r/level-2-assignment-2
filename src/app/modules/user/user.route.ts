import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.allUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.put('/:userId', UserControllers.updateSingleUser);

router.delete('/:userId', UserControllers.deleteSingleUser);

router.put('/:userId/orders', UserControllers.addProductToOrder);

router.get('/:userId/orders', UserControllers.getAllOrders);

router.get('/:userId/orders/total-price', UserControllers.calculateTotalPrice);

export const UserRoutes = router;
