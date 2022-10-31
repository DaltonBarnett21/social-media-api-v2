import express from "express";
import {
  createConversation,
  getBothUsersConversation,
  getConversation,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/", createConversation);

router.get("/:userId", getConversation);

router.get("/find/:firstUserId/:secondUserId", getBothUsersConversation);

export default router;
