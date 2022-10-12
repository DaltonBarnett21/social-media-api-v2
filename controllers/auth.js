import User from "../models/User.js";
import bcrypt from "bcrypt";

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
    res.status(200).json(user);
  } catch (err) {
    new Error(err);
  }
};
