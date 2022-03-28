import { Router } from 'express';
const router = Router();

import roomController from './roomController.js';

router.post('/', roomController.createRoom);
router.get('/', roomController.getAllRooms);
router.delete('/', roomController.deleteRoom);

export default router;
