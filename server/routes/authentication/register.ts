import express from "express";
import userModel from "../../models/user";
import type User from "../../interfaces/user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();


router.post("/", async (req, res) => {
  
  const { email, password, userName } = req.body as User
  
  if (!email || !password || !userName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newToken = (payload: any): string => {
    const secretKey = process.env.SECRET_KEY as string;
    const token: string = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  };
    
  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    userName: userName,
    password: hashedPassword,
    email: email,
  });

  newUser
    .save()
    .then((data) => {
      const { _id: id, userName } = data;
      const token: string = newToken({ id });
      res.status(200).json({ id, userName, token });
    })
    .catch((error) => {
      if (Object.keys(error.keyValue).length > 0) {
        const field = Object.keys(error.keyValue)[0];

        res
          .status(400)
          .json({message: `An account has already been created with this ${field}`});
      }
    });
});

export default router;
