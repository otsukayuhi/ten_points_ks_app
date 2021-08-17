import { User } from 'backend/domain/model/User';
import { errorType } from 'backend/error/error';
import { getUser } from 'backend/infrastructure/getUser';
import express from 'express';
import { UserType } from 'types/user';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const user_id = User.transformQueryStringToUserId(req.query.id as string);

  if (User.isValidUserId(user_id)) {
    res.status(400).json(errorType.e4001);
    return;
  }

  try {
    const user = new User(await getUser(user_id));

    if (!user.isExistUser()) {
      res.status(404).json(errorType.e4041);
      return;
    }

    const result: Pick<UserType, 'id' | 'name'> = {
      id: user.getUserId(),
      name: user.getUserName() || '',
    };

    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

export default router;
