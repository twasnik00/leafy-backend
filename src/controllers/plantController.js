import Plant from "../models/plant.js";
import User from "../models/user.js";

export const savePlant = async (req, res) => {
  try {
    const {
      userId,
      plantName,
      plantDescription,
      city,
      state,
      platPosition,
      plantPicture,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newPlant = new Plant({
      userId,
      plantName,
      plantDescription,
      city,
      state,
      platPosition,
      plantPicture,
      createdPlantData: new Date(),
    });
    const result = await newPlant.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const updatePlant = async (req, res) => {
  try {
    const plantId = req.params.id;
    const updatedData = req.body;
    const plant = await Plant.findByIdAndUpdate(plantId, updatedData, {
      new: true,
    });
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    return res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllPlants = async (req, res) => {
  try {
    const plant = await Plant.find({});
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const getPlantsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const plants = await Plant.find({
      userId: userId,
    });
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
