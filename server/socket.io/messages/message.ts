// import { socketIo } from '../main';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type SocketIo = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;
export default function message(socket: SocketIo) {
    socket.on('send', (message: any) => {
        console.log(message);
    });
}
