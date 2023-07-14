import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import {
  addPost,
  getPostsByUser,
  updatePostsByUser,
  getAllPosts,
  getLikedPostsByUser,
} from "../controllers/postController.js";

const router = express.Router();
router.post("/addPost", verifyToken, addPost);
router.get("/getPostByUser/:id", verifyToken, getPostsByUser);
router.get("/getAllPost/:userId", verifyToken, getAllPosts);
router.put("/updatePost", verifyToken, updatePostsByUser);
router.get("/getLikedPostsByUser/:userId", verifyToken, getLikedPostsByUser);

export default router;
