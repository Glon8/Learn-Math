import { verify } from "../util/token.util.js";
import Compare from '../models/compare.model.js';
import bcrypt from 'bcrypt'

const serverError = (res, msg) => res.status(500).json({ success: false, message: msg ?? 'Server error' });
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randCho = (val) => Math.floor(Math.random() * (val));

const sumAndSub = async (dif, sett) => {
    // < user settings (true = on, false = off)
    const setTypo = sett?.[3] ?? false; // < display overwrite
    const difSpike = sett?.[4] ?? false; // < difficulty spike
    const typo = setTypo ? 1 : randCho(2); // how exercise is displayed (0 = string, 1 = LaTeX)
    let threeValues = (dif >= 40 && !setTypo) ? randCho(2) : 0; // amount of values used (0 = two numbers, 1 = three numbers)
    let fSign = randCho(2); // first sign (0 = minus, 1 = plus)
    let sSign = ((dif >= 40 || difSpike) && threeValues == 1) ? randCho(2) : null; // second sign (0 = minus, 1 = plus)
    let quota; // difficulty quota
    if (difSpike) quota = 999999; // dificulty spike - on
    else if (dif < 40) quota = 99; // stage 1
    else if (dif >= 40 && dif < 75) quota = 999; // stage 2
    else quota = 9999; // stage 3
    const exercise = [], answer = [];
    const minQuota = Math.floor(quota * 0.1);
    // values for generation
    let first, second, third, op, ans, message;
    if (threeValues == 0) { // two values fork
        if (fSign == 0) {
            const firstMin = Math.floor(quota * 0.55);
            first = randInt(firstMin, quota);
            second = randInt(minQuota, (quota - first));
            op = '-';
            ans = first - second;
        }
        else {
            const firstMax = Math.floor(quota * 0.6);
            first = randInt(minQuota, firstMax);
            second = randInt(minQuota, (quota - first));
            op = '+';
            ans = first + second;
        }
        exercise.push({
            type: typo, message: (typo === 0 ? (`${first} ${op} ${second} = ?`) :
                (String.raw`\begin{array}{r} \text{${op}}\;${first} \\ \underline{${second}} \\ \end{array}`))
        });
        answer.push(ans);
    }
    else { // three values fork
        if (fSign == 1 && sSign == 1) { // case 1: + +
            first = randInt(minQuota, Math.floor(quota * 0.45));
            second = randInt(minQuota, (Math.floor(quota * 0.75) - first));
            third = randInt(minQuota, (quota - first - second));
            message = `${first} + ${second} + ${third} = ?`;
            ans = first + second + third;
        }
        else if (fSign == 1 && sSign == 0 || fSign == 0 && sSign == 1) { // case 2: + - or - +
            first = randInt(minQuota, Math.floor(quota * 0.45));
            second = randInt(minQuota, quota - first);
            const sum12 = first + second;
            third = randInt(Math.floor(sum12 * 0.1), sum12);
            if (fSign == 1 && sSign == 0) { // + -
                message = `${first} + ${second} - ${third}= ?`;
                ans = first + second - third;
            }
            else if (fSign == 0 && sSign == 1) { // - +
                message = `${first} - ${third} + ${second}= ?`;
                ans = first - third + second;
            }
        }
        else { // case 3: - -
            first = randInt(Math.floor(quota * 0.55), quota);
            second = randInt(minQuota, Math.floor(first * 0.75));
            third = randInt(0, (first - second));
            message = `${first} - ${second} - ${third}= ?`;
            ans = first - second - third;
        }
        exercise.push({ type: 0, message });
        answer.push(ans);
    }
    return { exe: exercise, ans: answer, desc: false };
}

const multiplyAndDivide = async (dif, sett) => {
    // < user settings (true = on, false = off)
    const setTypo = !!sett?.[5] ? sett?.[5] : false; // < display overwrite
    const difSpike = !!sett?.[6] ? sett?.[6] : false; // < difficulty spike
    const typo = setTypo ? 1 : randCho(2); // how exercise is displayed (0 = string, 1 = LaTeX)
    const sign = randCho(2); // sign (0 = divide, 1 = multiply)
    let quota; // difficulty quota
    if (difSpike) quota = 999; // difficulty spike
    else if (dif < 65) quota = 9; // stage 1
    else quota = 99; // stage 2
    const exercise = [], answer = [];
    const minQuota = Math.floor(quota * 0.3);
    // values for generation
    let first, second, product, ans, message;
    // assign values
    first = randInt(minQuota, quota);
    second = randInt(minQuota, quota);
    if (sign == 0) { // case 1: :
        product = first * second;
        message = typo == 0 ? (`${product} : ${first} = ?`) :
            (String.raw`\begin{array}{r} :\;${product} \\ \underline{${first}} \\ \end{array}`);
        ans = second;
    }
    else { // case 2: x
        message = typo == 0 ? (`${first} x ${second} = ?`) :
            (String.raw`\begin{array}{r} \text{x}\;${first} \\ \underline{${second}} \\ \end{array}`);
        ans = first * second;
    }
    exercise.push({ type: typo, message });
    answer.push(ans);
    return { exe: exercise, ans: answer, desc: false }
}

const mixed = async (dif, sett) => {
    // depends on signSwitch
    const fSign = randCho(2); // first sign (0 = negative, 1 = positive)
    const sSign = randCho(2); // second sign (0 = negative, 1 = positive)
    // switches
    const signSwitch = randCho(2); // determine whom ll multiply and whom ll sum (0 = first is summing, 1 = first is multiplying)
    const bracketSwitch = randCho(2); // determine if brackets appear or not (0 = no brackets, 1 = with brackets)
    let quota; // difficulty quota
    if (dif < 60) quota = 999; // stage 1
    else quota = 9999; // stage 2
    const exercise = [], answer = [];
    const minQuota = Math.floor(quota * 0.1);
    //operators maping (0 = negatives, 1 = positives)
    const ops = [['-', '/'], ['+', '*'],];
    // operators decoder
    const fstOp = ops[fSign][signSwitch];
    const secOp = ops[sSign][1 - signSwitch];
    // navigation key build
    const key = fstOp + secOp;
    // values for generation
    let first, second, third, ans, message;
    const high = quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1));
    const low = quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01));
    const getSmall = () => randInt(low, high);
    // generation functions
    const minus_div = (brackets) => {
        if (brackets == 1) {
            third = getSmall(); second = randInt(low, quota - (high ** 2)); first = getSmall() * third + second;
            message = `(${first} - ${second}) : ${third} = ?`; ans = (first - second) / third;
        }
        else {
            third = getSmall(); second = getSmall() * third; first = randInt((second / third) + minQuota, quota);
            message = `${first} - ${second} : ${third} = ?`; ans = first - (second / third);
        }
    }
    const minus_mul = (brackets) => {
        if (brackets == 1) {
            third = getSmall(); second = randInt(low, quota - high); first = getSmall() + second;
            message = `(${first} - ${second}) x ${third} = ?`; ans = (first - second) * third;
        }
        else {
            second = getSmall(); third = getSmall(); first = randInt(second * third, quota);
            message = `${first} - ${second} x ${third} = ?`; ans = first - (second * third);
        }
    }
    const div_minus = (brackets) => {
        if (brackets == 1) {
            third = randInt(low, quota - high); second = getSmall() + third; first = getSmall() * (second - third);
            message = `${first} : (${second} - ${third}) = ?`; ans = first / (second - third);
        }
        else {
            second = getSmall(); first = getSmall() * second; third = randInt(low, first / second);
            message = `${first} : ${second} - ${third} = ?`; ans = (first / second) - third;
        }
    }
    const div_plus = (brackets) => {
        if (brackets == 1) {
            second = randInt(low, high - 2); third = randInt(2, (high - second)); first = getSmall() * (second + third);
            message = `${first} : (${second} + ${third}) = ?`; ans = first / (second + third);
        }
        else {
            second = getSmall(); first = getSmall() * second; third = randInt(low, quota);
            message = `${first} : ${second} + ${third} = ?`; ans = (first / second) + third;
        }
    }
    const plus_div = (brackets) => {
        if (brackets == 1) {
            second = getSmall(); third = getSmall() * second; first = randInt(Math.floor(third * 0.2), Math.floor(third * 0.8)); third -= first;
            message = `(${third} + ${first}) : ${second} = ?`; ans = (third + first) / second;
        }
        else {
            second = getSmall(); first = getSmall() * second; third = randInt(low, quota);
            message = `${third} + ${first} : ${second} = ?`; ans = third + (first / second);
        }
    }
    const plus_mul = (brackets) => {
        if (brackets == 1) {
            third = getSmall(); first = randInt(low, high - 2); second = randInt(2, high - first);
            message = `(${first} + ${second}) x ${third} = ?`; ans = (first + second) * third;
        }
        else {
            second = getSmall(); third = getSmall(); first = randInt(low, quota - (second * third));
            message = `${first} + ${second} x ${third} = ?`; ans = first + (second * third);
        }
    }
    const mul_minus = (brackets) => {
        if (brackets == 1) {
            second = getSmall(); first = randInt(low, quota - high); third = getSmall() + first;
            message = `${second} x (${third} - ${first}) = ?`; ans = second * (third - first);
        }
        else {
            second = getSmall(); third = getSmall(); first = randInt(low, second * third);
            message = `${second} x ${third} - ${first} = ?`; ans = (second * third) - first;
        }
    }
    const mul_plus = (brackets) => {
        if (brackets == 1) {
            second = getSmall(); third = getSmall(); first = randInt(Math.floor(third * 0.2), Math.floor(third * 0.8)); third -= first;
            message = `${second} x (${third} + ${first}) = ?`; ans = second * (third + first);
        }
        else {
            second = getSmall(); third = getSmall(); first = randInt(low, quota - (second * third));
            message = `${second} x ${third} + ${first} = ?`; ans = (second * third) + first;
        }
    }
    // navigation functions
    const handlers = {
        "-/": minus_div, "-*": minus_mul,
        "/-": div_minus, "/+": div_plus,
        "+/": plus_div, "+*": plus_mul,
        "*-": mul_minus, "*+": mul_plus
    };
    handlers[key](bracketSwitch);
    exercise.push({ type: 0, message });
    answer.push(ans);
    return { exe: exercise, ans: answer, desc: false };
}

const powerAndRoot = async (dif, sett) => {
    const turn = randCho(2); // turn ll determine whom ll carry the root and power (0 = first, 1 = second)
    const main = randCho(3); // determine if there ll be a main root or power carrier (0 = no main, 1 = main root carrier, 2 = main power carrier)
    const sign = randCho(4); // sign (0 = minus, 1 = plus, 2 = divide, 3 = multiply)
    const powerFlip = randCho(2); // determine if the digits carry root or power (0 = root, 1 = power)
    let quota; // difficulty quota
    if (dif < 40) quota = 16;
    else if (dif >= 40) quota = 36;
    const exercise = [], answer = [];
    // values for generation
    let first, second, carrier, rawPow, mainPow, mp, ans, message;
    // generator helpers
    const low = Math.floor(quota * 0.1);
    const high = () => Math.floor(quota * 0.4);
    const pwrSwitch = (rev) => !rev ? (!powerFlip ? (rawPow ** 2) : (rawPow)) : (!powerFlip ? (rawPow) : (rawPow ** 2));
    const rndIntS = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const LtoQ = rndIntS(low, quota);
    if (sign == 0) { // minus sign
        mp = rndIntS(high(), quota - 1); mainPow = !main ? 0 : (main == 1 ? (mp ** 2) : (mp));
        rawPow = !main ? rndIntS(low + 1, quota) : (!turn ? rndIntS(mainPow, (!powerFlip ? (quota ** 2) : (quota))) : LtoQ);
        first = !turn ? pwrSwitch() : (!main ? (LtoQ + pwrSwitch(1)) : (mainPow + pwrSwitch(1)));
        second = !!turn ? pwrSwitch() : (!main ? rndIntS(low, pwrSwitch(1)) : (pwrSwitch(1) - mainPow));
    }
    else if (sign == 1) { // plus sign
        mp = rndIntS(high(), quota); mainPow = !main ? 0 : (main == 1 ? (mp ** 2) : (mp));
        rawPow = !main ? LtoQ : rndIntS(1, mainPow - 1);
        first = !turn ? pwrSwitch() : (!main ? LtoQ : mainPow - pwrSwitch(1));
        second = !!turn ? pwrSwitch() : (!main ? LtoQ : mainPow - pwrSwitch(1));
    }
    else if (sign == 2) { // divide sign
        carrier = LtoQ; rawPow = LtoQ;
        first = !turn ? (!powerFlip ? ((rawPow * carrier) ** 2) : (rawPow * carrier)) : (pwrSwitch(1) * carrier);
        second = !!turn ? pwrSwitch() : (carrier);
    }
    else if (sign == 3) { // multiply sign
        rawPow = LtoQ; first = !turn ? pwrSwitch() : LtoQ;
        second = !!turn ? pwrSwitch() : LtoQ;
    }
    // values for answers generation
    const ansMap = [
        [[[rawPow - second, rawPow ** 2 - second,], [first - rawPow, first - rawPow ** 2,],], [[mp],], [[mp ** 2],],],
        [[[rawPow + second, rawPow ** 2 + second,], [first + rawPow, first + rawPow ** 2,],], [[mp],], [[mp ** 2],],],
        [[[Math.sqrt(first) / second, (first) ** 2 / second,], [first / Math.sqrt(second), first / (second) ** 2,],],],
        [[[rawPow * second, (rawPow ** 2) * second,], [first * rawPow, first * (rawPow ** 2),],],]
    ];
    const mpCheck = sign < 2 && main > 0;
    ans = ansMap[sign][sign > 1 ? 0 : main][mpCheck ? 0 : turn][mpCheck ? 0 : powerFlip];
    // values for latex string generation
    const ops = ['-', '+', ':', 'x'];
    const pwr_sqrt = (sign, item) => { return sign == 1 ? `\\sqrt{${item}}` : (sign == 2 ? `(${item})^{2}` : item); }
    message = `${pwr_sqrt(sign < 2 ? main : 0, `${!turn ? pwr_sqrt((1 + powerFlip), first) : first}\\;\\text{${ops[sign]}}\\;${turn ? pwr_sqrt((1 + powerFlip), second) : second}`)}\\;=\\;?`;
    exercise.push({ type: 1, message });
    answer.push(ans);
    return { exe: exercise, ans: answer, desc: false }
}

const toolNumDenumDivider = (a, b) => {
    // NOTATION: GCD - Oclidus algorithm
    while (b !== 0) [a, b] = [b, a % b];
    return a;
}

const toolFracSimplify = (den, num) => {
    let whole = 0
    if (num >= den) { whole = Math.floor(num / den); num %= den; }
    if (num > 0) { const divider = toolNumDenumDivider(num, den); num /= divider; den /= divider; }
    return { whole, num, den };
}

const fractions = async (dif, sett) => {
    const sign = randCho(dif > 49 ? 4 : 2); // sign (0 = minus, 1 = plus, 2 = divide, 3 = multiply)
    let dMin; // deno helper
    let quota; // difficulty quota(for fraction)
    if (dif < 50) { quota = 90; dMin = 2; }
    else if (dif >= 50 && dif < 85) { quota = 900; dMin = 10; }
    else { quota = 9000; dMin = 100; }
    const exercise = []; const answer = [];
    const wholeQuota = 9; // actual exercise limit
    // values for generation
    let aNum, aDen, aWhole = 0;
    const ops = ['-', '+', ':', 'x'];
    const first = { whole: 0, num: 0, den: 0 }
    const second = { whole: 0, num: 0, den: 0 }
    const Q01 = (quota * 0.1); // deno helper
    const deno = randInt(dMin, Q01); //PS. minQuota for a whole is 0, while for numerator is 1. whole = quota / deno (floored).
    const packer = (item) => { const pack = toolFracSimplify(deno, item['num']); item['num'] = pack['num']; item['den'] = pack['den']; }
    const evaluate = perc => dif < 40 ? 1 : Math.floor((deno - 1) * perc);
    const high = evaluate(0.1);
    first['num'] = randInt(high, deno - 1);
    if (!sign) { // first sign is minus
        first['whole'] = randInt(1, wholeQuota); second['whole'] = randCho((first['whole'] - 1) + 1);
        second['num'] = randInt(high, first['num']); packer(first); packer(second);
        aNum = first.num * second.den - second.num * first.den; aDen = first.den * second.den;
    }
    else if (sign == 1) { // first sign is plus
        const low = evaluate(0.01); first['whole'] = randCho((wholeQuota - 2) + 1);
        second['whole'] = randCho((wholeQuota - first['whole'] + (first['whole'] != 0 ? (- 1) : 0)) + 1);
        second['num'] = randInt(low, (deno - first['num'])); packer(first); packer(second);
        aNum = first.num * second.den + second.num * first.den; aDen = first.den * second.den;
    }
    if (sign == 2) { // first sign is divide
        const low = evaluate(0.01); first['whole'] = randCho((wholeQuota - 1) + 1); second['whole'] = randCho((first['whole']) + 1);
        second['num'] = randInt(low, (deno - first['num'])); packer(first); packer(second);
        aNum = (first.num + first.whole * first.den) * second.den; aDen = first.den * (second.num + second.whole * second.den);
    }
    else if (sign == 3) { // first sign is multiply
        const temp = randCho(wholeQuota + 1), low = evaluate(0.01);
        first['whole'] = temp; second['whole'] = temp;
        second['num'] = randInt(low, (deno - first['num'])); packer(first); packer(second);
        aNum = (first.num + first.whole * first.den) * (second.num + second.whole * second.den); aDen = first.den * second.den;
    }
    const aPack = toolFracSimplify(aDen, aNum);
    const aWholeList = [() => first.whole - second.whole + aPack['whole'], () => first.whole + second.whole + aPack['whole'], () => aPack['whole'], () => aPack['whole'],];
    aWhole = aWholeList[sign](); aNum = aPack['num']; aDen = aPack['den'];
    exercise.push({ type: 1, message: String.raw`${!!first.whole && first.whole != 0 ? `${first.whole}` : ``}\tfrac{${first.num}}{${first.den}}\;\text{${ops[sign]}}\;${!!second.whole && second.whole != 0 ? `${second.whole}` : ``}\tfrac{${second.num}}{${second.den}}\;=\;?` });
    answer.push(!!aWhole ? (`${aWhole}${!!aNum ? `/${aNum}/${aDen}` : ``}`) : (`${!!aNum ? `${aNum}/${aDen}` : 0}`));
    return { exe: exercise, ans: answer, desc: false };
}

const testTears = {
    sum_substract: { tears: [39, 39, 39, 74, 74, 74, 74, 100, 100, 100], handler: sumAndSub, },
    multiply_divide: { tears: [50, 50, 50, 50, 50, 50, 100, 100, 100, 100], handler: multiplyAndDivide, },
    mixed: { tears: [30, 30, 30, 30, 30, 100, 100, 100, 100, 100], handler: mixed, },
    fraction_fractionMixed: { tears: [30, 30, 30, 30, 70, 70, 70, 70, 100, 100], handler: fractions, },
    power_root: { tears: [30, 30, 30, 100, 100, 100, 100, 100, 100, 100], handler: powerAndRoot, },
    forms_sizes: { tears: [], handler: () => { }, },
    equasions_basic: { tears: [], handler: () => { }, },
    equations_two_more: { tears: [], handler: () => { }, },
    verbal_problems: { tears: [], handler: () => { }, },
    geometry: { tears: [], handler: () => { }, },
    quadratic_equation: { tears: [], handler: () => { }, },
    circles: { tears: [], handler: () => { }, },
};

const testMaker = async (topic, sett) => {
    const pack = [];
    const diff = testTears[topic].tears;
    diff.forEach(async (tear) => {
        // pulling the function from testTears
        const taskHandler = testTears[topic].handler;
        // creating a box
        const box = await taskHandler(tear, sett);
        box['topic'] = topic;
        pack.push(box);
    });
    return pack;
}

const examLists = {
    exam_basic: {
        mustHave: [
            [(sett) => sumAndSub(100, sett), 'sum_substract'],
            [(sett) => multiplyAndDivide(100, sett), 'multiply_divide'],
            [(sett) => mixed(100, sett), 'mixed'],
            [(sett) => fractions(70, sett), 'fraction_fractionMixed'],
            [(sett) => powerAndRoot(100, sett), 'power_root'],
        ],
    },
    exam_advanced: { mustHave: [], additional: [], },
};

const examMaker = async (topic, sett) => {
    // saving lines, reinserting the same list on first run 
    examLists.exam_basic['additional'] = examLists.exam_basic.mustHave;
    const pack = [];
    // making a copys of additional to not remove the original
    const core = [...examLists[topic]['mustHave']], solidify = [...examLists[topic]['additional']];
    // creating core exercises
    while (core.length != 0) {
        // creating a random integer
        const ind = randCho(core.length);
        // creating a box by using integer
        const box = await core[ind][0](sett);
        box['topic'] = core[ind][1];
        pack.push(box);
        // removing the used index
        core.splice(ind, 1);
    }
    // creating additional exercises
    while (pack.length < 10) {
        // creating a random integer
        const ind = randCho(solidify.length);
        // creating a box by using integer
        const box = await solidify[ind][0](sett);
        box['topic'] = solidify[ind][1];
        pack.push(box);
        // removing the used index
        solidify.splice(ind, 1);
    }
    return pack;
}

const exercisePack = async (difficulty, topic, settings) => {
    const topicMap = {
        sum_substract: sumAndSub,
        multiply_divide: multiplyAndDivide,
        mixed: mixed,
        power_root: powerAndRoot,
        fraction_fractionMixed: fractions,
        // forms_sizes: null,
        // equasions_basic: null,
        // equations_two_more: null,
        // verbal_problems: null,
        // geometry: null,
        // quadratic_equation: null,
        // circles: null,
    };
    let pack = [], box = {};
    // exams creation
    if (topic == 'exam_basic' || topic == 'exam_advanced') { pack = await examMaker(topic, settings); return pack; }
    // exercise creation
    if (difficulty != 0) {
        for (let i = 0; i < 10; i++) {
            const handler = topicMap[topic];
            if (handler) box = await handler(difficulty, settings);
            else { box = {}; console.error('Unexisting Topic'); }
            pack.push(box);
        }
    }
    else pack = await testMaker(topic, settings);
    return pack;
}

/*
        db save:
    {
        id: ...,
        userId: ...,
        ans: [...],
        timestamps: ...,
    }*/
export const exerciseGen = async (req, res) => {
    const { topic, settings, token, grade } = req.body;
    let difficulty = grade;
    // validating topic
    if (!topic) { console.error('Request missing some part'); return res.status(400).json({ success: false, message: 'Server error: missing requirements' }); }
    // filtering difficulty
    if (!difficulty) difficulty = 0;
    let pack = await exercisePack(difficulty, topic, settings);
    //=============================================================< console log
    console.log('Exercise creation pre hash:');
    console.log(pack);
    // hashing answers within a pack
    pack = await Promise.all(pack.map(async thing => ({ ...thing, ans: [await bcrypt.hash(`${thing.ans[0]}`, await bcrypt.genSalt(10))] })));
    //=============================================================< console log
    console.log('is online user is ' + !!token);
    if (!!token) { // online user
        // token validation
        const user = await verify(token);
        //=============================================================< console log
        console.log('is valid token is ' + !!user);
        console.log(user._id);
        if (!user._id) { console.error('Invalid token'); return serverError(res); }
        // pulling only answers from the pack
        const ansPack = pack.map(thing => `${thing.ans}`);
        // check of existing answers sheet for the user
        let compModel = await Compare.findOne({ userId: user._id });
        // there is an a existing sheet, server updating a copy of the answers in db with users id
        if (!!compModel) compModel.updateOne({ userId: user._id }, { $set: { ans: ansPack } });
        else { // there no existing sheet
            compModel = new Compare({ userId: user._id, ans: ansPack, });
            // server saving a copy of the answers in db with users id
            await compModel.save();
        }
    }
    try { res.status(200).json({ success: true, message: 'Exercises successfully created!', data: pack }); }
    catch (error) { console.error(error.message); return serverError(res); }
}