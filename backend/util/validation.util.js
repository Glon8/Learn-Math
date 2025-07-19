import User from "../models/user.model"

export const validateId = async (id) => {
    const user = await User.findOne({ _id: id });

    return !!user;
}

export const validateEmail = async (email) => {
    const user = await User.findOne({ email: email });

    return !!user;
}