import Trade from '../models/Trade.js'

const getUserTrades = async (req, res) => {
    try {
        const userId = req.user.id;

        const trades = await Trade.find({userId: userId});

        return res.status(200).json({
            success: true,
            trades: trades.length > 0 ? trades : [],
            message: trades.length > 0 ? "Trades retrieved successfully!" : "No trades found!",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Server Error!"
        })
    }
}

const getTradeById = async (req, res) => {

}

const createTrade = async (req, res) => {
    try {
        const { entryTime, exitTime, entryPrice, exitPrice, pnl, emotions, psychology, chartScreenShots, learnings } = req.body;

        const newTrade = new Trade({
            userId: req.user.id,  // Use the logged-in user's ID
            entryTime,
            exitTime,
            entryPrice,
            exitPrice,
            pnl,
            emotions,
            psychology,
            chartScreenShots,
            learnings
        });

        await newTrade.save();

        return res.status(200).json({
            success: true,
            message:"Journal Created Successfully!",
            trade: newTrade
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error creating trade!"
        })
    }
}

const editTrade = async (req, res) => {

}

const deleteTrade = async (req, res) => {

}

const deleteUserTrades = async (req, res) => {
    
}
 
export {getUserTrades, getTradeById, createTrade, editTrade, deleteTrade, deleteUserTrades}