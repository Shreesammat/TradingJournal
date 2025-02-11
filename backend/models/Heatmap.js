import mongoose from "mongoose";

const normalizeDate = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

const HeatmapSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        },
        totalTrades: {
            type: Number,
            required: true,
            default: 0,
        },
        netPnl: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

HeatmapSchema.index({userId: 1, date: 1}, {unique: true});

HeatmapSchema.pre("save", function (next) {
    this.date = normalizeDate(this.date);
    next();
});

const HeatmapStats = mongoose.model("HeatmapStats", HeatmapSchema);
export default HeatmapStats