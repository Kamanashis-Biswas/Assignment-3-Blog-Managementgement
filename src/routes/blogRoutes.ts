import express from 'express';
import { createBlog, updateBlog, deleteBlog, getAllBlogs } from '../controllers/blogController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticate, createBlog);
router.patch('/:id', authenticate, updateBlog);
router.delete('/:id', authenticate, deleteBlog);
router.get('/', getAllBlogs);

export default router;
