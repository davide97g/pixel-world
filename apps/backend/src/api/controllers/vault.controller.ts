import { type Express, type Request, type Response } from "express";
import { addUserShade } from "../../features/vault/addUserShade";
import { getUserColors } from "../../features/vault/getUserColors";
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

  /**
   * @swagger
   * /vault:
   *   post:
   *     summary: Add a shade to user's vault
   *     description: Add a shade to user's vault
   *     tags:
   *       - Vault
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               shadeId:
   *                 type: string
   *     responses:
   *       200:
   *         description: Shade added successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 shadeId:
   *                   type: string
   *       400:
   *         description: Shade ID is required
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Failed to add shade to user's vault
   */
  app.post("/vault", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const { shadeId } = req.body;
      if (!shadeId)
        return res.status(400).send({ message: "Shade ID is required" });

      const result = await addUserShade({
        userId: user.id,
        shadeId,
      });
      return res.status(result.status).send(result.data);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Failed to add shade to user's vault" });
    }
  });
};
