import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import {
  addPost,
  getPostsByUser,
  updatePostsByUser,
  getAllPosts,
} from "../controllers/postController.js";

const router = express.Router();
router.post("/addPost", verifyToken, addPost);
router.get("/getPostByUser/:id", verifyToken, getPostsByUser);
router.get("/getAllPost", verifyToken, getAllPosts);
router.put("/updatePost", verifyToken, updatePostsByUser);

export default router;
