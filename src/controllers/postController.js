import Plant from "../models/plant.js";
import Posts from "../models/posts.js";
import User from "../models/user.js";

export const addPost = async (req, res) => {
  try {
    const { userId, plantId, likes } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const plants = await Plant.findById(plantId);
    if (!plants) {
      return res.status(404).json({ error: "Plant not found" });
    }
    const newPost = new Posts({
      userId,
      plantId,
      postedDate: new Date(),
      postedTime: new Date(),
      likes,
    });
    const result = await newPost.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Posts.find({
      userId: userId,
    });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
     user.posts = posts;
    const { password, ...filteredUser } = user.toObject();
   
    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    const users = await User.find({});

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const userPosts = await Posts.find({ userId: user._id });
        user.posts = userPosts;
        return user;
      })
    );
    const filteredUsers = updatedUsers.map((user) => {
      const { password, ...filteredUser } = user.toObject();
      return filteredUser;
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const updatePostsByUser = async (req, res) => {
  try {
    const updatedData = req.body;
    const user = await User.findById(updatedData.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Posts.findByIdAndUpdate(updatedData._id, updatedData, {
      new: true,
    });
    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
