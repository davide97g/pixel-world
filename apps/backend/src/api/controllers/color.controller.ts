import { type Express, type Request, type Response } from "express";
import { getVotes } from "../../features/votes/getVotes";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createColorController = (app: Express) => {
  app.get("/colors", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const votes = await getVotes({ limit });
      if (!votes) return res.status(404).send({ message: "Votes not found" });
      res.status(200).send(votes);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Failed to retrieve votes" });
    }
  });
};
