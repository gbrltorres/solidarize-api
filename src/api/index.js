import express from 'express';
import protectedRoutes from './routes/protectedRoutes.js'
import authRoutes from './routes/authRoutes.js';

const router = express.Router();

router.use('/protected', protectedRoutes);

router.use('/auth', authRoutes);

export default router;
