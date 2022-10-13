import express from "express";
import { commentOnPost, getComments } from "../controllers/comment.js";
const router = express.Router();

router.post("/:postId", commentOnPost);

router.get("/:postId", getComments);

export default router;
