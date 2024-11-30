"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const jwt_1 = __importDefault(require("../middleware/jwt"));
const router = (0, express_1.Router)();
// Route for creating a user
router.post("/user/create", userController_1.createUserController);
router.post("/user/login", userController_1.loginUserController);
router.get("/user/details", jwt_1.default, userController_1.getUserDetailsController);
exports.default = router;
