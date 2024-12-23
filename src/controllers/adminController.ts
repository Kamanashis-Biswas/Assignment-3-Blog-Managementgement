import { Request, Response } from 'express';
import User from '../models/User';
import Blog from '../models/Blog';

export const blockUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
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

export const deleteAnyBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
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
