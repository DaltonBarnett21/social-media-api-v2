import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
