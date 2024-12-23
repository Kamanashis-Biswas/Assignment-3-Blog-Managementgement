"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = registerSchema.parse(req.body);
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use',
                statusCode: 400,
            });
        }
        const user = new User_1.default({ name, email, password });
        yield user.save();
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                statusCode: 400,
                error: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                statusCode: 500,
            });
        }
    }
});
exports.register = register;
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = yield User_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
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
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            statusCode: 200,
            data: { token },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                statusCode: 400,
                error: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                statusCode: 500,
            });
        }
    }
});
exports.login = login;
