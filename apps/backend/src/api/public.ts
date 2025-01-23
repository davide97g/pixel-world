import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { createUser } from "../features/user/createUser";
import { getUserById } from "../features/user/getUserById";
import { getUserInfoFromToken } from "../middleware/utils";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", version });
  });

  app.post("/user", async (req: Request, res: Response) => {
    const { uid, email } = req.body;

    try {
      const createdUser = await createUser(uid, email);
      if (createdUser.isError)
        return res.status(400).send({ message: createdUser.message });
      return res.status(200).send({
        message: createdUser.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to create user" });
    }
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
