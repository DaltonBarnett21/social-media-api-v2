import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
  commentOnPost,
} from "../controllers/posts.js";
const router = express.Router();

router.post("/", createPost);

router.post("/:postId/comment", commentOnPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

router.put("/:id/like", likePost);

router.get("/:id", getPost);

router.get("/timeline/:userId", getTimelinePosts);

export default router;
