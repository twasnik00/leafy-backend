import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import {
  deleteFavouritePlants,
  getFavouritePlants,
  saveToFavourite,
} from "../controllers/favouriteController.js";

const router = express.Router();
router.post("/saveToFavourite", verifyToken, saveToFavourite);
router.get("/getFavouritePlants/:id", verifyToken, getFavouritePlants);
router.get("/deleteFavouritePlants/:id", verifyToken, deleteFavouritePlants);

export default router;
