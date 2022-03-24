import { Router } from 'express';
const router = Router();

import { isNotLoggedIn } from '../../lib/middleware.js';
import authController from './authController.js';

router.post('/signup', isNotLoggedIn, authController.signUp);
router.post('/signin', isNotLoggedIn, authController.signIn);

export default router;
