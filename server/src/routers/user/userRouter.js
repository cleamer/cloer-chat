import { Router } from 'express';
const router = Router();

import { isLoggedIn, isNotLoggedIn } from '../../lib/middleware.js';
import userController from './userController.js';

router.post('/signup', isNotLoggedIn, userController.createUser);

export default router;
