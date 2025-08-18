const sumAndSub = async (dif, sett) => {
    const box = {};

    const setTypo = sett?.sumTypo;
    const difSpike = sett?.sumDif; // overwriting the difficulty according to users settings (true - on, false - off)
    const typo = setTypo ? setTypo : Math.floor(Math.random() * 2); // the way exercise is shown to the user (0 - string, 1 - LaTeX)

    let quota; // max value allowed
    let threeValues; // amount numbers in the exercise (0 - two, 1 - three)
    let fSign; // first sign (0 - minus, 1 - plus)
    let sSign; // second sign (0 - minus, 1 - plus)

    if (!difSpike) {
        if (dif < 40) {
            quota = 99;
            threeValues = 0;
            fSign = Math.floor(Math.random() * 2);
        }
        else if (dif >= 40 && dif < 75) {
            quota = 999;
            threeValues = Math.floor(Math.random() * 2);
            fSign = Math.floor(Math.random() * 2);

            if (threeValues == 1) sSign = Math.floor(Math.random() * 2);
        }
        else if (dif >= 75) {
            quota = 9999;
            threeValues = Math.floor(Math.random() * 2);
            fSign = Math.floor(Math.random() * 2);

            if (threeValues == 1) sSign = Math.floor(Math.random() * 2);
        }
    }
    else {
        quota = 999999;
        threeValues = Math.floor(Math.random() * 2);
        fSign = Math.floor(Math.random() * 2);

        if (threeValues == 1) sSign = Math.floor(Math.random() * 2)
    }

    const exercise = []; // array that ll include all the EXERCISES
    const answer = []; // array that ll include all the ANSWERS
    const minQuota = Math.floor(quota * 0.1);

    if (threeValues == 0) { // two values fork
        if (fSign == 0) {
            const first = Math.floor(Math.random() * (quota - Math.floor(quota * 0.55) + 1)) + Math.floor(quota * 0.55);
            const second = Math.floor(Math.random() * ((quota - first) + 1 - minQuota)) + minQuota;

            exercise.push({
                type: typo, message: (typo === 0 ? (`${first} - ${second} = ?`) :
                    (String.raw`\begin{array}{r} - ${first} \\ \underline{${second}} \\ \end{array}`))
            });

            answer.push(first - second);
        }
        else {
            const first = Math.floor(Math.random() * (Math.floor(quota * 0.6) + 1 - minQuota)) + minQuota;
            const second = Math.floor(Math.random() * (quota - first + 1 - minQuota)) + minQuota;

            exercise.push({
                type: typo, message: (typo === 0 ? (`${first} + ${second} = ?`) :
                    (String.raw`\begin{array}{r} + ${first} \\ \underline{${second}} \\ \end{array}`))
            });

            answer.push(first + second);
        }
    }
    else { // three values fork
        if (fSign == 1 && sSign == 1) {
            const first = Math.floor(Math.random() * (Math.floor(quota * 0.45) - minQuota + 1)) + minQuota;
            const second = Math.floor(Math.random() * (Math.floor(quota * 0.75) - first - minQuota + 1)) + minQuota;
            const third = Math.floor(Math.random() * (quota - first - second - minQuota + 1)) + minQuota;

            exercise.push({ type: 0, message: `${first} + ${second} + ${third}= ?` });

            answer.push(first + second + third);
        }
        else if (fSign == 1 && sSign == 0 || fSign == 0 && sSign == 1) {
            const first = Math.floor(Math.random() * (Math.floor(quota * 0.45) - minQuota + 1)) + minQuota;
            const second = Math.floor(Math.random() * (quota - first - minQuota + 1)) + minQuota;
            const third = Math.floor(Math.random() * (first + second - Math.floor((first + second) * 0.1) + 1)) + Math.floor((first + second) * 0.1);

            if (fSign == 1 && sSign == 0) {
                exercise.push({ type: 0, message: `${first} + ${second} - ${third}= ?` });

                answer.push(first + second - third);
            }
            else if (fSign == 0 && sSign == 1) {
                exercise.push({ type: 0, message: `${first} - ${third} + ${second}= ?` });

                answer.push(first - third + second);
            }
        }
        else {
            const first = Math.floor(Math.random() * (quota - Math.floor(quota * 0.55) + 1)) + Math.floor(quota * 0.55);
            const second = Math.floor(Math.random() * (Math.floor(first * 0.75) - minQuota + 1)) + minQuota;
            const third = Math.floor(Math.random() * (first - second + 1));

            exercise.push({ type: 0, message: `${first} - ${second} - ${third}= ?` });

            answer.push(first - second - third);
        }
    }

    box['exe'] = exercise;
    box['ans'] = answer;
    box['desc'] = false;

    return box;
}

const sumAndSubTest = async (sett) => {
    let pack = [];

    const difficultyCheck = [39, 39, 39, 74, 74, 74, 74, 100, 100, 100];

    difficultyCheck.forEach(async (diff) => {
        const box = await sumAndSub(diff, sett);

        pack.push(box);
    });

    console.log(pack)

    return pack;
}

const multiplyAndDivide = async (dif, sett) => {
    const box = {};

    const difSpike = sett?.mulDif; // overwriting the difficulty according to users settings (true - on, false - off)
    const setTypo = sett?.mulTypo;
    const sign = Math.floor(Math.random() * 2); // sign (0 - divide, 1 - multiply)
    const typo = setTypo ? setTypo : Math.floor(Math.random() * 2); // the way exercise is shown to the user (0 - string, 1 - LaTeX)

    let quota; // maximum allowed number size
    let first; // first number
    let second; // second number

    if (!difSpike) { // if no difficulty spike
        if (dif < 65) quota = 9;
        else quota = 99;
    }
    else quota = 999;

    const exercise = [];
    const answer = [];
    const minQuota = Math.floor(quota * 0.3);

    switch (sign) {
        case 0:
            first = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;
            second = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;

            const product = first * second;

            exercise.push({
                type: typo, message: (typo == 0 ? (`${product} : ${first} = ?`) :
                    (String.raw`\begin{array}{r} : ${product} \\ \underline{${first}} \\ \end{array}`))
            });
            answer.push(second);
            break;
        case 1:
            first = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;
            second = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;

            exercise.push({
                type: typo, message: (typo == 0 ? (`${first} * ${second} = ?`) :
                    (String.raw`\begin{array}{r} * ${first} \\ \underline{${second}} \\ \end{array}`))
            });
            answer.push(first * second);
            break;
    }

    box['exe'] = exercise;
    box['ans'] = answer;
    box['desc'] = false;

    return box;
}

const multiplyAndDivideTest = async (sett) => {
    let pack = [];

    const difficultyCheck = [50, 50, 50, 50, 50, 50, 100, 100, 100, 100];

    difficultyCheck.forEach(async (diff) => {
        const box = await multiplyAndDivide(diff, sett);

        pack.push(box);
    });

    console.log(pack)

    return pack;
}

const mixed = async (dif, sett) => {
    const box = {};

    const fSign = Math.floor(Math.random() * 2); // first sign (0 - negative, 1 - positive, depends on signSwitch)
    const sSign = Math.floor(Math.random() * 2); // second sign (0 - negative, 1 - positive, depends on signSwitch)
    const signSwitch = Math.floor(Math.random() * 2); // sign switches determine which one ll multiply and whom ll sum (0 - first is summing, 1 - first is multiplying)
    const bracketSwitch = Math.floor(Math.random() * 2); // bracket switch, determine if brackets appear or not (0 - no brackets, 1 - with brackets)

    let quota;
    let first;
    let second;
    let third;

    if (dif < 60) quota = 999;
    else quota = 9999;

    const exercise = [];
    const answer = [];
    const minQuota = Math.floor(quota * 0.1);

    if (bracketSwitch == 0) {
        if (fSign == 0 && signSwitch == 0) { // first sign is minus
            if (sSign == 0) { // second sign is divide
                third = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                second = (Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * third;
                first = Math.floor(Math.random() * (quota + 1 - (second / third) - minQuota)) + (second / third) + minQuota;

                exercise.push({ type: 0, message: `${first} - ${second} : ${third} = ?` });

                answer.push(first - (second / third));
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is multiply
                second = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * (quota + 1 - (second * third))) + (second * third);

                exercise.push({ type: 0, message: `${first} - ${second} * ${third} = ?` });

                answer.push(first - (second * third));
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 0 && signSwitch == 1) { // first sign is divide
            if (sSign == 0) { // second sign is minus
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * second;
                third = Math.floor(Math.random() * ((first / second) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${first} : ${second} - ${third} = ?` });

                answer.push((second / third) - first);
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is plus
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * second;
                third = Math.floor(Math.random() * (quota + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${first} : ${second} + ${third} = ?` });

                answer.push((second / third) + first);
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 1 && signSwitch == 0) { // first sign is plus
            if (sSign == 0) { // second sign is divide
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * second;
                third = Math.floor(Math.random() * (quota + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${third} + ${first} : ${second} = ?` });

                answer.push(third + (first / second));
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is multiply
                second = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * ((quota - (second * third)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${first} + ${second} * ${third} = ?` });

                answer.push(first + (second * third));
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 1 && signSwitch == 1) { // first sign is multiply
            if (sSign == 0) { // second sign is minus
                second = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * ((second * third) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${second} * ${third} - ${first} = ?` });

                answer.push((second * third) - first);
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is plus
                second = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * ((quota - (second * third)) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));

                exercise.push({ type: 0, message: `${second} * ${third} + ${first} = ?` });

                answer.push((second * third) + first);
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
    }
    else { //========================================================================<
        if (fSign == 0 && signSwitch == 0) { // first sign is minus
            if (sSign == 0) { // second sign is divide
                third = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                second = Math.floor(Math.random() * (quota - (quota == 999 ? (Math.floor(minQuota * 0.3) ** 2) : ((Math.floor(minQuota * 0.1) ** 2))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * third + second;

                exercise.push({ type: 0, message: `(${first} - ${second}) : ${third} = ?` });

                answer.push((first - second) / third);
            }// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is multiply
                third = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                second = Math.floor(Math.random() * (quota - (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))) + second;

                exercise.push({ type: 0, message: `(${first} - ${second}) * ${third} = ?` });

                answer.push((first - second) * third);
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 0 && signSwitch == 1) { // first sign is divide
            if (sSign == 0) { // second sign is minus
                third = Math.floor(Math.random() * (quota - (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                second = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) + third;
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * (second - third);

                exercise.push({ type: 0, message: `${first} : (${second} - ${third}) = ?` });

                answer.push(first / (second - third));
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is plus
                second = Math.floor(Math.random() * (((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) - 2) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) - second + 1 - 2)) + 2;
                first = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * second

                exercise.push({ type: 0, message: `${first} : (${second} + ${third}) = ?` });

                answer.push(first / (second + third));
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 1 && signSwitch == 0) { // first sign is plus
            if (sSign == 0) { // second sign is divide
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) * second;
                first = Math.floor(Math.random() * (Math.floor(third * 0.8) + 1 - Math.floor(third * 0.2))) + Math.floor(third * 0.2);
                third -= first;

                exercise.push({ type: 0, message: `(${third} + ${first}) : ${second} = ?` });

                answer.push((third + first) / second);
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is multiply
                third = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * (((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) - 2) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                second = Math.floor(Math.random() * (((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) - first) + 1 - 2)) + 2;

                exercise.push({ type: 0, message: `(${first} + ${second}) * ${third} = ?` });

                answer.push((first + second) * third);
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
        else if (fSign == 1 && signSwitch == 1) { // first sign is multiply
            if (sSign == 0) { // second sign is minus
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * (quota - (quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = (Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)))) + first;

                exercise.push({ type: 0, message: `${second} * (${third} - ${first}) = ?` });

                answer.push(second * (third - first));
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
            else { // second sign is plus
                second = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                third = Math.floor(Math.random() * ((quota == 999 ? (Math.floor(minQuota * 0.3)) : (Math.floor(minQuota * 0.1))) + 1 - (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01))))) + (quota == 999 ? (Math.floor(minQuota * 0.1)) : (Math.floor(minQuota * 0.01)));
                first = Math.floor(Math.random() * (Math.floor(third * 0.8) + 1 - Math.floor(third * 0.2))) + Math.floor(third * 0.2);
                third -= first;

                exercise.push({ type: 0, message: `${second} * (${third} + ${first}) = ?` });

                answer.push(second * (third + first));
            } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DONE
        }
    }

    box['exe'] = exercise;
    box['ans'] = answer;
    box['desc'] = false;

    return box;
}

const mixedTest = async (sett) => {
    let pack = [];

    const difficultyCheck = [30, 30, 30, 30, 30, 100, 100, 100, 100, 100];

    difficultyCheck.forEach(async(diff) => {
        const box = await mixed(diff, sett);

        pack.push(box);
    });

    console.log(pack)

    return pack;
}

const exercisePack = async (difficulty, topic, settings) => {
    let pack = [];
    let box = {};

    if (topic != 'exam_basic' && topic != 'exam_advanced') {
        //if (difficulty == 0 && topic == 'mixed') difficulty = 30; // <====================== FOR TEST ONLY!!!! delete as you done!!!

        if (difficulty != 0) {
            for (let i = 0; i < 10; i++) {
                switch (topic) {
                    case 'sum_substract':
                        box = await sumAndSub(difficulty, settings);
                        break;
                    case 'multiply_divide':
                        box = await multiplyAndDivide(difficulty, settings);
                        break;
                    case 'mixed':
                        box = await mixed(difficulty, settings);
                        break;
                    case 'power_root':
                        break;
                    case 'fraction_fractionMixed':
                        break;
                    case 'forms_sizes':
                        break;
                    case 'equasions_basic':
                        break;
                    case 'equations_two_more':
                        break;
                    case 'verbal_problems':
                        break;
                    case 'geometry':
                        break;
                    case 'quadratic_equation':
                        break;
                    case 'circles':
                        break;
                    default:
                        box['exe'] = false;
                        box['ans'] = false;
                        box['desc'] = false;

                        console.log('Unexisting Topic!');
                        break;
                }

                if (topic !== 'exam_basic' && topic !== 'exam_advanced') box['topic'] = topic;

                pack.push(box);
            }
        }
        else {
            switch (topic) {
                case 'sum_substract':
                    pack = await sumAndSubTest(settings);
                    break;
                case 'multiply_divide':
                    pack = await multiplyAndDivideTest(settings);
                    break;
                case 'mixed':
                    pack = await mixedTest(settings);
                    break;
                case 'power_root':
                    break;
                case 'fraction_fractionMixed':
                    break;
                case 'forms_sizes':
                    break;
                case 'equasions_basic':
                    break;
                case 'equations_two_more':
                    break;
                case 'verbal_problems':
                    break;
                case 'geometry':
                    break;
                case 'quadratic_equation':
                    break;
                case 'circles':
                    break;
                default:
                    box = [];

                    console.log('Unexisting Topic!');
                    break;
            }

            if (topic !== 'exam_basic' && topic !== 'exam_advanced') box['topic'] = topic;
        }
    }
    else {
        switch (topic) {
            case 'exam_basic':
                break;
            case 'exam_advanced':
                break;
        }
    }

    return pack;
}

export const exerciseGen = async (req, res) => {
    let difficulty = req.body.grade;
    const topic = req.body.topic;
    const settings = req.body.settings;

    if (!!topic) {
        if (!difficulty) difficulty = 0;

        const pack = await exercisePack(difficulty, topic, settings);

        try {
            res.status(200).json({ success: true, message: 'Exercises successfully created!', data: pack });

            console.log('Exercise creation success!');
            console.log(pack);
        }
        catch (error) {
            console.log('Error in creating exercises: ' + error.message);
            res.status(400).json({ success: false, message: 'Server error' });
        }
    }
    else {
        console.log('Error in creating exercises, request missing some part.');
        res.status(400).json({ success: false, message: 'Server error: missing requirements' });
    }
}