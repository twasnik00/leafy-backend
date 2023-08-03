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
import notificationRoutes from "./src/routes/notificationRoutes.js";
import favouriteRoutes from "./src/routes/favouriteRoutes.js";
import passport from "passport";
import cookieSession from "cookie-session";
// const  passportSetup = require("./src/utils/utils")

// Configurations //
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["leafy"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.options("*", cors());
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,UPDATE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};
app.use(allowCrossDomain);
app.use("/assets", express.static(path.join(dirName, "public/assets")));

// Routes //
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/plant", plantRoutes);
app.use("/post", postRoutes);
app.use("/notification", notificationRoutes);
app.use("/favourite", favouriteRoutes);

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
