import { type Express, type Request, type Response } from "express";
import { getUserColors } from "../../features/user/getUserColors";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createVaultController = (app: Express) => {
  /**
   * @swagger
   * /vault/user/{userId}:
   *   get:
   *     summary: Get user's colors
   *     description: Get user's colors
   *     tags:
   *       - Vault
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User's colors
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 colors:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       name:
   *                         type: string
   */
  app.get("/vault/user/:userId", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const userId = req.params.userId;
      if (!userId)
        return res.status(400).send({ message: "User ID is required" });

      if (userId !== user.id)
        return res.status(401).send({ message: "Unauthorized" });

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
};
