import crypto from "crypto";
import sharp from "sharp";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../s3/s3.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// upload image to s3 and store reference in database
//upload post image
export const uploadPostImage = async (req, res) => {
  const file = req.file;
  const desc = req.body.desc;
  const imageName = generateFileName();

  const fileBuffer = await sharp(file.buffer).toBuffer();

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

//upload profile image
export const uploadProfileImage = async (req, res) => {
  const file = req.file;
  const imageName = generateFileName();

  const fileBuffer = await sharp(file.buffer).toBuffer();

  req.body.profilePicture = imageName;

  try {
    await uploadFile(fileBuffer, imageName, file.mimetype);
    const updatedUserWithProfilePic = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUserWithProfilePic);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//upload cover image
export const uploadCoverImage = async (req, res) => {
  const file = req.file;
  const imageName = generateFileName();

  const fileBuffer = await sharp(file.buffer).toBuffer();

  req.body.coverPicture = imageName;

  try {
    await uploadFile(fileBuffer, imageName, file.mimetype);
    const updatedUserWithProfilePic = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUserWithProfilePic);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
