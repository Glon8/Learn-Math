import mongoose from "mongoose";
import User from "../models/user.model.js"

export const validateId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;

    const user = await User.findOne({ _id: id });

    return !!user;
}

export const validateEmail = async (email) => {
    const user = await User.findOne({ email: email });

    return !!user;
}