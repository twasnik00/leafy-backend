import express from "express";
import {
  googleOAuthLoginOrRegister,
  login,
  register,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/googleOAuthLoginOrRegister", googleOAuthLoginOrRegister);

export default router;
