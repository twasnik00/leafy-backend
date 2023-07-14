import Notification from "../models/notification.js";
import User from "../models/user.js";
import { sendNotificationToExpo } from "../services/notificationService.js";

export const expoPushNotification = async (req, res) => {
  try {
    await sendNotificationToExpo(req.body)
      .then((response) => {
        console.log("response", response);

        return res.status(200).json({
          message: "Notification successfully Sent",
          result: response,
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotificationByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const notifications = await Notification.find({
      userId: id,
    });
    const user = await User.findById(id);
    const { firstName, lastName, profilePicture } = user.toObject();
    console.log("firstName", firstName);
    res
      .status(200)
      .json({
        notifications,
        firstName: firstName || "",
        lastName: lastName || "",
        profilePicture: profilePicture || "",
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
