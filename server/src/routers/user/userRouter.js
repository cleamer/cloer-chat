import { Router } from 'express';
const router = Router();

import { isLoggedIn, isNotLoggedIn } from '../../lib/middleware.js';
import userController from './userController.js';

router.post('/', isNotLoggedIn, userController.createUser);
router.use(isLoggedIn);
router.get('/in/:roomId', userController.joinRoom);
router.get('/out/:roomId', userController.leaveRoom);

export default router;
