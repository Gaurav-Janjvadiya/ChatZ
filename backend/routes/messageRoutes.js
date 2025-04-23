import { Router } from "express";
import {
  fetchMessages,
  sendMessage,
} from "../controllers/messageController.js";
const router = Router();
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, sendMessage);
router.get("/:name", authMiddleware, fetchMessages);

export default router;
