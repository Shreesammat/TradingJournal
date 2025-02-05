import User from '../models/User.js'
import Trade from '../models/Trade.js'

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