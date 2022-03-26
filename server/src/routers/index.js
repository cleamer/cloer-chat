import { Router } from 'express';
const router = Router();

import { isLoggedIn } from '../lib/middleware.js';

import authRouter from './auth/authRouter.js';
import roomRouter from './room/roomRouter.js';

router.use('/auth', authRouter);
// TODO: use isLoggedIn
router.use('/rooms', roomRouter);

export default router;
