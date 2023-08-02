import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  progressId: {
    type: String,
    required: true,
  },
  plantId: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  postedTime: {
    type: Date,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    required: false,
    default: false,
  },
  likedBy: {
    type: Array,
    required: false,
    default: [],
  },
});

const Posts = mongoose.model("postsSchema", postsSchema);

export default Posts;
