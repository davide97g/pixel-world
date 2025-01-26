import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { generateRandomColorForUser } from "../features/color/generateRandomColor";
import { createUser } from "../features/user/createUser";
import { getUserById } from "../features/user/getUserById";
import { getUserColors } from "../features/user/getUserColors";
import { addUserVote } from "../features/votes/addUserVote";
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
      return res.status(201).send({
        message: createdUser.message,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to create user" });
    }
  });

  app.get("/user", async (req: Request, res: Response) => {
    generateRandomColorForUser();
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

    const databaseUser = await getUserById({ userId: user.id });
    if (!databaseUser)
      return res.status(404).send({ message: "User not found" });
    res.send({
      user: databaseUser,
    });
  });

  app.get("/user/colors", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

    try {
      const result = await getUserColors({
        userId: user.id,
      });
      if (result.status !== 200)
        return res.status(result.status).send({ message: result.message });
      return res.status(result.status).send(result.data);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Failed to retrieve user's colors" });
    }
  });

  app.post("/vote", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

    const { teamId, colorId } = req.body;

    if (!teamId || !colorId)
      return res.status(400).send({ message: "Invalid request" });

    try {
      const addVoteResponse = await addUserVote({
        userId: user.id,
        teamId,
        colorId,
      });
      return res
        .status(addVoteResponse.status)
        .send({ message: addVoteResponse.message });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to add user's vote" });
    }
  });

  return app;
};
