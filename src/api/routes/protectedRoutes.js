import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import * as ngoController from '../controllers/ngoController.js';

const router = Router();

router.use(isAuthenticated);

router.put('/update', ngoController.updateNgo)

export default router;
