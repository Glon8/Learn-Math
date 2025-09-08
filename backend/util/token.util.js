import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const createToken = async (id) => {
    return jwt.sign({ id: id }, process.env.tokenKey, { expiresIn: '7d' });
}

export const verify = async (token) => {
    try {
        const userId = jwt.verify(token, process.env.tokenKey);

        if (!userId.id) return false;

        const user = await User.findOne({ _id: userId.id });

        if (!user) return false;
        else return user;
    }
    catch (error) {
        console.log('Error in verify token: ' + error.message);
        return false;
    }
}