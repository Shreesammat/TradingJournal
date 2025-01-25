import {User} from '../db/connectdb.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email: email});
        if(existingUser) return res.status(400).json({message: 'Email already in use!'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            imageUrl: ''
        })
        await newUser.save();

        //Generate token
        const token = jwt.sign(
            {id: newUser._id, username: newUser.username, email: newUser.email},
            process.env.JWT_SECRET,
            {expiresIn: "1D"}
        )

        return res
        .cookie('token', token, {httpOnly: true})
        .status(201).json({message: "Registration successful",user:newUser});
        
    }
    catch(error) {
        return res.status(500).json({message:"Something went wrong", error: error.message});
    }
}

export {signup}