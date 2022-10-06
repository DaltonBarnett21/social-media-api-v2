import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";
const router = express.Router();

router.post("/", createPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.put("/:id/like", likePost);

router.get("/:id", getPost);

router.post("/timeline/userFeed", getTimelinePosts);

export default router;
