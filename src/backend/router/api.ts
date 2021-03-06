import { UserController } from 'backend/controller/UserController';
import express from 'express';
import { container } from 'tsyringe';

const router = express.Router();
const userController = container.resolve(UserController);

router.use('/user', userController.getUserRouter());
router.use('/user_list', userController.getUserListRouter());

export default router;
