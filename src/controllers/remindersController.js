import Reminder from "../models/reminder.js";

export const saveReminder = async (payload, plantData) => {
  console.log("payload", payload);
  console.log("plantData", plantData);
  const { userId, reminders } = payload;
  const newReminder = new Reminder({
    userId,
    plantID: plantData?._id || "",
    reminderTag: reminders,
    reminderDate: new Date(),
  });
  const result = await newReminder.save();
  return result;
};
