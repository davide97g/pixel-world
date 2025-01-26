import { type Express, type Request, type Response } from "express";
import { getTeams } from "../../features/teams/getTeams";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createTeamController = (app: Express) => {
  /**
   * @swagger
   * /teams:
   *   get:
   *     summary: Get all teams
   *     description: Get all teams
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   name:
   *                     type: string
   *                   color:
   *                     type: string
   *       404:
   *         description: Teams not found
   *       500:
   *         description: Failed to retrieve teams
   *     security:
   *       - BearerAuth: []
   *     tags:
   *       - Teams
   *     operationId: getTeams
   */
  app.get("/teams", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const teams = await getTeams();
      if (!teams) return res.status(404).send({ message: "Teams not found" });
      res.status(200).send(teams);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to retrieve teams" });
    }
  });
};
