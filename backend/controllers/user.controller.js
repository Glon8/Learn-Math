import User from "../models/user.model.js";
import Score from "../models/score.model.js";
import Participant from "../models/participant.model.js";
import { verify, createToken } from "../util/token.util.js";
import { verifyName, verifyEmail, verifyPassword, verifySecretQuestion, verifySecretAnswer } from '../util/verification.util.js'
import { validateEmail } from "../util/validation.util.js";

export const signIn = async (req, res) => {
    const token = req.body.token;

    if (!token) { // sign in my email & password
        const email = req.body.email;
        const password = req.body.password;

        // email check in db
        if (await validateEmail(email)) {
            const fetchedUser = await User.findOne({ email: email });

            // credentials verification
            if (verifyPassword(fetchedUser?.password, password).message) {
                try {
                    const fetchedScore = await Score.findOne({ userId: fetchedUser._id });

                    // token creation
                    const newToken = await createToken(fetchedUser._id);

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
            const fetchedUser = await verify(token);
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
    if (!(await validateEmail(newUser.email))) {
        // credentials verification
        let box = verifyName(newUser.name);

        if (box.success) {
            box = verifyEmail(newUser.email);

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

                            newScore["userId"] = updatedUser._id;

                            const scoreModel = new Score(newScore);

                            await scoreModel.save();

                            const updatedScore = await Score.findOne({ userId: updatedUser._id });

                            // token creation
                            const newToken = await createToken(updatedUser._id);

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
        console.log('Error in creating user: this email already in db!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const upUser = async (req, res) => { // set request
    const token = req.body.token;
    const newUser = req.body.user;
    const newScore = req.body.score;

    //token verification before user update
    const verImage = await verify(token);

    // must check the token and compare user id with the token id
    if (!!verImage && verImage._id == newUser._id) {
        // email check in db
        if (await validateEmail(newUser.email)) {
            // credentials verification
            let box = verifyName(newUser.name);

            if (box.success) {
                box = verifyEmail(newUser.email);

                if (box.success) {
                    box = verifySecretQuestion(newUser.secret);

                    if (box.success) {
                        box = verifySecretAnswer(newUser.answer);

                        if (box.success) {
                            // validation succeed so I prepare values to save in db
                            try {
                                // save in data base
                                await User.updateOne({ _id: verImage._id }, {
                                    shared: newUser.shared,
                                    name: newUser.name,
                                    email: newUser.email,
                                    password: newUser.password,
                                    secret: newUser.secret,
                                    answer: newUser.answer,
                                    settings: newUser.settings,
                                    mode: newUser.mode,
                                    language: newUser.language,
                                    navPosition: newUser.navPosition
                                });
                                await Score.updateOne({ userId: verImage._id }, {
                                    sum_substract: newScore.sum_substract,
                                    multiply_divide: newScore.multiply_divide,
                                    mixed: newScore.mixed,
                                    power_root: newScore.power_root,
                                    fraction_fractionMixed: newScore.fraction_fractionMixed,
                                    forms_sizes: newScore.forms_sizes,
                                    exam_basic: newScore.exam_basic,
                                    equasions_basic: newScore.equasions_basic,
                                    equations_two_more: newScore.equations_two_more,
                                    verbal_problems: newScore.verbal_problems,
                                    geometry: newScore.geometry,
                                    quadratic_equation: newScore.quadratic_equation,
                                    circles: newScore.circles,
                                    exam_advanced: newScore.exam_advanced
                                });

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
            console.log('Error in updating user: no such an email in db!');
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in updating user: expired token!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const delUser = async (req, res) => {
    const token = req.body.token;

    //token verification before user delition
    const verImage = await verify(token);

    if (!!verImage) {
        try {
            await Participant.deleteOne({ userId: verImage?._id });
            await User.deleteOne({ _id: verImage._id });
            await Score.deleteOne({ userId: verImage._id });

            res.status(200).json({ success: true, message: 'User has been deleted from db!' });
        }
        catch (error) {
            console.log('Error in deleting user: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in deleting user: expired token!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
} 