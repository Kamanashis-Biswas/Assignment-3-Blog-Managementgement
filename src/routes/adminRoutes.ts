import express from 'express';
import { blockUser, deleteAnyBlog } from '../controllers/adminController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = express.Router();

router.patch('/users/:userId/block', authenticate, authorizeAdmin, blockUser);
router.delete('/blogs/:id', authenticate, authorizeAdmin, deleteAnyBlog);

export default router;
