import express from 'express';

import points from './points';
import user from './user';
import users from './users';

const router = express.Router();

router.use('/points', points);
router.use('/user', user);
router.use('/users', users);

export default router;
