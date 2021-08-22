import { UserApplicationService } from 'backend/application/UserApplicationService';
import { UserId } from 'backend/domain/model/UserId';
import express from 'express';
import { container } from 'tsyringe';

export class UserController {
  public getUserRouter(): express.Router {
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
          const userApplicationService = container.resolve(
            UserApplicationService
          );

          res.json(await userApplicationService.find(userId));
        } catch (error) {
          next(error);
        }
      }
    );

    return router;
  }

  public getUsersRouter(): express.Router {
    const router = express.Router();
    router.get(
      '/',
      async (
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const userApplicationService = container.resolve(
            UserApplicationService
          );

          res.json(await userApplicationService.findAll());
        } catch (error) {
          next(error);
        }
      }
    );

    return router;
  }
}
