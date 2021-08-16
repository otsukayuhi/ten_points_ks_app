import express from 'express';

import points from './points';
import users from './users';

const router = express.Router();

router.use('/points', points);
router.use('/users', users);

export default router;
