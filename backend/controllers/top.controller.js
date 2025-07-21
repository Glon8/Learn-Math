import User from "../models/user.model.js";
import Score from '../models/score.model.js';
import Participant from '../models/participant.model.js';
import { verify } from "../util/token.util.js";

export const signToTop = async (req, res) => {
    const token = req.body.token;

    //token verification before user delition
    const verImage = await verify(token);

    if (!!verImage) {
        const participantModel = new Participant({ userId: verImage?._id });

        console.log(participantModel)

        try {
            await participantModel.save();

            res.status(200).json({ success: true, message: 'User has been added to top list!' });
        }
        catch (error) {
            console.log('Error in signing to the top list: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in signing to the top list: expired token!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteFromTop = async (req, res) => {
    const token = req.body.token;

    //token verification before user delition
    const verImage = await verify(token);

    if (!!verImage) {
        try {
            await Participant.deleteOne({ userId: verImage?._id });

            res.status(200).json({ success: true, message: 'User has been removed from top list!' });
        }
        catch (error) {
            console.log('Error in removing from the top list: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

export const getTop = async (req, res) => {
}