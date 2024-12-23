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
exports.getAllBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const zod_1 = require("zod");
const blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1),
});
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content } = blogSchema.parse(req.body);
        const blog = new Blog_1.default({
            title,
            content,
            author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        yield blog.save();
        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            statusCode: 201,
            data: blog,
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
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content } = blogSchema.parse(req.body);
        const blog = yield Blog_1.default.findOne({ _id: req.params.id, author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found or you are not authorized to update it',
                statusCode: 404,
            });
        }
        blog.title = title;
        blog.content = content;
        yield blog.save();
        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            statusCode: 200,
            data: blog,
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
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blog = yield Blog_1.default.findOneAndDelete({ _id: req.params.id, author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
});
exports.deleteBlog = deleteBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, sortBy, sortOrder, filter } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }
        if (filter) {
            query.author = filter;
        }
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }
        const blogs = yield Blog_1.default.find(query)
            .sort(sortOptions)
            .populate('author', 'name email');
        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            statusCode: 200,
            data: blogs,
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
exports.getAllBlogs = getAllBlogs;
