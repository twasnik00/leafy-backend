import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      default: "",
    },
    surName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    mobile: {
      type: String,
      default: "",
      max: 10,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    plants: {
      type: Array,
      defaults: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    notificationEnabled: {
      type: Boolean,
      default: false,
    },
    location: String,
    registeredDate: Date,
    deviceToken:{
      type:String,
      default:''
    }
  },
  { timestamps: true }
);

const User = mongoose.model("userSchema", userSchema);
export default User;
