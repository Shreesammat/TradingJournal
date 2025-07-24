import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  totalSummary,
  weeklySummary,
  topEmotions,
  mostRecentLearnings,
} from '../controllers/userController.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import nameValidation from '../middlewares/validations/nameValidation.js';
import { uploadProfileImage } from '../middlewares/multerUpload.js';
import { deleteImage, uploadImage } from '../controllers/imageController.js';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile and analytics endpoints
 */

// -------------------- Profile --------------------

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

// -------------------- Image Upload --------------------

userRouter.post(
  '/uploadProfileImage',
  verifyJWT,
  uploadProfileImage.single('image'),
  uploadImage
);

userRouter.delete('/deleteProfileImage', verifyJWT, deleteImage);

// -------------------- Analytics Routes --------------------

/**
 * @swagger
 * /user/totalSummary:
 *   get:
 *     summary: Get total trading summary
 *     tags: [User]
 *     description: Returns total number of trades, net PnL, average PnL, and win ratio.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched total summary.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/totalSummary', verifyJWT, totalSummary);

/**
 * @swagger
 * /user/weeklySummary:
 *   get:
 *     summary: Get weekly trading summary
 *     tags: [User]
 *     description: Returns number of trades, net PnL, and average PnL for the last 7 days.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched weekly summary.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/weeklySummary', verifyJWT, weeklySummary);

/**
 * @swagger
 * /user/topEmotions:
 *   get:
 *     summary: Get top trading emotions
 *     tags: [User]
 *     description: Returns the top 3 most frequently selected emotions from user trades.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched top emotions.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/topEmotions', verifyJWT, topEmotions);

/**
 * @swagger
 * /user/mostRecentLearnings:
 *   get:
 *     summary: Get most recent learnings
 *     tags: [User]
 *     description: Returns the latest 5 trades' learnings (flattened).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched recent learnings.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/mostRecentLearnings', verifyJWT, mostRecentLearnings);

export default userRouter;