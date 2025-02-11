import express from 'express'
import verifyJWT from '../middlewares/verifyJWT.js';
import { getUserTrades, getTradeById, createTrade, editTrade, deleteTrade, deleteUserTrades } from '../controllers/tradeController.js'; 
import createTradeValidation from '../middlewares/validations/createTradeValidation.js'
import editTradeValidation from '../middlewares/validations/editTradeValidation.js';
import deleteTradeValidation from '../middlewares/validations/deleteTradeValidation.js';
import { uploadImage, deleteImage } from '../controllers/imageController.js';
import { uploadTradeImage } from '../middlewares/multerUpload.js';

const tradeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trade
 *   description: Endpoints for managing trades, including fetching, creating, updating, and deleting trades.
 */

/**
 * @swagger
 * /trade/getUserTrades:
 *   get:
 *     summary: Retrieve all trades for the authenticated user
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches all trades associated with the authenticated user.
 *     responses:
 *       200:
 *         description: Successfully retrieved trades.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.get('/getUserTrades', verifyJWT, getUserTrades);

/**
 * @swagger
 * /trade/getTradeById/{tradeId}:
 *   get:
 *     summary: Retrieve a specific trade by ID
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches details of a specific trade using its unique identifier.
 *     parameters:
 *       - in: path
 *         name: tradeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade details retrieved successfully.
 *       400:
 *         description: Invalid or missing trade ID.
 *       404:
 *         description: Trade not found.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.get('/getTradeById/:tradeId', verifyJWT, getTradeById);

/**
 * @swagger
 * /trade/createTrade:
 *   post:
 *     summary: Create a new trade entry
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Adds a new trade to the user's account with essential trade details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entryTime:
 *                 type: string
 *                 format: date-time
 *               entryPrice:
 *                 type: number
 *               exitTime:
 *                 type: string
 *                 format: date-time
 *               exitPrice:
 *                 type: number
 *               tradeType:
 *                 type: string
 *                 enum: [buy, sell]
 *     responses:
 *       201:
 *         description: Trade successfully created.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.post('/createTrade', verifyJWT, createTradeValidation, createTrade);

/**
 * @swagger
 * /trade/editTrade/{tradeId}:
 *   put:
 *     summary: Update an existing trade
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Modifies details of an existing trade.
 *     parameters:
 *       - in: path
 *         name: tradeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entryPrice:
 *                 type: number
 *               exitPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Trade updated successfully.
 *       400:
 *         description: Invalid trade ID or update data.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Trade not found.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.put('/editTrade/:tradeId', verifyJWT, editTradeValidation, editTrade);

/**
 * @swagger
 * /trade/deleteTrade/{tradeId}:
 *   delete:
 *     summary: Remove a trade by ID
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Deletes a specific trade from the user's account.
 *     parameters:
 *       - in: path
 *         name: tradeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trade successfully deleted.
 *       400:
 *         description: Invalid or missing trade ID.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Trade not found.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.delete('/deleteTrade/:tradeId', verifyJWT, deleteTradeValidation, deleteTrade);

/**
 * @swagger
 * /trade/deleteUserTrades:
 *   delete:
 *     summary: Remove all trades for a user
 *     tags: [Trade]
 *     security:
 *       - bearerAuth: []
 *     description: Deletes all trades associated with the authenticated user.
 *     responses:
 *       200:
 *         description: All user trades successfully deleted.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 */
tradeRouter.delete('/deleteUserTrades', verifyJWT, deleteUserTrades);


tradeRouter.post('/uploadImage', verifyJWT, uploadTradeImage.single("image"), uploadImage);

tradeRouter.delete('/deleteImage', verifyJWT, deleteImage);

export default tradeRouter;
