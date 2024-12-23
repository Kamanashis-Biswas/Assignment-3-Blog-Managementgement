import express from 'express';
import authRoutes from './authRoutes';
import blogRoutes from './blogRoutes';
import adminRoutes from './adminRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/admin', adminRoutes);

export default router;