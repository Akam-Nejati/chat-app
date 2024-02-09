import mongoose from "mongoose"

interface MongooseConnectOptions extends mongoose.ConnectOptions {
    useNewUrlParser?: boolean;
    useCreateIndex?: boolean,
    useUnifiedTopology?: boolean
}

const options: MongooseConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect("mongodb://localhost:27017/chat-app", options)
const db = mongoose.connection

export default db
