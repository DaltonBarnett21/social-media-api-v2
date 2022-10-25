import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: String,
      required: true,
    },
    userIdToNotify: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    hasSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
