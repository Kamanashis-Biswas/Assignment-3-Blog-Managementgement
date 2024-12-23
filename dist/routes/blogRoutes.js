"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/', auth_1.authenticate, blogController_1.createBlog);
router.patch('/:id', auth_1.authenticate, blogController_1.updateBlog);
router.delete('/:id', auth_1.authenticate, blogController_1.deleteBlog);
router.get('/', blogController_1.getAllBlogs);
exports.default = router;
