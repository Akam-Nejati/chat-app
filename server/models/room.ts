import mongoose from 'mongoose';

const room = new mongoose.Schema({
  id: String,
  chats: [
      {
          text: String,
          sender: String,
          receiver: String,
          seen: Boolean
      }
  ]
});

const Room = mongoose.model('rooms', room);

export default Room;
