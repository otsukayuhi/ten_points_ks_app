import express from 'express';

import user from './user';
import users from './users';

const router = express.Router();

router.use('/user', user);
router.use('/users', users);

export default router;
