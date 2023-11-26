import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import * as ngoController from '../controllers/ngoController.js';

const router = Router();

router.use(isAuthenticated);

router.put('/update', ngoController.updateNgo)

router.get('/list-category', ngoController.listByCategory)

export default router;
