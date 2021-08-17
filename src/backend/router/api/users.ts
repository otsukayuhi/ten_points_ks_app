import { getUsers } from 'backend/infrastructure/getUsers';
import express from 'express';

const router = express.Router();

router.get('/', async (_req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

export default router;
