import { updateHeatmapStats, deleteHeatmapStats } from "./HeatmapController.js";
import Trade from "../models/Trade.js";
import User from "../models/User.js";
import HeatmapStats from "../models/Heatmap.js";

const getUserTrades = async (req, res) => {
  console.log("🔹 getUserTrades endpoint hit for user:", req.user.id);
  try {
    const userId = req.user.id;
    const skip = parseInt(req.query.skip || "0", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const filter = req.query.filter || null;
    const sort = req.query.sort || null;
    const search = req.query.search || null;

    // Base query
    const query = { userId };

    // Apply filter
    if (filter) {
      // Example: filter = 'Buy' or 'Sell'
      query.tradeType = filter;
    }

    // Apply search (basic match on index)
    if (search) {
      query.index = { $regex: search, $options: "i" };
    }

    // Sorting logic
    const sortOptions = {};
    if (sort === "newest") {
      sortOptions.createdAt = -1;
    } else if (sort === "oldest") {
      sortOptions.createdAt = 1;
    } else if (sort === "pnl_desc") {
      sortOptions.pnl = -1;
    } else if (sort === "pnl_asc") {
      sortOptions.pnl = 1;
    } else {
      // Default sort by newest
      sortOptions.createdAt = -1;
    }

    const total = await Trade.countDocuments(query);
    const trades = await Trade.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    console.log(`🔹Found ${trades.length} trades for user ${userId}`);

    return res.status(200).json({
      success: true,
      trades: trades,
      hasMore: skip + trades.length < total,
      tradeLength: total,
      message:
        trades.length > 0
          ? "Trades retrieved successfully!"
          : "No trades found!",
    });
  } catch (error) {
    console.log("🔴 Error in getUserTrades:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Error!",
    });
  }
};

const getTradeById = async (req, res) => {
  console.log("🔹 getTradeById endpoint hit for trade:", req.params.tradeId);
  try {
    const { tradeId } = req.params;

    const trade = await Trade.findById(tradeId);

    if (!trade) {
      console.log("🔴 No trade found with ID:", tradeId);
      return res.status(404).json({
        success: false,
        message: "No trades found with the ID",
      });
    }

    if (trade.userId.toString() !== req.user.id) {
      console.log("🔴 Unauthorized access attempt by user:", req.user.id);
      return res.status(403).json({
        success: false,
        message: "You can only access trades owned by you!",
      });
    }

    console.log("✅ Trade fetched successfully for user:", req.user.id);
    console.log("✅ Trade is:", trade);

    return res.status(200).json({
      success: true,
      message: "Trade fetched successfully!",
      trade: trade,
    });
  } catch (error) {
    console.log("🔴 Error in getTradeById:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error!",
    });
  }
};

const createTrade = async (req, res) => {
  console.log("🔹 createTrade endpoint hit for user:", req.user.id);
  try {
    const {
      index,
      entryTime,
      exitTime,
      entryPrice,
      exitPrice,
      quantity,
      pnl,
      tradeType,
      emotions,
      psychology,
      chartImage,
      learnings,
    } = req.body;
    const newTrade = new Trade({
      userId: req.user.id, // Use the logged-in user's ID
      index,
      entryTime,
      exitTime,
      entryPrice,
      exitPrice,
      quantity,
      tradeType,
      pnl,
      emotions,
      psychology,
      chartImage,
      learnings,
    });

    await newTrade.save();
    console.log(
      "✅ Trade created for user:",
      req.user.id,
      "Trade ID:",
      newTrade._id
    );

    const user = await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalTrades: 1, netPnl: pnl },
    });

    await updateHeatmapStats(true, req.user.id, newTrade.createdAt, pnl);

    return res.status(201).json({
      success: true,
      message: "Journal Created Successfully!",
      trade: newTrade,
    });
  } catch (error) {
    console.log("🔴 Error in createTrade:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error creating trade!",
    });
  }
};

const editTrade = async (req, res) => {
  console.log("🔹 editTrade endpoint hit for trade:", req.params.tradeId);
  try {
    const { tradeId } = req.params;
    const { entryPrice, exitPrice, tradeType, ...updateFields } = req.body;

    const trade = await Trade.findById(tradeId);

    if (!trade) {
      console.log("🔴 No trade exists with this Id:", tradeId);
      return res.status(404).json({
        success: false,
        message: "No trade exists with this Id!",
        error: "Trade not found!",
      });
    }

    if (trade.userId.toString() !== req.user.id) {
      console.log("🔴 Unauthorized edit attempt by user:", req.user.id);
      return res.status(403).json({
        success: false,
        message: "You can only access trades owned by you!",
      });
    }

    const updatedEntryPrice =
      entryPrice !== undefined ? entryPrice : trade.entryPrice;
    const updatedExitPrice =
      exitPrice !== undefined ? exitPrice : trade.exitPrice;
    const updatedTradeType =
      tradeType !== undefined ? tradeType : trade.tradeType;

    const updatedPnl =
      updatedTradeType === "buy"
        ? updatedExitPrice - updatedEntryPrice
        : updatedEntryPrice - updatedExitPrice;

    const updateData = {
      ...updateFields, // Include other fields (e.g., emotions, psychology, learnings)
      entryPrice: updatedEntryPrice,
      exitPrice: updatedExitPrice,
      tradeType: updatedTradeType,
      pnl: updatedPnl,
    };

    const updatedTrade = await Trade.findByIdAndUpdate(
      tradeId,
      { $set: updateData },
      { new: true }
    );

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { netPnl: updatedPnl - trade.pnl },
    });
    console.log(
      "✅ Trade updated for user:",
      req.user.id,
      "Trade ID:",
      tradeId
    );
    return res.status(201).json({
      success: true,
      message: "Trade updated Successfully!",
      trade: updatedTrade,
    });
  } catch (error) {
    console.log("🔴 Error in editTrade:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Server error!",
      message: "Failed to update trade!",
    });
  }
};

const deleteTrade = async (req, res) => {
  console.log("🔹 deleteTrade endpoint hit for trade:", req.params.tradeId);
  try {
    const { tradeId } = req.params;
    const userId = req.user.id;
    const trade = await Trade.findById(tradeId);

    if (!trade) {
      console.log("🔴 Failed to find the trade:", tradeId);
      return res.status(404).json({
        success: false,
        message: "Failed to find the trade!",
      });
    }

    if (trade.userId.toString() !== userId) {
      console.log("🔴 Unauthorized delete attempt by user:", userId);
      return res.status(403).json({
        success: false,
        message: "Unauthorized! You can only delete trades owned by you!",
      });
    }

    const dateCreated = trade.createdAt;
    const pnlChange = -trade.pnl;
    await trade.deleteOne();

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { netPnl: pnlChange, totalTrades: -1 },
    });

    await updateHeatmapStats(false, req.user.id, dateCreated, pnlChange);
    console.log("✅ Trade deleted for user:", userId, "Trade ID:", tradeId);
    return res.status(200).json({
      success: true,
      message: "Trade deleted successfully!",
    });
  } catch (error) {
    console.log("🔴 Error in deleteTrade:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Server error!",
    });
  }
};

const deleteUserTrades = async (req, res) => {
  console.log("🔹 deleteUserTrades endpoint hit for user:", req.user.id);
  try {
    const userId = req.user.id;
    const result = await Trade.deleteMany({ userId: userId });
    await HeatmapStats.deleteMany({ userId: userId });
    console.log(`✅ Deleted ${result.deletedCount} trades for user ${userId}`);
    return res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} trades successfully!`,
    });
  } catch (error) {
    console.log("🔴 Error in deleteUserTrades:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error!",
      error: error.message,
    });
  }
};

export {
  getUserTrades,
  getTradeById,
  createTrade,
  editTrade,
  deleteTrade,
  deleteUserTrades,
};
