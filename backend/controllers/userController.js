import User from '../models/User.js'
import Trade from '../models/Trade.js'

/**
 * @swagger
 * /user/getProfile:
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
 *                 name:
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

/**
 * @swagger
 * /user/updateProfile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     description: Allows the user to update their profile information, specifically their name.
 *     security:
 *       - cookieAuth: []  # This assumes you're using cookies for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 description: New name for the user
 *                 example: 'John Doe'
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Profile updated successfully!'
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 profilePhoto:
 *                   type: string
 *       400:
 *         description: Bad request. Invalid or missing input.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

//@desc get User Profile details

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({message: 'User not found!'})
        }

        //Calculate everything for the user
        const trades = await Trade.find({user: user._id})
        const totalTrades = trades.length;
        const netPnl = trades.reduce((acc, trade) => acc + trade.pnl, 0);

        user.totalTrades = totalTrades;
        user.netPnl = netPnl;
        await user.save();

        res.status(200).json({
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto,
            totalTrades: user.totalTrades,
            netPnl: user.netPnl
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching user profile', error: error.message})
    }
}

//@desc User profile Update

const updateUserProfile = async (req, res) => {
    try {
        const {newName} = req.body;
        console.log('new name: ', newName)
        const user = await User.findById(req.user.id);
        console.log('user: ', user)
        if(!user) {
            return res.status(404).json({message: 'User not found!'})
        }

        if(newName) user.name = newName;
        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully!',
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto,
        })

    } catch(error) {
        return res.status(500).json({message: 'Error updating user profile!', error: error.message})
    }
}

export {getUserProfile, updateUserProfile}