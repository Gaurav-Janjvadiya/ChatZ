import { Router } from "express";
import {
  register,
  login,
  fetchUsers,
  logout,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/", authMiddleware, fetchUsers);

export default router;
