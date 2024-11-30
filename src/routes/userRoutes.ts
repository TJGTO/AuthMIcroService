import { Router } from "express";
import {
  createUserController,
  loginUserController,
  getUserDetailsController,
} from "../controller/userController";
import authenticateJWT from "../middleware/jwt";

const router = Router();

// Route for creating a user
router.post("/user/create", createUserController);

router.post("/user/login", loginUserController);

router.get("/user/details", authenticateJWT, getUserDetailsController);

export default router;
