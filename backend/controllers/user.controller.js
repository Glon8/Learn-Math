import User from "../models/user.model.js";
import Score from "../models/score.model.js";
import Participant from "../models/participant.model.js";
import Compare from '../models/compare.model.js'
import { verify, createToken } from "../util/token.util.js";
import { verifyName, verifyEmail, verifyPassword, verifySecretQuestion, verifySecretAnswer, verPassword } from '../util/verification.util.js'
import { validateEmail } from "../util/validation.util.js";

export const getSecret = async (req, res) => {
    const email = req.body.email;

    if (await validateEmail(email)) {
        try {
            const fetchedUser = await User.findOne({ email: email });

            if (!!fetchedUser) res.status(200).json({ success: true, message: 'User secret was successfully fetched!', data: { email: email, secret: fetchedUser.secret } });
            else res.status(404).json({ success: false, message: 'There no such user!', data: { email: email, secret: null } })
        }
        catch (error) {
            console.log('Error in fetching user secret: ' + error.message);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

export const signIn = async (req, res) => {
    const token = req.body.token;

    if (!token) { // sign in my email & password
        const email = req.body.email;
        const password = req.body.password;
        const answer = req.body.answer;

        // email check in db
        if (await validateEmail(email)) {
            const fetchedUser = await User.findOne({ email: email });

            // credentials verification
            // Note: was: verifyPassword().message
            const answerFlag = !!answer && verifySecretAnswer(fetchedUser?.answer, answer).success;
            const passwordFlag = !answer && verifyPassword(fetchedUser?.password, password).success;

            if (answerFlag || passwordFlag) {
                try {
                    if (answerFlag) {
                        fetchedUser['password'] = password;

                        const userModel = new User(fetchedUser);

                        await userModel.save();
                    }

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

    if (!!newScore) {
        // email check in db
        if (!(await validateEmail(newUser.email))) {
            // credentials verification
            let box = verifyName(newUser.name);

            if (box.success) {
                box = verifyEmail(newUser.email);

                if (box.success) {
                    box = verifySecretQuestion(newUser.secret);

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
            console.log('Error in creating user: this email already in db!');
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in creating user: data corrupted no scores!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const upUser = async (req, res) => { // set request
    const token = req.body.token;
    const newUser = req.body.user;

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

const gradeCount = async (savedAns, answers) => {
    let averGrade = (100 / savedAns.length); // <======= works with only one dimentional array!!

    // hash check with two dimentional array
    //const grade = averGrade * (await Promise.all(savedAns.flatMap((row, i) => row.map((v, j) => verPassword(answers[i][j], `${v}`).then(ok => (ok ? 1 : 0)))))).reduce((a, b) => a + b, 0);

    // hash check with one dimentional array
    const grade = averGrade * (await Promise.all(savedAns.map((v, i) => verPassword(answers[i]?.[0]?.[1], `${v}`) ? 1 : 0))).reduce((a, b) => a + b, 0);

    return grade;
}

export const ansComp = async (req, res) => {
    /*
        db save:
        {
            id: ...,
            userId: ...,
            ans: [...],
            timestamps: ...,
        }
    */
    const token = req.body.token;
    const answers = req.body.answers;
    const theme = req.body.theme;

    // must to validate the token with users db
    const user = await verify(token);

    if (!!user._id) { // there is a valid token
        const savedAns = await Compare.findOne({ userId: user._id });

        if (!!savedAns.ans) { // is there are saved answers for the user
            // compare received answers with saved ones in db
            const grade = await gradeCount(savedAns.ans, answers);

            // fetching old score sheet
            const oldGrade = await Score.findOne({ userId: user._id });

            // calculating the score
            const finalAns = oldGrade[theme] != 0 && oldGrade[theme] != null ? ((grade + oldGrade[theme]) / 2) : grade;

            // after compare update user score in db
            await Score.updateOne({ userId: user._id }, { $set: { [theme]: finalAns } });

            // delete saved answers from db
            await Compare.deleteOne({ userId: user._id });
        }
        else { // there is no answers for this user awailable
            console.log('Error answers compare: no answers was found for that user id!');
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
    else { // invalid token
        console.log('Error answers compare: invalid token!');
        res.status(500).json({ success: false, message: 'Server error' });
    }
}