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
exports.deleteAnyBlog = exports.blockUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Blog_1 = __importDefault(require("../models/Blog"));
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, { isBlocked: true }, { new: true });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
});
exports.blockUser = blockUser;
const deleteAnyBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
});
exports.deleteAnyBlog = deleteAnyBlog;
