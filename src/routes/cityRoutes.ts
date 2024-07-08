import { Router } from 'express';
import cityController from '../controllers/cityController';

const router = Router();

router.post('/cities', cityController.create);
router.get('/cities', cityController.getAll);
router.get('/cities/:id', cityController.getById);
router.put('/cities/:id', cityController.update);
router.delete('/cities/:id', cityController.delete);

export default router;
