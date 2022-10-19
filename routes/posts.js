import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
import { verifyUser } from "../jwt/verifyToken.js";
const router = express.Router();

router.post("/:id", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.put("/:id/like", likePost);

router.get("/:id", getPost);

router.get("/timeline/:id", getTimelinePosts);

export default router;
