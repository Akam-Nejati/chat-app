// import express from 'express';
// import { Socket } from "socket.io"
const express = require("express")
const socket = require("socket.io")

const app = express()
const server = app.listen("3000")
const io = socket(server)

io.on('connection', (socket: any) => {
    socket.on('send-msg', function (data: string) {
        io.emit("message", data)
    });
    io.emit('message', 'Hello from server!')
})