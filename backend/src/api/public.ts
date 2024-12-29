import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { generateColorForNewUser } from "../features/color";
import { getUserInfoFromToken } from "../middleware/utils";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", version });
  });

  app.post("/register", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.uid) return res.status(401).send({ message: "Unauthorized" });
    const color = await generateColorForNewUser(user?.uid);
    res.send({
      message: `Registered ${user.uid} with color: ${color.name}`,
      color,
    });
  });

  return app;
};
