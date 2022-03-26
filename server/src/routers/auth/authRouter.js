import { Router } from 'express';
const router = Router();

import { isLoggedIn, isNotLoggedIn } from '../../lib/middleware.js';
import authController from './authController.js';

router.post('/', isNotLoggedIn, authController.signIn);
router.get('/', isLoggedIn, authController.signOut);

export default router;
