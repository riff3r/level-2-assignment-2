import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

// router.get('/', UserControllers.getAllUser);

// router.get('/:userId', UserControllers.getSingleUser);

// router.put('/:userId', UserControllers.updateSingleUser);

// router.delete('/:userId', UserControllers.deleteSingleUser);

export const UserRoutes = router;
