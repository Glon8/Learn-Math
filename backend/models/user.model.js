import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    status: {
        type: String,
        require: true
    },
    shared: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    secret: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    },
    settings: {
        type: String,
        require: true
    },
    mode: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    navPosition: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;