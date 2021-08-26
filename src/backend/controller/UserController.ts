import { UserApplicationService } from 'backend/application/UserApplicationService';
import { UserId } from 'backend/domain/model/UserId';
import express from 'express';
import { container, injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(
    private readonly userApplicationService: UserApplicationService
  ) {}

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

          res.json(await this.userApplicationService.find(userId));
        } catch (error) {
          next(error);
        }
      }
    );

    return router;
  }

  public getUserListRouter(): express.Router {
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
