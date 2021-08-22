import { UserApplicationService } from 'backend/application/UserApplicationService';
import { UserId } from 'backend/domain/model/UserId';
import { UserRepository } from 'backend/infrastructure/UserRepository';
import express from 'express';

const router = express.Router();

router.get(
  '/',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = new UserId(req.query.id);
      const userRepository = new UserRepository();
      const userApplicationService = new UserApplicationService(userRepository);

      res.json(await userApplicationService.getUser(userId));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
