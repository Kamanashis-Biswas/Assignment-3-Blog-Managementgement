"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof zod_1.ZodError) {
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
exports.errorHandler = errorHandler;
