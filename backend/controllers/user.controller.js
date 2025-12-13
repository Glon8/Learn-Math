import User from "../models/user.model.js";
import Score from "../models/score.model.js";
import Participant from "../models/participant.model.js";
import Compare from '../models/compare.model.js'
import { verify, createToken } from "../util/token.util.js";
import { verifyName, verifyEmail, verifyPassword, verifySecretQuestion, verifySecretAnswer, encCompare } from '../util/verification.util.js'
import { validateEmail } from "../util/validation.util.js";

const serverError = (res, msg) => res.status(500).json({ success: false, message: msg ?? 'Server error' });
const customError = (res, item) => { if (!item.success) { console.error(item.message); res.status(item.stat).json({ success: item.success, message: item.message }); return true; } return false; }

export const getSecret = async (req, res) => {
    const { email } = req.body;
    if (!await validateEmail(email)) { console.error('Email not exists'); return serverError(res); }
    try {
        const user = await User.findOne({ email });
        res.status(user ? 200 : 404).json({
            success: !!user,
            message: user ? 'User secret was successfully fetched!' : 'There no such user!',
            data: { email: email, secret: user ? user.secret : null }
        });
    }
    catch (error) { console.error(error.message); return serverError(res); }
}

export const signIn = async (req, res) => {
    const { token, email, password, answer } = req.body;
    // token verification = sign by token
    if (token) try {
        const user = await verify(token);
        const score = await Score.findOne({ userId: user._id });
        return res.status(200).json({ success: true, message: 'User loaded by token!', data: { token, user, score } });
    } catch (err) { console.error(err); return serverError(res); }
    // email validation = sign by email
    if (!(await validateEmail(email))) return serverError(res, 'No account with that email exists');
    // user check
    const user = await User.findOne({ email });
    if (!user) return serverError(res, 'No such user found');
    // credentials verification
    const fAns = answer && (await verifySecretAnswer(answer, user?.answer)).success;
    const fPass = password && (await verifyPassword(password, user?.password)).success;
    if (!((fAns && !fPass) || (!fAns && fPass))) return serverError(res, 'Credentials do not match');
    try {
        if (fAns) { user.password = password; await new User(user).save(); }
        const score = await Score.findOne({ userId: user._id });
        const newToken = await createToken(user._id);
        res.status(200).json({ success: true, message: 'User loaded by email!', data: { token: newToken, user, score } });
    } catch (err) { console.error(err); return serverError(res); }
}

export const signUp = async (req, res) => {
    const { user, score } = req.body;
    // score and user data validation
    if (!score) { console.error('No score'); return serverError(res); }
    if (await validateEmail(user.email)) { console.error('This email already exists'); return serverError(res); }
    // credentials verification
    let box = [verifyName(user.name), verifyEmail(user.email), verifySecretQuestion(user.secret)];
    for (const item of box) if (customError(res, item)) return;
    // validation succeed so I prepare values to save in db
    const userM = new User(user);
    try {// save in data base
        await userM.save();
        // update user data
        const uUser = await User.findOne({ email: user.email });
        score["userId"] = uUser._id;
        const scoreM = new Score(score);
        await scoreM.save();
        const uScore = await Score.findOne({ userId: uUser._id });
        // token creation
        const token = await createToken(uUser._id);
        //return form back with updated user
        res.status(200).json({ success: true, message: 'User has been created in db!', data: { token: token, user: uUser, score: uScore } });
    }
    catch (error) { console.error(error.message); return serverError(res); }
}

export const upUser = async (req, res) => {
    const { token, user } = req.body;
    //token verification before user update
    const verImg = await verify(token);
    // token and user data validation
    if (!verImg || verImg._id != user._id) { console.error('Expired token'); return serverError(res); }
    if (!(await validateEmail(user.email))) { console.error('No such user'); return serverError(res); }
    // credentials verification
    let box = [verifyName(user.name), verifyEmail(user.email), verifySecretQuestion(user.secret)];
    for (const item of box) if (customError(res, item)) return;
    // validation succeed so I prepare values to save in db
    try { // save in data base
        await User.updateOne({ _id: verImg._id }, {
            shared: user.shared,
            name: user.name,
            email: user.email,
            password: user.password,
            secret: user.secret,
            answer: user.answer,
            settings: user.settings,
            mode: user.mode,
            language: user.language,
            navPosition: user.navPosition
        });
        //return updated user
        res.status(200).json({ success: true, message: 'User has been updated in db!' });
    }
    catch (error) { console.error(error.message); return serverError(res); }
}

export const delUser = async (req, res) => {
    const { token } = req.body;
    //token verification
    const verImg = await verify(token);
    if (!verImg) { console.error('Expired token'); return serverError(res); }
    try {
        await Participant.deleteOne({ userId: verImg?._id });
        await User.deleteOne({ _id: verImg._id });
        await Score.deleteOne({ userId: verImg._id });

        res.status(200).json({ success: true, message: 'User has been deleted from db!' });
    }
    catch (error) { console.error(error.message); return serverError(res); }
}

const gradeCount = async (savedAns, answers) => {
    let averGrade = (100 / savedAns.length); // <======= works with only one dimentional array!!

    // hash check with two dimentional array
    //const grade = averGrade * (await Promise.all(savedAns.flatMap((row, i) => row.map((v, j) => verPassword(answers[i][j], `${v}`).then(ok => (ok ? 1 : 0)))))).reduce((a, b) => a + b, 0);

    // hash check with one dimentional array
    const grade = averGrade * (await Promise.all(savedAns.map((v, i) => encCompare(answers[i]?.[0]?.[1], `${v}`) ? 1 : 0))).reduce((a, b) => a + b, 0);

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
    const { token, answers, theme } = req.body;
    // token verification
    const user = await verify(token);
    if (!user?._id) { console.error('Invalid token'); return serverError(res); }
    const savedAns = await Compare.findOne({ userId: user._id });
    // answers ceck
    if (!savedAns?.ans) { console.error('No answers found for this user id'); return serverError(res); }
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