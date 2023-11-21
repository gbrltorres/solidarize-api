import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import ngoRoutes from './ngoRoutes.js'

const router = Router();

router.use(isAuthenticated);

export default router;
