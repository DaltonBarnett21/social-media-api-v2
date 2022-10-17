import crypto from "crypto";
import sharp from "sharp";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../s3/s3.js";
import Post from "../models/Post.js";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// upload image to s3 and store reference in database

export const uploadImage = async (req, res) => {
  const file = req.file;
  console.log(file);
  const desc = req.body.desc;
  const imageName = generateFileName();

  const fileBuffer = await sharp(file.buffer)
    // .resize({ height: 700, width: 1200, fit: "contain" })
    .toBuffer();

  const newPost = new Post({
    userId: req.params.userId,
    img: imageName,
    desc: desc,
  });

  try {
    await uploadFile(fileBuffer, imageName, file.mimetype);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
