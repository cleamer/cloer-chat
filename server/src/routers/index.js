import { Router } from 'express';
const router = Router();

import { isLoggedIn } from '../lib/middleware.js';

import authRouter from './auth/authRouter.js';
import userRouter from './user/userRouter.js';
import roomRouter from './room/roomRouter.js';
import chatRouter from './chat/chatRouter.js';

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use(isLoggedIn);
router.use('/rooms', roomRouter);
router.use('/chats', chatRouter);

export default router;
