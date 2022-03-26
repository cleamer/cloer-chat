import { Router } from 'express';
const router = Router();

import roomController from './roomController.js';

router.post('/', roomController.createRoom);
router.post('/:userId', roomController.leaveRoom);
router.get('/:userId', roomController.joinRoom);
router.get('/', roomController.getRooms);
router.delete('/', roomController.deleteRoom);

export default router;
