import { UserApplicationService } from 'backend/application/UserApplicationService';
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
      const userApplicationService = new UserApplicationService(userRepository);

      res.json(await userApplicationService.getUsers());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
