import { UserController } from 'backend/controller/UserController';
import express from 'express';
import { container } from 'tsyringe';

const router = express.Router();
const userController = container.resolve(UserController);

router.use('/user', userController.getUserRouter());
router.use('/users', userController.getUsersRouter());

export default router;
