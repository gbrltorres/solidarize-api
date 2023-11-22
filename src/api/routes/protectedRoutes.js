import { Router } from 'express';
import isAuthenticated from '../../middleware/isAuthenticated.js';

const router = Router();

router.use(isAuthenticated);

export default router;
