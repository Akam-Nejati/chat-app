import express from "express";
import userModel from "../../models/user";
import User from "../../interfaces/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = { id: user._id };

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("Missing SECRET_KEY environment variable");
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({token: token , message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
