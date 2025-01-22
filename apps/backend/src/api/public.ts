import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { generateColorForNewUser } from "../features/color";
import { getUserById } from "../features/user/getUserById";
import { updateUser, UpdateUserError } from "../features/user/updateUser";
import { getUserInfoFromToken } from "../middleware/utils";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", version });
  });

  app.post("/user", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });
    const colorHexId = await generateColorForNewUser();
    const updatedUser = await updateUser(user.id, {
      color_hex_id: colorHexId,
      email: user.email ?? "",
    });

    if ((updatedUser as UpdateUserError).message === "User already exists")
      return res.status(400).send({ message: "User already exists" });

    if ((updatedUser as UpdateUserError).message === "Failed to update user")
      return res.status(500).send({ message: "User already exists" });

    return res.send({
      message: `Registered ${user.id} with color: ${colorHexId}`,
      colorHexId,
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
