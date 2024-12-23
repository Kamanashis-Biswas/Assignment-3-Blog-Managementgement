import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use',
        statusCode: 400,
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'User is blocked',
        statusCode: 403,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { token },
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
