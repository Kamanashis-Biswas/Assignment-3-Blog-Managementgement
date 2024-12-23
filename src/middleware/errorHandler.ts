import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: err.errors,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Authentication error',
      statusCode: 401,
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    statusCode: 500,
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
