import Plant from "../models/plant.js";
import User from "../models/user.js";
import axios from "axios";

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
export const getAllPlantsFromPerenual = async (req, res) => {
  try {
    const { page } = req.params;
    const plant = await axios.get(
      `https://perenual.com/api/species-list?page=${page}&key=${process.env.PERENUAL_API_KEY}`
    );
    page;
    res.status(200).json(plant.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPlantFromPerenualById = async (req, res) => {
  try {
    const { id, page } = req.params;
    const plant = await axios.get(
      `https://perenual.com/api/species/details/${id}?key=${process.env.PERENUAL_API_KEY}`
    );
    res.status(200).json(plant.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// export const getSeasonalPlants = async (req, res) => {
//   try {
//     const { season, page } = req.params;
//     const plant = await axios.get(
//       `https://perenual.com/api/species-list?page=${page}&key=${process.env.PERENUAL_API_KEY}&flowering_season=${season}`
//     );
//     res.status(200).json(plant.data);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
// https://perenual.com/api/species-care-guide-list?key=sk-jv5x648ec5b40c2691300
export const getSeasonalPlants = async (req, res) => {
  try {
    const { season, page } = req.params;
    const plant = await axios.get(
      `https://perenual.com/api/species-care-guide-list?page=${page}&key=${process.env.PERENUAL_API_KEY}&Type=${season}`
    );
    res.status(200).json(plant.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const searchPlants = async (req, res) => {
  try {
    const { keyword, page } = req.params;
    const plant = await axios.get(
      `https://perenual.com/api/species-list?page=${page}&key=${process.env.PERENUAL_API_KEY}&q=${keyword}`
    );
    res.status(200).json(plant.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
