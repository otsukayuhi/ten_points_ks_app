import { User } from 'backend/domain/model/User';
import { errorType } from 'backend/error/error';
import { getPoints } from 'backend/infrastructure/getPoints';
import { getUser } from 'backend/infrastructure/getUser';
import express from 'express';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const userId = User.transformQueryStringToUserId(req.query.user_id as string);

  if (User.isValidUserId(userId)) {
    res.status(400).json(errorType.e4001);
    return;
  }

  try {
    const user = new User(await getUser(userId));
    if (!user.isExistUser()) {
      res.status(404).json(errorType.e4041);
      return;
    }

    const points = await getPoints(userId);
    res.json(points);
  } catch (error) {
    console.log(error);
  }
});

export default router;
