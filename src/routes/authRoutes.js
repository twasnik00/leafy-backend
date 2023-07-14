import express from "express";
import { login, register } from "../controllers/authController.js";
import { updateProfile } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

export default router;
