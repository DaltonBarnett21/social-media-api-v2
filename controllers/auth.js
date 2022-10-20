import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getObjectSignedUrl } from "../s3/s3.js";

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

    const details = {
      id: user._id.toHexString(),
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profilePicture: user.profilePicture
        ? await getObjectSignedUrl(user.profilePicture)
        : user.profilePicture,
      coverPicture: user.coverPicture
        ? await getObjectSignedUrl(user.coverPicture)
        : user.coverPicture,
    };

    console.log(details);

    const token = jwt.sign(details, process.env.JWT);

    res.status(200).json({ token, details });
  } catch (err) {
    new Error(err);
  }
};

//this endpoint its hit when the browser is refreshed, if there's a token reach out to this and verify the valid token and return user info back
export const verifyUserToken = (req, res) => {
  let token = req.body.token;
  if (!token) return res.status(401).json("Token is required!");

  jwt.verify(token, process.env.JWT, async (err, user) => {
    if (err) throw err;

    const foundUser = await User.findOne({ _id: user.id });

    const details = {
      id: user.id,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      username: foundUser.username,
      profilePicture: foundUser.profilePicture
        ? await getObjectSignedUrl(foundUser.profilePicture)
        : foundUser.profilePicture,
      coverPicture: foundUser.coverPicture
        ? await getObjectSignedUrl(foundUser.coverPicture)
        : foundUser.coverPicture,
    };

    const token = jwt.sign(details, process.env.JWT);

    res.json({ token, details });
  });
};
