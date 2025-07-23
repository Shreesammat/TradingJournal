import mongoose from "mongoose"

const tradeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        index: {
            type: String,
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
            enum: ["Buy", "Sell"],
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        pnl: {
            type: Number,
            required: true
        },
        emotions: {
            type:[{type: String}],
            default: ''
        },
        psychology: {
            type: [{type: String}],
            default: ''
        },
        chartImage: {
            type: String,
            default:null
        },
        learnings: {
            type: [{type: String}],
            required: true
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Trade', tradeSchema);