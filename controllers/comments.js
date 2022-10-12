import Comment from "../models/Comment";
import User from "../models/User";

export const makeComment = async (req, res, next) => {
  const comment = new Comment(req.body);
  try {
    const saveComment = await comment.save();
    res.status(200).json(saveComment);
  } catch (err) {
    res.json(500).json(err);
  }
};
