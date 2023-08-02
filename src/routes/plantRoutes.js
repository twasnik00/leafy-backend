import express from "express";
import { verifyToken } from "../services/tokenValidation.js";
import {
  deletePlantProgress,
  filterPlants,
  getAllPlants,
  getAllPlantsFromPerenual,
  getPlantFromPerenualById,
  getPlantProgress,
  getPlantsByUser,
  getPlantsByUserAndId,
  getSeasonPlantFromPerenual,
  getSeasonalPlants,
  indoorPlantsFAQ,
  plantsFAQ,
  savePlant,
  savePlantProgress,
  searchPlants,
  updatePlant,
  updatePlantProgress,
} from "../controllers/plantController.js";

const router = express.Router();
router.post("/addPlant", verifyToken, savePlant);
router.put("/updatePlant/:id", verifyToken, updatePlant);
router.get("/getAllPlants", verifyToken, getAllPlants);
router.get("/getPlantsByUser/:id", verifyToken, getPlantsByUser);
router.get(
  "/getPlantsByUserAndId/:userId/:plantId",
  verifyToken,
  getPlantsByUserAndId
);
router.get(
  "/getAllPlantFromPerenual/:page",
  verifyToken,
  getAllPlantsFromPerenual
);
router.get(
  "/getSeasonPlantFromPerenual/:page/:indoor",
  verifyToken,
  getSeasonPlantFromPerenual
);
router.get(
  "/getPlantFromPerenualById/:id/:userId",
  verifyToken,
  getPlantFromPerenualById
);
router.get("/getSeasonalPlants/:page/:season", verifyToken, getSeasonalPlants);
router.get("/searchPlants/:page/:keyword", verifyToken, searchPlants);
router.get(
  "/filterPlants/:page/:cycle/:watering/:sunlight/:poisonous/:indoor/:edible",
  verifyToken,
  filterPlants
);
router.get("/plantFAQ", verifyToken, plantsFAQ);
router.get(
  "/indoorPlantFAQ/:page/:cycle/:watering/:sunlight/:indoor",
  verifyToken,
  indoorPlantsFAQ
);
router.post("/savePlantProgress", verifyToken, savePlantProgress);
router.get("/getPlantProgress/:userId/:plantId", verifyToken, getPlantProgress);
router.put("/updatePlantProgress/:id", verifyToken, updatePlantProgress);
router.get("/deletePlantProgress/:id", verifyToken, deletePlantProgress);

export default router;
