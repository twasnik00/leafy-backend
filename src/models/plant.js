import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  plantName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  plantDescription: {
    type: String,
    required: true,
    min: 2,
    max: 300,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  platPosition: {
    type: String,
    required: true,
  },
  shareSocialFeed: {
    type: Boolean,
    default: false,
  },
  plantPicture: {
    type: Array,
    required: true,
  },
  createdPlantData: {
    type: Date,
    default: "",
  },
});

const Plant = mongoose.model("plantSchema", plantSchema);

export default Plant;
