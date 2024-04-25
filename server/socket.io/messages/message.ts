import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { privateKey, publicKey } from '../../services/crypto';
import crypto from 'crypto';
import Room from '~/server/models/room';

type SocketIo = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;

export default function message(socket: SocketIo) {
    socket.on('send', async (message: any) => {
        console.log('Received message:', message);
        const { text, roomId } = message;

        const encryptedMessage = crypto.publicEncrypt(
            publicKey,
            Buffer.from(text)
        );

        message.text = encryptedMessage;

        if (roomId) {
            console.log(`Trying to update room with ID: ${roomId}`);
            try {
                const room = await Room.findOne({ _id: roomId });

                if (!room) {
                    console.log('Room not found');
                    return;
                }

                const updatedRoom = await Room.findOneAndUpdate(
                    { _id: roomId },
                    { $push: { chats: message } },
                    { new: true }
                );
                console.log('Updated room:', updatedRoom);
            } catch (error) {
                console.log('Error updating room:', error);
            }
        } else {
            console.log('Creating a new room...');
            const newRoom = new Room({
                chats: [message]
            });

            try {
                const savedRoom = await newRoom.save();
                console.log('Room was created:', savedRoom);
            } catch (err) {
                console.log('Error creating room:', err);
            }
        }
    });
}