import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { generateColorForNewUser, getColorByHex } from "../features/color";
import { getUserById } from "../features/user/getUserById";
import { updateUser } from "../features/user/updateUser";
import { getUserInfoFromToken } from "../middleware/utils";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", version });
  });

  app.post("/register", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });
    const color = await generateColorForNewUser();
    await updateUser(user.id, { color });
    res.send({
      message: `Registered ${user.id} with color: ${color.name}`,
      color,
    });
  });

  app.get("/color/:hex", (req: Request, res: Response) => {
    const hex = req.params.hex;
    if (!hex) return res.status(400).send({ message: "Hex is required" });
    const color = getColorByHex(`#${hex}`);
    if (!color) return res.status(404).send({ message: "Color not found" });
    res.send({
      color,
    });
  });

  app.get("/user", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });
    console.log("user", user);
    const databaseUser = await getUserById({ userId: user.id });
    if (!databaseUser)
      return res.status(404).send({ message: "User not found" });
    res.send({
      user: databaseUser,
    });
  });

  return app;
};
