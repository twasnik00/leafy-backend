import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import { getFavouritePlants, saveToFavourite } from "../controllers/favouriteController.js";

const router = express.Router();
router.post("/saveToFavourite", verifyToken, saveToFavourite);
router.get("/getFavouritePlants/:id", verifyToken, getFavouritePlants);

export default router;