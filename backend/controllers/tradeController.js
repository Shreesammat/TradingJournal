import {updateHeatmapStats, deleteHeatmapStats} from './HeatmapController.js'
import Trade from '../models/Trade.js'
import User from '../models/User.js';
import HeatmapStats from '../models/Heatmap.js';

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
    try {
        const {tradeId} = req.params;

        const trade = await Trade.findById(tradeId);

        if(!trade) {
            return res.status(404).json({
                success: false,
                message: 'No trades found with the ID'
            })
        }

        if(trade.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only access trades owned by you!'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Trade fetched successfully!',
            trade: trade
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server error!'
        })
    }
}

const createTrade = async (req, res) => {
    try {
        const { entryTime, exitTime, entryPrice, exitPrice, tradeType, emotions, psychology, chartScreenShots, learnings } = req.body;
        const pnl = tradeType === 'buy' ? (exitPrice-entryPrice): (entryPrice-exitPrice);
        const newTrade = new Trade({
            userId: req.user.id,  // Use the logged-in user's ID
            entryTime,
            exitTime,
            entryPrice,
            exitPrice,
            tradeType,
            pnl,
            emotions,
            psychology,
            chartScreenShots,
            learnings
        });

        await newTrade.save();

        const user = await User.findByIdAndUpdate(req.user.id, {
            $inc: {totalTrades: 1, netPnl: pnl}
        });

        await updateHeatmapStats(true, req.user.id, newTrade.createdAt, pnl);

        return res.status(201).json({
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
    try {
        const { tradeId } = req.params;
        const { entryPrice, exitPrice, tradeType, ...updateFields } = req.body;

        const trade = await Trade.findById(tradeId);

        if(!trade) {
            return res.status(404).json({
                success:false,
                message: 'No trade exists with this Id!',
                error: 'Trade not found!'
            });
        }

        if(trade.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only access trades owned by you!'
            })
        }

        const updatedEntryPrice = entryPrice !== undefined ? entryPrice : trade.entryPrice;
        const updatedExitPrice = exitPrice !== undefined ? exitPrice : trade.exitPrice;
        const updatedTradeType = tradeType !== undefined ? tradeType : trade.tradeType;

        const updatedPnl = updatedTradeType === 'buy' ? (updatedExitPrice - updatedEntryPrice) : (updatedEntryPrice - updatedExitPrice);

        const updateData = {
            ...updateFields,  // Include other fields (e.g., emotions, psychology, learnings)
            entryPrice: updatedEntryPrice,
            exitPrice: updatedExitPrice,
            tradeType: updatedTradeType,
            pnl: updatedPnl,
        };

        const updatedTrade = await Trade.findByIdAndUpdate(
            tradeId,
            {$set: updateData },
            {new: true}
        );

        await User.findByIdAndUpdate(req.user.id, {
            $inc: {netPnl: updatedPnl - trade.pnl}
        })

        return res.status(201).json({
            success: true,
            message: 'Trade updated Successfully!',
            trade: updatedTrade,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Server error!",
            message: 'Failed to update trade!'
        })
    }
}

const deleteTrade = async (req, res) => {
    try {
        const {tradeId} = req.params;
        const userId = req.user.id;
        const trade = await Trade.findById(tradeId);

        if( !trade ) {
            return res.status(404).json({
                success: false,
                message: 'Failed to find the trade!'
            })
        }

        if(trade.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized! You can only delete trades owned by you!'
            })
        }

        const dateCreated = trade.createdAt;
        const pnlChange = - trade.pnl;
        await trade.deleteOne();

        await User.findByIdAndUpdate(req.user.id, {
            $inc: {netPnl: pnlChange, totalTrades: -1}
        })

        await updateHeatmapStats(false, req.user.id, dateCreated, pnlChange);

        return res.status(200).json({
            success: true,
            message: 'Trade deleted successfully!'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server error!'
        })
    }
}

const deleteUserTrades = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await Trade.deleteMany({ userId: userId});
        await HeatmapStats.deleteMany({userId: userId});
        return res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} trades successfully!`
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error!',
            error: error.message
        })
    }
}

export {getUserTrades, getTradeById, createTrade, editTrade, deleteTrade, deleteUserTrades}