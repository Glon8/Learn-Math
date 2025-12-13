import mongoose from "mongoose";
import User from "../models/user.model.js"

export const validateId = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return !!(await User.findOne({ _id: id }));
}

export const validateEmail = async (email) => { return !!(await User.findOne({ email })) }