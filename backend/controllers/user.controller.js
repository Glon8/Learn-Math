import User from "../models/user.model.js";
import Score from "../models/score.model.js";
import { verify, createToken } from "../util/token.util.js";
import { verifyName, verifyEmail, verifyPassword, verifySecretQuestion, verifySecretAnswer } from '../util/verification.util.js'
import { validateEmail } from "../util/validation.util.js";

export const signIn = async (req, res) => {
    const token = req.body.token;

    if (!token) { // sign in my email & password
        const email = req.body.email;
        const password = req.body.password;

        // email check in db
        if (validateEmail(email)) {
            const fetchedUser = await User.findOne({ email: email });

            // credentials verification
            if (password == fetchedUser.password) {
                try {
                    const fetchedScore = await Score.findOne({ userId: fetchedUser._id });

                    // token creation
                    const newToken = createToken(fetchedUser._id);

                    const box = {
                        token: newToken,
                        user: fetchedUser,
                        score: fetchedScore
                    }

                    res.status(200).json({ success: true, message: 'User has been loaded from db by email!', data: box });
                }
                catch (error) {
                    console.log('Error in loading user by email: ' + error.message);
                    res.status(500).json({ success: false, message: 'Server error' });
                }
            }
            else {
                console.log('Error in loading user by email: passwords dont match!');
                res.status(500).json({ success: false, message: 'Server error' });
            }
        }
        else {
            console.log('Error in loading user by email: no such account with that email exist!');
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else { // sign in by token
        try {
            const fetchedUser = verify(token);
            const fetchedScore = await Score.findOne({ userId: fetchedUser._id });

            const box = {
                token: token,
                user: fetchedUser,
                score: fetchedScore
            }

            res.status(200).json({ success: true, message: 'User has been loaded from db by token!', data: box });
        }
        catch (error) {
            console.log('Error in loading user by token: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

export const signUp = async (req, res) => {
    const newUser = req.body.user;
    const newScore = req.body.score;

    // email check in db
    if (!validateEmail(newUser.email)) {
        // credentials verification
        let box = verifyName(newUser.name);

        if (box.success) {
            box = verifyEmail(newUser.email);

            if (box.success) {
                box = verifyPassword(newUser.password);

                if (box.success) {
                    box = verifySecretQuestion(newUser.secret);

                    if (box.success) {
                        box = verifySecretAnswer(newUser.answer);

                        if (box.success) {
                            // validation succeed so I prepare values to save in db
                            const userModel = new User(newUser);

                            try {
                                // save in data base
                                await userModel.save();

                                // update user data
                                const updatedUser = await User.findOne({ email: newUser.email });

                                newScore[userId] = updatedUser._id;

                                const scoreModel = new Score(newScore);

                                await scoreModel.save();

                                const updatedScore = await Score.findOne({ userId: updatedUser._id });

                                // token creation
                                const newToken = createToken(updatedUser._id);

                                const box = {
                                    token: newToken,
                                    user: updatedUser,
                                    score: updatedScore
                                }

                                //return form back with updated user
                                res.status(200).json({ success: true, message: 'User has been created in db!', data: box });
                            }
                            catch (error) {
                                console.log('Error in creating user: ' + error.message);
                                res.status(500).json({ success: false, message: 'Server error' });
                            }
                        }
                        else {
                            console.log(box.message);
                            res.status(box.stat).json({ success: box.success, message: box.message });
                        }

                    }
                    else {
                        console.log(box.message);
                        res.status(box.stat).json({ success: box.success, message: box.message });
                    }
                }
                else {
                    console.log(box.message);
                    res.status(box.stat).json({ success: box.success, message: box.message });
                }
            }
            else {
                console.log(box.message);
                res.status(box.stat).json({ success: box.success, message: box.message });
            }
        }
        else {
            console.log(box.message);
            res.status(box.stat).json({ success: box.success, message: box.message });
        }
    }
    else {
        console.log('Error in creating user: this email already in db!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const upUser = async (req, res) => { // set request
    const newUser = req.body.user;
    const newScore = req.body.score;

    // email check in db
    if (validateEmail(newUser.email)) {
        // credentials verification
        if (box.success) {
            box = verifyEmail(newUser.email);

            if (box.success) {
                box = verifyPassword(newUser.password);

                if (box.success) {
                    box = verifySecretQuestion(newUser.secret);

                    if (box.success) {
                        box = verifySecretAnswer(newUser.answer);

                        if (box.success) {
                            // validation succeed so I prepare values to save in db
                            const userModel = new User(newUser);
                            const scoreModel = new Score(newScore);

                            try {
                                // save in data base
                                await userModel.save();
                                await scoreModel.save();

                                //return form back with updated user
                                res.status(200).json({ success: true, message: 'User has been updated in db!' });
                            }
                            catch (error) {
                                console.log('Error in updating user: ' + error.message);
                                res.status(500).json({ success: false, message: 'Server error' });
                            }
                        }
                        else {
                            console.log(box.message);
                            res.status(box.stat).json({ success: box.success, message: box.message });
                        }
                    }
                    else {
                        console.log(box.message);
                        res.status(box.stat).json({ success: box.success, message: box.message });
                    }
                }
                else {
                    console.log(box.message);
                    res.status(box.stat).json({ success: box.success, message: box.message });
                }
            }
            else {
                console.log(box.message);
                res.status(box.stat).json({ success: box.success, message: box.message });
            }
        }
        else {
            console.log(box.message);
            res.status(box.stat).json({ success: box.success, message: box.message });
        }
    }
    else {
        console.log('Error in updating user: no such an email in db!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const delUser = async (req, res) => {
    const userId = req.body.id;

    try {
        await User.deleteOne({ _id: userId });
        await Score.deleteOne({ userId: userId });

        res.status(200).json({ success: true, message: 'User has been deleted from db!' });
    }
    catch (error) {
        console.log('Error in deleting user: ' + error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
} 