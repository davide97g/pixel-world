import { type Express, type Request, type Response } from "express";
import { addUserVote } from "../../features/votes/addUserVote";
import { getVotes } from "../../features/votes/getVotes";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createVoteController = (app: Express) => {
  /**
   * @openapi
   * /votes:
   *   get:
   *     summary: Retrieve a list of votes
   *     tags:
   *       - Votes
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 100
   *         description: The number of votes to retrieve
   *     responses:
   *       200:
   *         description: A list of votes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   userId:
   *                     type: string
   *                   teamId:
   *                     type: string
   *                   colorId:
   *                     type: string
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Votes not found
   *       500:
   *         description: Failed to retrieve votes
   */
  app.get("/votes", async (req: Request, res: Response) => {
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

  /**
   * @openapi
   * /vote:
   *   post:
   *     summary: Add a user's vote
   *     tags:
   *       - Votes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               teamId:
   *                 type: string
   *               colorId:
   *                 type: string
   *             required:
   *               - teamId
   *               - colorId
   *     responses:
   *       200:
   *         description: Vote added successfully
   *       400:
   *         description: Invalid request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Failed to add user's vote
   */
  app.post("/vote", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const { teamId, shadeId } = req.body;

      if (!teamId || !shadeId)
        return res.status(400).send({ message: "Invalid request" });

      const addVoteResponse = await addUserVote({
        userId: user.id,
        teamId,
        shadeId,
      });
      return res
        .status(addVoteResponse.status)
        .send({ message: addVoteResponse.message });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to add user's vote" });
    }
  });
};
