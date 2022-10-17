import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//register
export const register = async (req, res, next) => {
  const { username, email, password, lastname, firstname } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      username: username,
      lastname: lastname,
      firstname: firstname,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json("user not found!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json("Invalid Password");
    }

    console.log(user._id.toHexString());

    const token = jwt.sign({ id: user._id.toHexString() }, process.env.JWT);

    const details = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
    };

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(details);
  } catch (err) {
    new Error(err);
  }
};
