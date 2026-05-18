import { Router } from 'express';
import {
  getShipments,
  createShipment,
  updateStatus,
} from '../controllers/shipmentController.js';

const router = Router();

router.get('/',         getShipments);
router.post('/',        createShipment);
router.patch('/:id/status', updateStatus);

export default router;