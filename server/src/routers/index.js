import { Router } from 'express';
const router = Router();

import authRouter from './auth/authRouter.js';
router.use('/auth', authRouter);

export default router;
