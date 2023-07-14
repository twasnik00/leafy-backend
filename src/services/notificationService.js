import { Expo } from "expo-server-sdk";
import Notification from "../models/notification.js";
import User from "../models/user.js";

export const sendNotificationToExpo = async (req) => {
  try {
    // Create a new Expo SDK client
    let response = [];
    const { userId, title, body, data } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { deviceToken } = user.toObject();
    // Prepare the push notification message
    const pushMessage = {
      to: JSON.parse(deviceToken),
      sound: "default",
      title: title,
      body: body,
      data: data,
    };
    const expo = new Expo();
    await expo
      .sendPushNotificationsAsync([pushMessage])
      .then((ticket) => {
        console.log("Notification ticket:", ticket);
        response = ticket;
        ticket?.forEach(async (item) => {
          if (item?.status === "ok") {
            const newNotification = new Notification({
              userId,
              notificationId: item?.id,
              notificationDate: new Date(),
              notificationPayload: {
                title: title,
                body: body,
                data: data,
              },
            });
            await newNotification.save();
          }
        });
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
};
