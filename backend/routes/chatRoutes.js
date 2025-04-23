import { Router } from "express";
import { createChat, fetchChats } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createChat)
  .get(authMiddleware, fetchChats);

export default router;
