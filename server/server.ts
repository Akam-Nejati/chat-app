// // // const express = require("express")
// // // const socket = require("socket.io")

// // // const app = express()
// // // const server = app.listen("3000")
// // // const io = socket(server)

// // // io.on('connection', (socket: any) => {
// // //     socket.on('send-msg', function (data: string) {
// // //         io.emit("message", data)
// // //     });
// // //     io.emit('message', 'Hello from server!')
// // // })


import express from "express"
import * as mongoose from "mongoose"
import bodyParser from "body-parser"
import useRoutes from "./routes/main"
import cors from "cors"
import {connectToSocketIo} from "./socket.io/main" 
// import cookie from "cookie-parser"
// import message from "./socket.io/messages/message"

const app = express()

connectToSocketIo()

app.use(bodyParser.json());
app.use(cors())

useRoutes(app)

mongoose.connect('mongodb://127.0.0.1:27017/chat-app')

.then(() => {
    console.log('Connected to MongoDB');

    app.listen("3000", () => {
        console.log("server is running");
    })
})
.catch(error => {
    console.log(error);
})
