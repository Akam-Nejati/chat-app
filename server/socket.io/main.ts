import { Server, Socket } from 'socket.io';
import message from "./messages/message"
import search from "./search"

const io = new Server(3001);

async function connectToSocketIo() {
    io.on('connection', (socket) => {
        console.log('socket is running');
        message(socket);
        search(socket);
    });
}

export { connectToSocketIo };
