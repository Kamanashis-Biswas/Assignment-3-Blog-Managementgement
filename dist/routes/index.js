"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const router = express_1.default.Router();
router.use('/auth', authRoutes_1.default);
router.use('/blogs', blogRoutes_1.default);
router.use('/admin', adminRoutes_1.default);
exports.default = router;
