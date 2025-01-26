import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { createColorController } from "./controllers/color.controller";
import { createShadeController } from "./controllers/shade.controller";
import { createTeamController } from "./controllers/team.controller";
import { createUserController } from "./controllers/user.controller";
import { createVaultController } from "./controllers/vault.controller";
import { createVoteController } from "./controllers/vote.controller";

const isDevelopment = process.env.MODE === "DEVELOPMENT";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", dev: isDevelopment, version });
  });

  createColorController(app);
  createShadeController(app);
  createTeamController(app);
  createUserController(app);
  createVaultController(app);
  createVoteController(app);
};
