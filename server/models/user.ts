import mongoose from "mongoose";

const user = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
}, {
    timestamps: true,
    versionKey: false
})

const User = mongoose.model("Users", user)

export default User