// src/routes/seatRoutes.js
import { Router } from 'express';
const router = Router();
import { getSeatMap } from '../../controllers/seatController';

router.get('/', getSeatMap);

export default router;
