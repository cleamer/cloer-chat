import { Router } from 'express';
const router = Router();

import { isLoggedIn, isNotLoggedIn } from '../../lib/middleware.js';
import authController from './authController.js';

router.post('/signup', isNotLoggedIn, authController.signUp);
router.post('/signin', isNotLoggedIn, authController.signIn);
router.get('/signout', isLoggedIn, authController.signOut);

export default router;
