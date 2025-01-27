import { type Express, type Request, type Response } from "express";
import { createUser } from "../../features/user/createUser";
import { getUserById } from "../../features/user/getUserById";
import { getUserInfoFromToken } from "../../middleware/utils";

export const createUserController = (app: Express) => {
  /**
   * @openapi
   * /user:
   *   get:
   *     summary: Retrieve user information.
   *     description: Fetches the user information based on the provided authorization token.
   *     tags:
   *       - User
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: User information retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: The unique identifier of the user.
   *                 color_hex_id:
   *                   type: string
   *                   description: The unique color hex identifier of the user.
   *                 team_color_id:
    *                  type: string 
    *                  description: The team color hex of the user.
   *                 email:
   *                   type: string
   *                   description: The email address of the user.
   *                 created_at:
   *                   type: string
   *                   format: date-time
   *                   description: The timestamp when the user was created.

   *       401:
   *         description: Unauthorized - No valid authorization token provided.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Unauthorized
   *       404:
   *         description: User not found - The user associated with the token does not exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User not found
   */
  app.get("/user", async (req: Request, res: Response) => {
    try {
      const user = await getUserInfoFromToken(req);
      if (!user?.id) return res.status(401).send({ message: "Unauthorized" });

      const databaseUser = await getUserById({ userId: user.id });
      if (!databaseUser)
        return res.status(404).send({ message: "User not found" });
      res.send(databaseUser);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to retrieve user" });
    }
  });

  // TODO: add validation with token
  /**
   * @openapi
   * /user:
   *   post:
   *     summary: Create a new user.
   *     description: Creates a new user with the provided UID and email.
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               uid:
   *                 type: string
   *                 description: The unique identifier for the user.
   *               email:
   *                 type: string
   *                 description: The email address of the user.
   *     responses:
   *       201:
   *         description: User created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: User created successfully
   *       400:
   *         description: Invalid request - Missing or invalid parameters.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Invalid request
   *       500:
   *         description: Failed to create user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to create user
   */
  app.post("/user", async (req: Request, res: Response) => {
    try {
      const { uid, email } = req.body;
      if (!uid || !email)
        return res.status(400).send({ message: "Invalid request" });
      const createdUser = await createUser(uid, email);
      if (createdUser.isError)
        return res.status(400).send({ message: createdUser.message });
      return res.status(201).send({
        message: createdUser.message,
        teamColor: createdUser.teamColor,
        randomColor: createdUser.randomColor,
        uid,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to create user" });
    }
  });
};
