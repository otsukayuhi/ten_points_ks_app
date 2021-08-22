import { UserApplicationService } from 'backend/application/UserApplicationService';
import { UserService } from 'backend/domain/service/UserService';
import { UserFactory } from 'backend/factory/UserFactory';
import { UserRepository } from 'backend/infrastructure/UserRepository';
import express from 'express';

const router = express.Router();

router.get(
  '/',
  async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userRepository = new UserRepository();
      const userFactory = new UserFactory();
      const userService = new UserService(userRepository);
      const userApplicationService = new UserApplicationService(
        userRepository,
        userFactory,
        userService
      );

      res.json(await userApplicationService.findAll());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
