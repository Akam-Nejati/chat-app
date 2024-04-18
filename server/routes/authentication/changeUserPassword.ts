import express from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, response) => {
    const { userId, password } = req.body;

    if (userId === undefined || password === undefined) {
        return response.status(400).json({ message: "Missing required fields" });
    }
    
    const hashedPassword: string = await bcrypt.hash(password, 10);

    User.findOneAndUpdate({ _id: userId }, { password: hashedPassword }).then((res) => {
        return response.status(200).json({ message: "Password changed" });
    }).catch((err) => {
        return response.status(400).json({ message: err.message });
    })
});

export default router;
