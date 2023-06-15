import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import {
  getAllPlants,
  getPlantsByUser,
  savePlant,
  updatePlant,
} from "../controllers/plantController.js";

const router = express.Router();
router.post("/addPlant", verifyToken, savePlant);
router.put("/updatePlant/:id", verifyToken, updatePlant);
router.get("/getAllPlants", verifyToken, getAllPlants);
router.get("/getPlantsByUser/:id", verifyToken, getPlantsByUser);

export default router;
