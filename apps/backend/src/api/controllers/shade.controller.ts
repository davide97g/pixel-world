import { type Express, type Request, type Response } from "express";
import { getShades } from "../../features/shades/getShades";
import { getShadeForTeam } from "../../features/shades/getShadesForTeam";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createShadeController = (app: Express) => {
  /**
   * @openapi
   * /shades/all:
   *   get:
   *     summary: Retrieve all shades
   *     description: Fetches all shades from the database.
   *     tags:
   *       - Shades
   *     responses:
   *       200:
   *         description: A list of shades.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     description: The shade ID.
   *                   name:
   *                     type: string
   *                     description: The name of the shade.
   *                   color:
   *                     type: string
   *                     description: The color code of the shade.
   *       401:
   *         description: Unauthorized access.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Unauthorized
   *       404:
   *         description: Shades not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Shades not found
   *       500:
   *         description: Failed to retrieve shades.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to retrieve shades
   */
  app.get("/shades/all", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const shades = await getShades();
      if (!shades) return res.status(404).send({ message: "Shades not found" });
      res.status(200).send(shades);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Failed to retrieve shades" });
    }
  });

  /**
   * @openapi
   * /shades/all:
   *   get:
   *     summary: Retrieve all shades
   *     description: Fetches all shades from the database.
   *     tags:
   *       - Shades
   *     responses:
   *       200:
   *         description: A list of shades.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     description: The shade ID.
   *                   name:
   *                     type: string
   *                     description: The name of the shade.
   *                   color:
   *                     type: string
   *                     description: The color code of the shade.
   *       401:
   *         description: Unauthorized access.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Unauthorized
   *       404:
   *         description: Shades not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Shades not found
   *       500:
   *         description: Failed to retrieve shades.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to retrieve shades
   */
  app.post("/shades/team-id", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const { teamId } = req.body;
      if (!teamId)
        return res.status(400).send({ message: "Team ID is required" });
      const shades = await getShadeForTeam({ teamId });
      if (!shades) return res.status(404).send({ message: "Shades not found" });
      res.status(200).send(shades);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Failed to retrieve shades" });
    }
  });
};
