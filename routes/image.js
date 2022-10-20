import express from "express";
import multer from "multer";
import {
  uploadCoverImage,
  uploadPostImage,
  uploadProfileImage,
} from "../controllers/image.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/:userId", upload.single("image"), uploadPostImage);

router.put(
  "/:userId/profile-image",
  upload.single("image"),
  uploadProfileImage
);

router.put("/:userId/cover-image", upload.single("image"), uploadCoverImage);

export default router;
