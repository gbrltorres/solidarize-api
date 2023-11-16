import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import userRoutes from './userRoutes.js'

const router = Router();

router.use(isAuthenticated);

router.use('/user', userRoutes);

export default router;
