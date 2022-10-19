import express from "express";
const router = express.Router();
import {
  createProfile,
  updateProfile,
  getProfile,
} from "../controllers/profile.js";

router.post("/", createProfile);

router.get("/:userId", getProfile);

router.put("/:id", updateProfile);

export default router;
