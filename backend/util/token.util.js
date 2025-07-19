import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import tokenKey from '../config/securityKey.config.js'

export const createToken = async (id) => {
    return await jwt.sign({ id: id }, tokenKey, { expiresIn: '3h' });
}

export const verify = async (token) => {
    const userId = await jwt.verify(token, tokenKey);

    if (!userId.id) return false;

    const user = await User.findOne({ _id: userId.id });

    if (!user) return false;
    else return user;
}