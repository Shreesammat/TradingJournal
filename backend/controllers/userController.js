import User from '../models/User.js';
import Trade from '../models/Trade.js';

// @desc    Get User Profile details
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Calculate user stats
    const trades = await Trade.find({ userId: user._id });
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
      netPnl: user.netPnl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user profile',
      error: error.message,
    });
  }
};

// @desc    Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { newName } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    if (newName) user.name = newName;
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully!',
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating user profile!',
      error: error.message,
    });
  }
};

// @desc    Get total trading summary
const totalSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const trades = await Trade.find({ userId });

    const totalTrades = trades.length;
    const netPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const averagePnl = totalTrades ? netPnl / totalTrades : 0;
    const winningTrades = trades.filter((trade) => trade.pnl > 0).length;
    const winRatio = totalTrades ? (winningTrades / totalTrades) * 100 : 0;

    return res.status(200).json({
      totalTrades,
      netPnl,
      averagePnl,
      winRatio: winRatio.toFixed(2) + '%',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching total summary',
      error: error.message,
    });
  }
};

// @desc    Weekly trading summary (last 7 days)
const weeklySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const trades = await Trade.find({
      userId,
      createdAt: { $gte: oneWeekAgo },
    });

    const totalTrades = trades.length;
    const netPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
    const averagePnl = totalTrades ? netPnl / totalTrades : 0;

    let biggestProfit = -Infinity;
    let biggestLoss = Infinity;
    let winCount = 0;

    trades.forEach((trade) => {
      if (trade.pnl > biggestProfit) biggestProfit = trade.pnl;
      if (trade.pnl < biggestLoss) biggestLoss = trade.pnl;
      if (trade.pnl > 0) winCount++;
    });

    return res.status(200).json({
      realisedPnL: netPnl,
      totalTrades,
      biggestProfit: biggestProfit === -Infinity ? 0 : biggestProfit,
      biggestLoss: biggestLoss === Infinity ? 0 : biggestLoss,
      winRate: totalTrades > 0 ? ((winCount / totalTrades) * 100).toFixed(2) : 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching weekly summary',
      error: error.message,
    });
  }
};

// @desc    Top 3 most common emotions
const topEmotions = async (req, res) => {
  try {
    const userId = req.user.id;
    const trades = await Trade.find({ userId });

    const emotionCount = {};

    trades.forEach((trade) => {
      trade.emotions.forEach((emotion) => {
        emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
      });
    });

    const sortedEmotions = Object.entries(emotionCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([emotion, count]) => ({ emotion, count }));

    return res.status(200).json({
      topEmotions: sortedEmotions,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching top emotions',
      error: error.message,
    });
  }
};

// @desc    Get latest 5 trades' learnings
const mostRecentLearnings = async (req, res) => {
  try {
    const userId = req.user.id;

    const trades = await Trade.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentLearnings = trades.flatMap((trade) => trade.learnings);

    return res.status(200).json({
      recentLearnings: recentLearnings.slice(0, 10), // truncate overflow
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching most recent learnings',
      error: error.message,
    });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  totalSummary,
  weeklySummary,
  topEmotions,
  mostRecentLearnings,
};