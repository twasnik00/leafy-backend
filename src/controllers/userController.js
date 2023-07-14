import mongoose from "mongoose";
import Plant from "../models/plant.js";
import User from "../models/user.js";
import Posts from "../models/posts.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...filteredUser } = user.toObject();
    return res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const plants = await Plant.find({
      userId: userId,
    });
    const posts = await Posts.find({
      userId: userId,
    });
    if (plants) {
      user.plants = plants;
    }
    if (posts) {
      user.posts = posts;
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...filteredUser } = user.toObject();
    return res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
