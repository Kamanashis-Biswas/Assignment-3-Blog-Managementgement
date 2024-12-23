import { Response } from 'express';
import Blog from '../models/Blog';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';

const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const createBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = blogSchema.parse(req.body);
    const blog = new Blog({
      title,
      content,
      author: req.user?._id,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: blog,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        statusCode: 400,
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = blogSchema.parse(req.body);
    const blog = await Blog.findOne({ _id: req.params.id, author: req.user?._id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found or you are not authorized to update it',
        statusCode: 404,
      });
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: blog,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        statusCode: 400,
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user?._id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found or you are not authorized to delete it',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

export const getAllBlogs = async (req: AuthRequest, res: Response) => {
  try {
    const { search, sortBy, sortOrder, filter } = req.query;

    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    if (filter) {
      query.author = filter;
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
    }

    const blogs = await Blog.find(query)
      .sort(sortOptions)
      .populate('author', 'name email');

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: 200,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};
