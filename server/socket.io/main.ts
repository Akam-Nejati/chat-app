import { Server, Socket } from 'socket.io';
import message from "./messages/message"

const io = new Server(3001);

async function connectToSocketIo() {
    io.on('connection', (socket) => {
        console.log('socket is running');
        message(socket);
    });
}

export { connectToSocketIo };
