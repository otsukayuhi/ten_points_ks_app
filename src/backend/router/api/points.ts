import { errorType } from 'backend/error/error';
import { getPoints } from 'backend/repository/getPoints';
import { isExistUser } from 'backend/util/isDuplicated';
import express from 'express';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  const userId = Number(req.query.user_id) || 0;

  if (userId === 0) {
    res.status(400).json(errorType.e4001);
    return;
  }

  try {
    if (!(await isExistUser(userId))) {
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
