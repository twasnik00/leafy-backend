import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    default: "",
  },
  plantId: {
    type: String,
    required: false,
    default: "",
  },
  perenulaPlantId: {
    type: Number,
    required: false,
    default: 0,
  },
  plantPicture: {
    type: String,
    required: false,
    default: "",
  },
  plantName: {
    type: String,
    required: false,
    default: "",
  },
  cycle: {
    type: String,
    required: false,
    default: "",
  },
});

const Favourite = mongoose.model("favouriteSchema", favouriteSchema);

export default Favourite;
