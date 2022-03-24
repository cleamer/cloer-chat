import { Router } from 'express';
const router = Router();

import authController from './authController.js';

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;
