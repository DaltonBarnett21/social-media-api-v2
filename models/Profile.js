import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  address: {
    type: String,
  },
  isPrivate: {
    default: false,
    type: Boolean,
  },
});

export default mongoose.model("Profile", profileSchema);
