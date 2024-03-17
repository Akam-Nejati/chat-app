import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import userModel from "../models/user";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mr.akam.320@gmail.com",
    pass: "zuaz lulq eekf udxg",
  },
});

router.post("/", (req, response) => {
  const { email } = req.query;
  const newToken = (payload: any): string => {
    const secretKey = process.env.SECRET_KEY as string;
    const token: string = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  };

  userModel
    .find({ email: email })
    .then((user) => {
      const userId = user[0]._id.toString();
      const restToken = newToken({ id: userId });
      
      const mailOptions = {
        from: "mr.akam.320@email.com",
        to: email as string,
        text: "That was easy!",
        html: `
            <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #1C1B1F; color: #fff; display: flex; justify-content: center; align-items:center; height: 100vh; ">
                <table style="width: fit; margin: 0 auto; border-collapse: collapse; margin: 0 2rem;">
                    <tr>
                        <td style="padding: 2rem; background-color: #4A4458; text-align: center ; border-radius: 25px;">
                            <h1 style="margin: 0; font-size: 24px; color: #fff;">Reset Your Password</h1>
                            <p style="margin: 20px 0; font-size: 16px; line-height: 1.5; color: #ccc; text-align: justify;">
                                Click the button below to reset your password. If you didn't request a password reset, you can safely ignore this email.
                            </p>
                            <a href="${process.env.BASE_URL}/auth/setnewpassword?resrettoken=${restToken}" style="display: inline-block; background-color: #D0BCFF; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 100px; margin-bottom: 20px;">
                                Reset Password
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        `,
      };

      transporter
        .sendMail(mailOptions)
        .then((res) => {
            response.send({ message: "Check your email to reset password" });
        })
        .catch((err) => {
          response.status(412).send({ message: "Faild to send Email" });
        });
    })
    .catch((err) => {
      response.status(404).send({ message: "Cant find user with this email" });
    });
});

export default router;
