import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register new User

const signup = async (req, res) => {
    const {name, email, password} = req.body;
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
            name,
            email,
            password: hashedPassword,
            imageUrl: ''
        })

        console.log("🔹 Saving user to database...");
        await newUser.save();

        //Generate token
        console.log("🔹 Generating token...");
        const token = jwt.sign(
            {id: newUser._id, name: newUser.name, email: newUser.email},
            process.env.JWT_SECRET,
            {expiresIn: "1D"}
        )
        
        console.log("✅ Signup successful!");

        const userWithoutPassword = newUser.toObject();
        delete userWithoutPassword.password;

        return res
        .cookie('token', token, {httpOnly: true})
        .status(201).json({message: "Registration successful",user: userWithoutPassword, success: true});
        
    }
    catch(error) {
        console.log("🔴 Signup failed! Error:", error.message);
        return res.status(500).json({message:"Something went wrong", error: error.message});
        
    }
}

//@desc Login User

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(400).json({ message: "User does not exist!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials!" });

    //Generate token
    const token = jwt.sign(
      {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );

    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;

    return res
      .cookie('token', token, { httpOnly: true, secure: false })
      .status(201)
      .json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export {signup, login}