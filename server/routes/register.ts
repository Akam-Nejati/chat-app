import express from "express";
import userModel from "../models/user";
import type User from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

const router = express.Router();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mr.akam.320@gmail.com',
//         pass: 's*gz4922'
//     }
// });
// const mailOptions = {
//   from: 'mr.akam.320@email.com',
//   to: 'nixif17209@oprevolt.com',
//   text: 'That was easy!',
//   html: '<b>This email was sent using Nodemailer!</b>' // HTML content (optional)
// };

router.post("/", async (req, res) => {
  // transporter.sendMail(mailOptions)
  //     .then(res => {
  //         console.log(res);
  //     }).catch(err => {
  //         console.log(err);
  //     })

  const newToken = (payload: any): string => {
    const secretKey = process.env.SECRET_KEY as string;
    const token: string = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  };
    
  const body: User = req.body;
  const hashedPassword: string = await bcrypt.hash(body.password, 10);

  const newUser = new userModel({
    userName: body.userName,
    password: hashedPassword,
    email: body.email,
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
