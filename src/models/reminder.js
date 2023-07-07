import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plantID:{
    type: String,
    required: true,
  },
  reminderTag: {
    type: String,
    required: true,
  },
  reminderDate: {
    type: Date,
    required: true,
  },
});

const Reminder = mongoose.model("reminderSchema", reminderSchema);

export default Reminder;