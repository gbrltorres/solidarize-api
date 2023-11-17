import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import ngoRoutes from './ngoRoutes.js'

const router = Router();

router.use(isAuthenticated);

router.use('/ong', ngoRoutes);

export default router;
