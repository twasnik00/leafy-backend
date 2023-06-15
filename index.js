import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import plantRoutes from "./src/routes/plantRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";

// Configurations //
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(dirName, "public/assets")));

// Routes //
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/plant", plantRoutes);
app.use("/post", postRoutes);

// MongoDb setup //
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`server error: ${error}`);
  });
