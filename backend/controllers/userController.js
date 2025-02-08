import User from '../models/User.js'
import Trade from '../models/Trade.js'


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