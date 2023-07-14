import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  notificationId: {
    type: String,
    required: true,
  },
  notificationDate: {
    type: Date,
    required: true,
  },
  notificationPayload: {
    type: Object,
    required: true,
  },
});

const Notification = mongoose.model("notificationSchema", notificationSchema);

export default Notification;
