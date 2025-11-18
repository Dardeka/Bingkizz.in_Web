import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "user"
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false,
        default: ""
    },
    phoneNum: {
        type: String,
        required: false,
        default: ""
    },
    profilePic: {
        type: String,
        required: false,
    }
})

export default mongoose.model("Users", userSchema, "Users");