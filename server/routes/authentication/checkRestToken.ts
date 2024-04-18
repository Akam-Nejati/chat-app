import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", async (req, response) => {
    const { token } = req.body;
    if (!token) {
        return response.status(400).json({ message: "Missing token" });
    }else {
        jwt.verify(token, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
            if (err) {
                return response.status(400).json({ message: "Invalid token" });
            }else {
                return response.status(200).json({ message: "Token valid", userId: decoded.id });
            }
        })
    }
});

export default router