import express from "express";
import {
  commentOnPost,
  deleteComment,
  getComments,
} from "../controllers/comment.js";
const router = express.Router();

router.post("/:postId", commentOnPost);

router.get("/:postId", getComments);

router.delete("/:postId", deleteComment);

export default router;
