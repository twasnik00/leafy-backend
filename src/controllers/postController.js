import Favourite from "../models/favourites.js";
import Plant from "../models/plant.js";
import Posts from "../models/posts.js";
import Progress from "../models/progress.js";
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
      likedBy,
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
    let postaArray = [...posts];
    let progressArray = [];
    for (let i = 0; i < postaArray?.length; i++) {
      const userPlants = await Plant.findById(postaArray[i]?.plantId);
      const [postUser, progressPlants] = await Promise.all([
        User.findById(postaArray[i].userId),
        Progress.findById(postaArray[i].progressId),
      ]);
      const findFavourite = await Favourite.find({
        userId: userId,
        perenulaPlantId: userPlants?.perenulaPlantId,
      });
      const liked = postaArray[i]?.likedBy?.includes(userId);
      if (progressPlants) {
        const progessObj = {
          ...progressPlants.toObject(),
          firstName: postUser.firstName,
          profilePicture: postUser.profilePicture,
          postId: postaArray[i]?._id,
          likes: postaArray[i].likedBy.length,
          liked: liked,
          favourite: findFavourite?.length > 0 ? true : false,
        };
        progressArray.push(progessObj);
      }
    }
    let arr = progressArray?.sort(
      (a, b) => new Date(b?.progressDate) - new Date(a?.progressDate)
    );
    // console.log("progressArray", progressArray);
    return res.status(200).json(arr);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getLikedPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Posts.find({});
    const arr = await Promise.all(
      posts.map(async (post) => {
        let progressArray = [];
        const liked = post.likedBy.includes(userId);
        const [postUser, progressPlants] = await Promise.all([
          User.findById(post.userId),
          Progress.findById(post.progressId),
        ]);
        const userPlants = await Plant.findById(post?.plantId);
        const findFavourite = await Favourite.find({
          userId: userId,
          perenulaPlantId: userPlants?.perenulaPlantId,
        });
        if (liked) {
          if (progressPlants) {
            const progessObj = {
              ...progressPlants.toObject(),
              firstName: postUser.firstName,
              profilePicture: postUser.profilePicture,
              postId: post?._id,
              likes: post.likedBy.length,
              liked: liked,
              favourite: findFavourite?.length > 0 ? true : false,
            };
            progressArray.push(progessObj);
          }
          return progressArray;
        }
      })
    );
    const flattenedArray = arr.flat().filter((item) => item);
    let arrPost = flattenedArray.sort(
      (a, b) => new Date(b?.progressDate) - new Date(a?.progressDate)
    );
    res.status(200).json(arrPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const { userId } = req?.params;
    const users = await User.find({});
    const newPosts = await Promise.all(
      users.map(async (user) => {
        const userPosts = await Posts.find({ userId: user._id });
        let postaArray = [...userPosts];
        let progressArray = []; // Move this inside the map function

        for (let i = 0; i < postaArray?.length; i++) {
          const userPlants = await Plant.findById(postaArray[i]?.plantId);
          const findFavourite = await Favourite.find({
            userId: userId,
            perenulaPlantId: userPlants?.perenulaPlantId,
          });
          const liked = postaArray[i]?.likedBy?.includes(userId);

          const progressPlants = await Progress.findById(
            postaArray[i].progressId
          );
          if (progressPlants) {
            const progessObj = {
              ...progressPlants.toObject(),
              firstName: user.firstName,
              profilePicture: user.profilePicture,
              postId: postaArray[i]?._id,
              likes: postaArray[i].likedBy.length,
              liked: liked,
              favourite: findFavourite?.length > 0 ? true : false,
            };
            progressArray.push(progessObj);
          }
        }

        return progressArray;
      })
    );
    const flattenedArray = newPosts.flat();
    let arr = flattenedArray.sort(
      (a, b) => new Date(b?.progressDate) - new Date(a?.progressDate)
    );
    res.status(200).json(arr);
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
    const post = await Posts.findById(updatedData._id);
    const index = post?.likedBy?.findIndex((i) => i === updatedData?.likedUser);
    if (updatedData?.isLiked) {
      if (index === -1) {
        post?.likedBy?.push(updatedData.likedUser);
      } else {
        post?.likedBy?.splice(index, 1);
      }
    } else {
      post?.likedBy?.splice(index, 1);
    }
    const posts = await Posts.findByIdAndUpdate(updatedData._id, post, {
      new: true,
    });
    if (!posts) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ message: "Post Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const savePost = async (payload, progressId, plantId) => {
  try {
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const plants = await Plant.findById(plantId);
    if (!plants) {
      return { error: "Plant not found" };
    }
    const newPost = new Posts({
      userId,
      progressId: progressId,
      plantId: plantId,
      postedDate: new Date(),
      postedTime: new Date(),
      likes: 0,
    });
    const result = await newPost.save();
    return { meesage: "Posted successfully" };
  } catch (error) {
    return { error: error };
  }
};
