import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plantId: {
    type: String,
    required: true,
  },
  plantName: {
    type: String,
    required: false,
  },
  plantNotes: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  progressDate: {
    type: Date,
    required: false,
  },
  perenulaPlantId: {
    type: String,
    required: false,
  },
  share: {
    type: String,
    required: false,
  },
  platPosition: {
    type: String,
    required: false,
  },
  plantLat: {
    type: String,
    required: false,
  },
  plantLong: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
});

const Progress = mongoose.model("progressSchema", progressSchema);

export default Progress;
