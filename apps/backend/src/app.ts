import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { addPublicRoutes } from "./api/public";
import { initializeFirebaseApp } from "./config/firebase";
import "./websocket";

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
