import connectDB from '../db/connectDb.js';
import User from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// SIGN UP CONTROLLER
export const signUpcontroller = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    return res.status(201).json({ success: true, message: "User created successfully." });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// SIGN IN CONTROLLER
export const signIncontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    await connectDB();

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const payload = {
      email: validUser.email,
      id: validUser._id,
      role: validUser.user_role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  return res.status(200).json({
    success: true,
    role: validUser.user_role,
    token: token,
    message: "Login successful",
  });

  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
