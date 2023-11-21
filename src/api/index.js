import express from 'express';
import protectedRoutes from './routes/protectedRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ngoRoutes from './routes/ngoRoutes.js'
import authRoutes from './routes/authRoutes.js';

const router = express.Router();

router.use('/protected', protectedRoutes);

router.use('/ngo', ngoRoutes);

router.use('/user', userRoutes);

router.use('/auth', authRoutes);

export default router;
