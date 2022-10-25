import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    await newNotification.save();
    res.status(200).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserNotifications = async (req, res) => {
  const showNotSeen = req.query.showNotSeen;
  const hasNotSeen = [];
  try {
    const notifications = await Notification.find({
      userIdToNotify: req.params.id,
    });

    if (showNotSeen) {
      for (let notification of notifications) {
        if (!notification.hasSeen) {
          hasNotSeen.push(notification);
        }
      }

      res.status(200).json(hasNotSeen);
    } else {
      res.status(200).json(notifications);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUserNotification = async (req, res) => {
  try {
    const updateHasSeenNotification = await Notification.update(
      { userIdToNotify: req.params.userId },
      { $set: { hasSeen: true } },
      { multi: true }
    );
    res.status(200).json(updateHasSeenNotification);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
