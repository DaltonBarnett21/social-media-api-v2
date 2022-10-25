import express from "express";
import {
  createNotification,
  getUserNotifications,
  updateUserNotification,
} from "../controllers/notification.js";
const router = express.Router();

router.post("/", createNotification);

router.get("/:id", getUserNotifications);

router.put("/:userId", updateUserNotification);

export default router;
