import mongoose from "mongoose"

const tradeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        entryTime: {
            type: Date,
            required: true
        },
        exitTime: {
            type:Date,
            required: true
        },
        entryPrice: {
            type: Number,
            required: true,
        },
        exitPrice: {
            type: Number,
            required: true, 
        },
        tradeType: {
            type: String,
            enum: ["buy", "sell"],
            required: true
        },
        pnl: {
            type: Number,
            required: true
        },
        emotions: {
            type:String,
            default: ''
        },
        psychology: {
            type: String,
            default: ''
        },
        chartScreenShots: {
            type: String, // only a url reference
            default:null
        },
        learnings: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Trade', tradeSchema);