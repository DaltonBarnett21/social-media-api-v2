import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
import { verifyUser } from "../verifyTokens/verifyToken.js";
const router = express.Router();

router.post("/", verifyUser, createPost);

router.put("/:id", verifyUser, updatePost);

router.delete("/:id", verifyUser, deletePost);

router.put("/:id/like", verifyUser, likePost);

router.get("/:id", getPost);

router.get("/timeline/:id", verifyUser, getTimelinePosts);

export default router;
