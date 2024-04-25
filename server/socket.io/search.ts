import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import User from '../models/user';

type SocketIo = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;

export default function search(socket: SocketIo) {
    socket.on('search', (user: { info: string }) => {
        User.find({
            $or: [
                { userName: { $regex: user.info, $options: 'i' } },
                { email: { $regex: user.info, $options: 'i' } }
            ]
        })
            .then((res) => {
                socket.emit('searchResults', res);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });
}
