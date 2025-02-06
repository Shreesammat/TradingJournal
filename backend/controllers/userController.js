import User from '../models/User.js'
import Trade from '../models/Trade.js'

//@desc get User Profile details

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Fetches the user's profile information along with their trade statistics (total trades and net PnL).
 *     security:
 *       - cookieAuth: []  # This assumes you're using cookies for authentication
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 profilePhoto:
 *                   type: string
 *                 totalTrades:
 *                   type: integer
 *                 netPnl:
 *                   type: number
 *                   format: float
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findbyId(req.user.id);

        if(!user) {
            return res.status(404).json({message: 'User not found!'})
        }

        //Calculate everything for the user
        const trades = await Trade.find({user: user.req.id})
        const totalTrades = trades.length;
        const netPnl = trades.reduce((acc, trade) => acc + trade.pnl, 0);

        user.totalTrades = totalTrades;
        user.netPnl = netPnl;
        await user.save();

        res.status(200).json({
            username: user.username,
            email: user.email,
            profilePhoto: user.profilePhoto,
            totalTrades: user.totalTrades,
            netPnl: user.netPnl
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching user profile'})
    }
}

export {getUserProfile}