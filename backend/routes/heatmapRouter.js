import { Router } from 'express';
import verifyJWT from '../middlewares/verifyJWT.js';
import { getHeatmapStats } from '../controllers/HeatmapController.js';

const heatmapRouter = new Router();


/**
 * @swagger
 * tags:
 *   name: Heatmap
 *   description: Heatmap centric endpoints
 */

/**
 * @swagger
 * /heatmap/stats:
 *   get:
 *     summary: Retrieve heatmap statistics for the authenticated user
 *     description: Returns heatmap data containing date, total trades, and net PnL for each recorded trading day.
 *     tags: [Heatmap]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved heatmap statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 heatmap:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-02-08"
 *                       totalTrades:
 *                         type: integer
 *                         example: 5
 *                       netPnl:
 *                         type: number
 *                         example: 120.50
 *       500:
 *         description: Failed to retrieve heatmap statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

heatmapRouter.get('/stats', verifyJWT, getHeatmapStats)

export default heatmapRouter