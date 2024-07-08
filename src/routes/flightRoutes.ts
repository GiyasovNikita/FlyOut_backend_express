import { Router } from 'express';
import flightController from '../controllers/flightController';

const router = Router();

router.post('/flights', flightController.create);
router.get('/flights', flightController.getAll);

router.get('/flights/filter', flightController.filterFlights);

router.get('/flights/:id', flightController.getById);

router.put('/flights/:id', flightController.update);
router.delete('/flights/:id', flightController.delete);

export default router;
