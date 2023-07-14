import express from "express";
import {
  getUserProfile,
  updateProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../services/tokenValidation.js";

const router = express.Router();
router.put("/profileUpdate/:id", verifyToken, updateProfile);
router.get("/profile/:id", verifyToken, getUserProfile);

export default router;
