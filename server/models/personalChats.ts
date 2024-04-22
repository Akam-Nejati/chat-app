import mongoose from "mongoose";

const message = new mongoose.Schema({
  text: String,
  sender: String,
  receiver: String,
  seen: Boolean,
});

const Message = mongoose.model("Messages ", message);

export default Message;
