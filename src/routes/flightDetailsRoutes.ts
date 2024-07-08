import { Router } from 'express';
import flightDetailsController from '../controllers/flightDetailsController';

const router = Router();

router.post('/flightdetails', flightDetailsController.create);
router.get('/flightdetails', flightDetailsController.getAll);
router.get('/flightdetails/:id', flightDetailsController.getById);
router.put('/flightdetails/:id', flightDetailsController.update);
router.delete('/flightdetails/:id', flightDetailsController.delete);

export default router;
