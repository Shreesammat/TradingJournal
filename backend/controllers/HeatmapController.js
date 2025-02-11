import HeatmapStats from "../models/Heatmap.js";

const getHeatmapStats = async (req, res) => {
    const userId = req.user.id;

    try {
        const heatmap = await HeatmapStats.find({userId: userId}, { date: 1, totalTrades: 1, netPnl: 1, _id: 0 });

        return res.status(200).json({
            success: true,
            message: 'Heatmap Fetched Successfully!',
            heatmap: heatmap
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve Heatmap!',
            error: error.message
        })
    }
}

const updateHeatmapStats = async (isInc, userId, tradeDate, pnlChange) => {
    const normalizeDate = new Date(tradeDate);
    normalizeDate.setUTCHours(0, 0, 0, 0);
    let inc;
    if(isInc) inc = 1;
    else inc = -1;
    try {
        await HeatmapStats.findOneAndUpdate(
            {userId, date: normalizeDate},
            { $inc: {totalTrades: inc, netPnl: pnlChange}},
            { upsert: true, new: true }
        )
    } catch (error) {
        console.error("Error updating Heatmap stats:", error);
    }
}

const deleteHeatmapStats = async (userId) => {
    try {
        await HeatmapStats.deleteMany({userId: userId});
    } catch (error) {
        console.error("Failed deleting Heatmap Data!", error)
    }
}

export {updateHeatmapStats, deleteHeatmapStats, getHeatmapStats}