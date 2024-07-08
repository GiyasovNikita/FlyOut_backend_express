import { Router } from 'express';
import airlineController from '../controllers/airlineController';

const router = Router();

router.post('/airlines', airlineController.create);
router.get('/airlines', airlineController.getAll);
router.get('/airlines/:id', airlineController.getById);
router.put('/airlines/:id', airlineController.update);
router.delete('/airlines/:id', airlineController.delete);

export default router;
