import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  const newProfile = new Profile(req.body);
  try {
    const savedProfile = await newProfile.save();
    res.status(200).json(savedProfile);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProfile = (req, res) => {};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
};
