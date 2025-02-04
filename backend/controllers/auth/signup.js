import {User} from '../db/connectdb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const {username, email, password} = req.body;
    console.log('signup endpoint hit', req.body);
    try {
        console.log("🔹 Checking if user already exists...");
        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            console.log("🔴 Email already in use!");
            return res.status(400).json({message: 'Email already in use!'});
        }

        console.log("🔹 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 12);

        console.log("🔹 Creating new user...");
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            imageUrl: ''
        })

        console.log("🔹 Saving user to database...");
        await newUser.save();

        //Generate token
        console.log("🔹 Generating token...");
        const token = jwt.sign(
            {id: newUser._id, username: newUser.username, email: newUser.email},
            process.env.JWT_SECRET,
            {expiresIn: "1D"}
        )
        
        console.log("✅ Signup successful!");
        return res
        .cookie('token', token, {httpOnly: true})
        .status(201).json({message: "Registration successful",user:newUser, success: true});
        
    }
    catch(error) {
        console.log("🔴 Signup failed! Error:", error.message);
        return res.status(500).json({message:"Something went wrong", error: error.message});
        
    }
}

export {signup}