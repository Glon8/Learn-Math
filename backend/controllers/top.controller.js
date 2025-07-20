import User from "../models/user.model.js";
import Score from '../models/score.model.js';
import Participant from '../models/participant.model.js'
import { validateId } from '../util/validation.util.js'

export const signToTop = async (req, res) => {
    const id = req.body.id;

    // id check in db
    if (validateId(id)) {
        const participantModel = new Participant(id);

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
        onsole.log('Error in signing to the top list: id doesnt exists in db!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteFromTop = async (req, res) => {
    const id = req.body.id;

    try {
        await Participant.deleteOne({ userId: id });

        res.status(200).json({ success: true, message: 'User has been removed from top list!' });
    }
    catch (error) {
        console.log('Error in removing from the top list: ' + error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const getTop = async (req, res) => {

}