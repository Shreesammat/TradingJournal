const mongoose = require('mongoose');
const env = require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl().then(() => console.log('Connected to MongoDB')).catch(err => console.log(err)));

const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true,
    },
    dpUrl: {
        type: String,
        default: 'https://i.pinimg.com/736x/68/c7/10/68c71057eb988275e0635f07b4c53770.jpg'
    }
})

module.exports = mongoose.model('User', userSchema);