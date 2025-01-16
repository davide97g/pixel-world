import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initializeFirebaseApp } from "../config/firebase";
import "../websocket";
import { addPublicRoutes } from "./public";

dotenv.config();

initializeFirebaseApp();

const app = express();

const allowedOrigins = ["http://localhost:8080", "https://pxel.world"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

const port = process.env.PORT;

// **** PUBLIC ****
addPublicRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
