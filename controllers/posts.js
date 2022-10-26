import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import { deleteFile, getObjectSignedUrl } from "../s3/s3.js";
import mongoose from "mongoose";

//create a post
export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//update a post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post has been updated!");
    } else {
      res.status(403).json("you can only update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      if (post.img) {
        await deleteFile(post.img);
      }

      res.status(200).json("post has been deleted!");
    } else {
      res.status(403).json("you can only delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//like and dislike a post
export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked ");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get a post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts
export const getTimelinePosts = async (req, res, next) => {
  const profilePosts = req.query.profilePosts;
  try {
    const currentUser = await User.findById(req.params.id);

    const userPosts = await Post.find({ userId: currentUser._id });
    for (let userPost of userPosts) {
      if (userPost.img) {
        userPost.img = await getObjectSignedUrl(userPost.img);
      }
    }

    let signedImages = [];

    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    for (let friendPost of friendPosts) {
      for (let post of friendPost) {
        if (post.img) {
          post.img = await getObjectSignedUrl(post.img);
        }
      }
    }

    if (profilePosts) {
      res.status(200).json(userPosts);
    } else {
      res.status(200).json(userPosts.concat(...friendPosts, ...signedImages));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
