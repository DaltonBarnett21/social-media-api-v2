import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  unfollowUser,
  updateUser,
  getUsers,
} from "../controllers/users.js";
const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.put("/:id/follow", followUser);

router.put("/:id/unfollow", unfollowUser);

router.get("/", getUsers);

export default router;
