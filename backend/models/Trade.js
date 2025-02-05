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
            type: String,
            required: true,
        },
        exitPrice: {
            type: String,
            required: true, 
        },
        pnl: {
            type: String,
            required: true
        },
        emotions: {
            type:String,
            required: true,
            default: ''
        },
        psychology: {
            type: String,
            required: true,
            default: ''
        },
        chatScreenShots: {
            type: String, // only a url reference
            default:null
        },
        learnings: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default mongoose.model('Trade', tradeSchema);