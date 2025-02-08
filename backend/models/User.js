import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: 'https://i.pinimg.com/736x/68/c7/10/68c71057eb988275e0635f07b4c53770.jpg'
    },
    netPnl: {
        type: Number,
        default: 0, // To track the net profit/loss of the user
    },
    totalTrades: {
        type: Number,
        default:0
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', userSchema);