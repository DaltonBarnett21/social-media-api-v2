import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  const { userId } = req.body;
  if (userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account updated!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("this is not your account");
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("Not allowed!");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const followUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed!");
      } else {
        res.status(403).json("already following!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Unable to follow your self");
  }
};

export const unfollowUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.body.userId } });
        res.status(200).json("user has been unfollowed!");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Unable to unfollow your self");
  }
};
