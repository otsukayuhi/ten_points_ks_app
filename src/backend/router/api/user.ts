import { errorType } from 'backend/error/error';
import { getUser } from 'backend/repository/getUser';
import express from 'express';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const id = Number(req.query.id) || 0;

  if (id === 0) {
    res.status(400).json(errorType.e4001);
    return;
  }

  try {
    const users = await getUser(id);

    // TODO: isExistUser() と同じことしているので、なんとかしたい。
    if (users.length === 0) {
      res.status(404).json(errorType.e4041);
      return;
    }

    res.json(users[0]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
