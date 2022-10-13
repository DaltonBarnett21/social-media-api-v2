import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

//make comment
export const commentOnPost = async (req, res, next) => {
  const comment = new Comment(req.body);
  try {
    const newComment = await comment.save();
    const post = await Post.findById(req.params.postId);
    await post.updateOne({ $push: { comments: newComment._id } });
    res.status(200).json("commented on post!");
  } catch (err) {
    res.status(500).json(err);
  }
};

//get comments on post
export const getComments = async (req, res, next) => {
  const commentData = [];
  try {
    const post = await Post.findById(req.params.postId);
    const comments = await Promise.all(
      post.comments.map((commentId) => {
        return Comment.find({ _id: commentId });
      })
    );

    res.status(200).json(commentData.concat(...comments));
  } catch (err) {
    res.status(500).json(err);
  }
};
