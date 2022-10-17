import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/image.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/:userId", upload.single("image"), uploadImage);

export default router;
