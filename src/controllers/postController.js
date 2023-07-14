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
    let arr = [];
    let postaArray = [...posts];
    for (let i = 0; i < postaArray?.length; i++) {
      const userPlants = await Plant.findById(postaArray[i]?.plantId);
      const liked = postaArray[i]?.likedBy?.includes(userId);
      postaArray[i].likes = postaArray[i].likedBy.length;
      postaArray[i].liked = liked;
      arr?.push({ post: postaArray[i], plant: userPlants });
    }
    user.posts = arr;
    const { password, plants, ...filteredUser } = user.toObject();

    return res.status(200).json(filteredUser);
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
        const liked = post.likedBy.includes(userId);
        const [postUser, plant] = await Promise.all([
          User.findById(post.userId),
          Plant.findById(post.plantId),
        ]);
        console.log("liked", liked, typeof plant);
        if (liked) {
          post.liked = liked;
          post.likes = post.likedBy.length;
          postUser.posts = post;
          postUser.plants = plant;
          return postUser;
        }
      })
    );

    const filteredArr = arr.filter((item) => item !== undefined);
    console.log("filteredArr", filteredArr);
    res.status(200).json(filteredArr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// export const getLikedPostsByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const posts = await Posts.find({});
//     let postsArray = [];
//     const arr = await Promise.all(
//       posts?.map(async (post) => {
//         const liked = post?.likedBy?.includes(userId);
//         let postUser = await User.findById(post?.userId);
//         let plant = await Plant.findById(post?.plantId);
//         console.log("liked", liked, typeof plant);
//         if (liked) {
//           post.liked = liked;
//           post.likes = post.likedBy.length;
//           postUser.posts = post;
//           postUser.plants = plant;
//           return postUser;
//         }
//         // postsArray?.push(postUser);
//       })
//     );
//     console.log("arr", arr);
//     res.status(200).json(arr);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
export const getAllPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Posts.find({});
    const users = await User.find({});

    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const userPosts = await Posts.find({ userId: user._id });
        let postsObject =
          userPosts?.length > 0 ? userPosts[userPosts?.length - 1] : userPosts;
        if (Object.keys(postsObject).length > 0) {
          const liked = postsObject.likedBy?.includes(userId);
          postsObject.likes = postsObject.likedBy.length;
          postsObject.liked = liked;
        }
        user.posts = postsObject;

        const plantid =
          userPosts?.length > 0 ? userPosts[userPosts?.length - 1] : userPosts;
        const userPlants = await Plant.findById(plantid?.plantId);
        user.plants = userPlants;
        return user;
      })
    );
    const filteredUsers = updatedUsers.map((user) => {
      const { password, ...filteredUser } = user.toObject();

      return filteredUser;
    });
    const newPosts = filteredUsers?.filter((i) => i?.posts?.length > 0);
    res.status(200).json(newPosts);
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
export const savePost = async (payload, plantData) => {
  try {
    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found" };
    }
    const plants = await Plant.findById(plantData?._id);
    if (!plants) {
      return { error: "Plant not found" };
    }
    const newPost = new Posts({
      userId,
      plantId: plantData?._id,
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
