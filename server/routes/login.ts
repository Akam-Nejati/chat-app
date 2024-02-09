import express from "express";
import userModel from "../models/user";
import User from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation (optional but highly recommended)
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1. Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT payload with user ID
    const payload = { id: user._id };

    // 4. Sign and set JWT token in cookie with secure and httpOnly flags
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("Missing SECRET_KEY environment variable");
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      httpOnly: true, // Prevent client-side JavaScript access
      secure: true, // Only send over HTTPS connections (if in production)
    });

    // 5. Send successful login response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
