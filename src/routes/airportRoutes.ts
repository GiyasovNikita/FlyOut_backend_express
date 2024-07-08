import { Router } from 'express';
import airportController from '../controllers/airportController';

const router = Router();

router.post('/airports', airportController.create);
router.get('/airports', airportController.getAll);
router.get('/airports/:id', airportController.getById);
router.put('/airports/:id', airportController.update);
router.delete('/airports/:id', airportController.delete);

export default router;
