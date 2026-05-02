import express from "express";
import {
  getAllQuizzesForModeration,
  getQuizByIdForModeration,
  approveQuiz,
  rejectQuiz,
  getQuizStats
} from "../controller/quiz.admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Quiz moderation routes - protected and admin-only
router.get("/", protect, adminOnly, getAllQuizzesForModeration);
router.get("/:id", protect, adminOnly, getQuizByIdForModeration);
router.patch("/:id/approve", protect, adminOnly, approveQuiz);
router.patch("/:id/reject", protect, adminOnly, rejectQuiz);
router.get("/stats", protect, adminOnly, getQuizStats);

export default router;