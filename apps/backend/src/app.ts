import cors from "cors";
import express from "express";
import "./config/supabase";

import { addPublicRoutes } from "./api/public";

const app = express();
const allowedOrigins = ["http://localhost:8080", "https://pxel.world"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

const port = process.env.PORT;

// **** PUBLIC ****
addPublicRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
