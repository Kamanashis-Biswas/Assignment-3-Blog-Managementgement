"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.patch('/users/:userId/block', auth_1.authenticate, auth_1.authorizeAdmin, adminController_1.blockUser);
router.delete('/blogs/:id', auth_1.authenticate, auth_1.authorizeAdmin, adminController_1.deleteAnyBlog);
exports.default = router;
