import { type Express, type Request, type Response } from "express";

import { version } from "../../package.json";
import { getTeams } from "../features/teams/getTeams";
import { createUser } from "../features/user/createUser";
import { getUserById } from "../features/user/getUserById";
import { getUserColors } from "../features/user/getUserColors";
import { addUserVote } from "../features/votes/addUserVote";
import { getVotes } from "../features/votes/getVotes";
import { getUserInfoFromToken } from "../middleware/utils";

const isDevelopment = process.env.MODE === "DEVELOPMENT";

export const addPublicRoutes = (app: Express) => {
  app.get("/", (_: Request, res: Response) => {
    res.send({ message: "Pxel Server", dev: isDevelopment, version });
  });

  app.get("/votes", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const votes = await getVotes({ limit });
      if (!votes) return res.status(404).send({ message: "Votes not found" });
      res.status(200).send(votes);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Failed to retrieve votes" });
    }
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
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

    const databaseUser = await getUserById({ userId: user.id });
    if (!databaseUser)
      return res.status(404).send({ message: "User not found" });
    res.send(databaseUser);
  });

  app.get("/teams", async (req: Request, res: Response) => {
    const user = await getUserInfoFromToken(req);
    if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

    try {
      const teams = await getTeams();
      if (!teams) return res.status(404).send({ message: "Teams not found" });
      res.status(200).send(teams);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to retrieve teams" });
    }
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
