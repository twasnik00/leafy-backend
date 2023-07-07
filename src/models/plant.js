import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  perenulaPlantId: {
    type: Number,
    required: true,
    unique: true,
  },
  plantDob: {
    type: Date,
    required: true,
  },
  plantLat: {
    type: Number,
    required: true,
  },
  plantLong: {
    type: Number,
    required: true,
  },
  plantName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  scientific_name: {
    type: Array,
    required: true,
  },
  dimension: {
    type: String,
    required: false,
    default: "",
  },
  plantDescription: {
    type: String,
    required: true,
    min: 2,
    max: 1000,
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  state: {
    type: String,
    required: false,
    default: "",
  },
  platPosition: {
    type: String,
    required: true,
  },
  shareSocialFeed: {
    type: Boolean,
    default: false,
  },
  plantPicture:{
    type:String,
    required:true,
  },
  plantProgress: {
    type: Array,
    required: true,
  },
  sunlight: {
    type: Array,
    required: true,
  },
  edible_leaf: {
    type: Number,
    required: false,
    default: 0,
  },
  indoor: {
    type: Number,
    required: false,
    default: 0,
  },
  watering: {
    type: String,
    required: false,
    default: "",
  },
  maintenance: {
    type: String,
    required: false,
    default: "",
  },
  createdPlantData: {
    type: Date,
    default: "",
  },
  reminders: {
    type: String,
    default: "MONTHLY",
  },
});

const Plant = mongoose.model("plantSchema", plantSchema);

export default Plant;
