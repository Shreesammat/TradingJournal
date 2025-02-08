import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import nameValidation from '../middlewares/validations/nameValidation.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management endpoints
 */

/**
 * @swagger
 * /user/getProfile:
 *   get:
 *     summary: Get user profile details
 *     tags: [User]
 *     description: Fetches profile details of the authenticated user, including name, email, profile photo, total trades, and net PnL.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/getProfile', verifyJWT, getUserProfile);

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     description: Updates the authenticated user's profile details, such as their name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 description: New name of the user.
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.put('/updateProfile', verifyJWT, nameValidation, updateUserProfile);

export default userRouter;
