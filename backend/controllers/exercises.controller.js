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
                    (String.raw`\begin{array}{r} -\;${first} \\ \underline{${second}} \\ \end{array}`))
            });

            answer.push(first - second);
        }
        else {
            const first = Math.floor(Math.random() * (Math.floor(quota * 0.6) + 1 - minQuota)) + minQuota;
            const second = Math.floor(Math.random() * (quota - first + 1 - minQuota)) + minQuota;

            exercise.push({
                type: typo, message: (typo === 0 ? (`${first} + ${second} = ?`) :
                    (String.raw`\begin{array}{r} +\;${first} \\ \underline{${second}} \\ \end{array}`))
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
                    (String.raw`\begin{array}{r} :\;${product} \\ \underline{${first}} \\ \end{array}`))
            });
            answer.push(second);
            break;
        case 1:
            first = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;
            second = Math.floor(Math.random() * (quota + 1 - minQuota)) + minQuota;

            exercise.push({
                type: typo, message: (typo == 0 ? (`${first} * ${second} = ?`) :
                    (String.raw`\begin{array}{r} *\;${first} \\ \underline{${second}} \\ \end{array}`))
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

    difficultyCheck.forEach(async (diff) => {
        const box = await mixed(diff, sett);

        pack.push(box);
    });

    console.log(pack)

    return pack;
}

const toolNumDenumDivider = (denum, num) => {
    const min = Math.min(denum, num);
    const max = Math.max(denum, num);

    let divider;

    for (let i = 1; i <= min; i++)
        if (min % i == 0 && max % i == 0)
            divider = i;

    return divider;
}

const toolFracSimplify = (den, num) => {
    const box = {
        whole: 0,
        num: 0,
        den: 0
    };

    if (num >= den) {
        box.whole = Math.floor(num / den);

        num = num % den;
    }

    if (num > 0) {
        const divider = toolNumDenumDivider(num, den);

        box.num = num / divider;
        box.den = den / divider;
    }

    return box;
}

const fractions = async (dif, sett) => {
    const box = {};

    const first = {
        whole: 0,
        num: 0,
        den: 0
    }
    const second = {
        whole: 0,
        num: 0,
        den: 0
    }

    let quota; // max value allowed
    let signSwitch; // sign switch, changes the outputs to multiply and division. (0 - devide, 1 - multiply)
    let fSign; // first sign (0 - minus, 1 - plus)
    let deno;

    if (dif < 50) {
        quota = 90;
        signSwitch = 0;
        deno = Math.floor(Math.random() * ((quota * 0.1) + 1 - 2)) + 2;

        fSign = Math.floor(Math.random() * 2);
    }
    else if (dif >= 50 && dif < 85) {
        quota = 900;
        signSwitch = Math.floor(Math.random() * 2);
        deno = Math.floor(Math.random() * ((quota * 0.1) + 1 - 10)) + 10;

        fSign = Math.floor(Math.random() * 2);
    }
    else if (dif >= 85) {
        quota = 9000;
        signSwitch = Math.floor(Math.random() * 2);
        deno = Math.floor(Math.random() * ((quota * 0.1) + 1 - 100)) + 100;

        fSign = Math.floor(Math.random() * 2);
    }

    const exercise = [];
    const answer = [];
    const wholeQuota = 9;
    //PS. minQuota for a whole is 0, while for mumerator is 1.
    // whole = quota / deno (floored).

    if (!signSwitch) { // first sign is plus or minus
        if (!fSign) { // first sign is minus
            first['whole'] = Math.floor(Math.random() * (wholeQuota + 1 - 1)) + 1;
            second['whole'] = Math.floor(Math.random() * ((first['whole'] - 1) + 1));

            first['num'] = Math.floor(Math.random() * ((deno - 1) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1));
            second['num'] = Math.floor(Math.random() * (first['num'] + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1));

            const fPack = toolFracSimplify(deno, first['num']);

            first['num'] = fPack['num'];
            first['den'] = fPack['den'];

            const sPack = toolFracSimplify(deno, second['num']);

            second['num'] = sPack['num'];
            second['den'] = sPack['den'];

            exercise.push({
                type: 1, message: String.raw`${!!first.whole && first.whole != 0 ? `${first.whole}` : ``}\tfrac{${first.num}}{${first.den}}\;-\;${!!second.whole && second.whole != 0 ? `${second.whole}` : ``}\tfrac{${second.num}}{${second.den}}\;=\;?`
            });

            let aWhole = first.whole - second.whole;
            let aNum = first.num * second.den - second.num * first.den;
            let aDen = first.den * second.den;

            const aPack = toolFracSimplify(aDen, aNum);

            aWhole += aPack['whole'];
            aNum = aPack['num'];
            aDen = aPack['den'];

            answer.push(!!aWhole ?
                (`${aWhole}${!!aNum ? `/${aNum}/${aDen}` : ``}`) :
                (`${!!aNum ? `${aNum}/${aDen}` : 0}`));
        } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE
        else { // first sign is plus
            first['whole'] = Math.floor(Math.random() * ((wholeQuota - 2) + 1));
            second['whole'] = Math.floor(Math.random() * ((wholeQuota - first['whole'] + (first['whole'] != 0 ? (- 1) : 0)) + 1));

            first['num'] = Math.floor(Math.random() * ((deno - 1) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1));
            second['num'] = Math.floor(Math.random() * ((deno - first['num']) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01));

            const fPack = toolFracSimplify(deno, first['num']);

            first['num'] = fPack['num'];
            first['den'] = fPack['den'];

            const sPack = toolFracSimplify(deno, second['num']);

            second['num'] = sPack['num'];
            second['den'] = sPack['den'];

            exercise.push({
                type: 1, message: String.raw`${!!first.whole && first.whole != 0 ? `${first.whole}` : ``}\tfrac{${first.num}}{${first.den}}\;+\;${!!second.whole && second.whole != 0 ? `${second.whole}` : ``}\tfrac{${second.num}}{${second.den}}\;=\;?`
            });

            let aWhole = first.whole + second.whole;
            let aNum = first.num * second.den + second.num * first.den;
            let aDen = first.den * second.den;

            const aPack = toolFracSimplify(aDen, aNum);

            aWhole += aPack['whole'];
            aNum = aPack['num'];
            aDen = aPack['den'];

            answer.push(!!aWhole ?
                (`${aWhole}${!!aNum ? `/${aNum}/${aDen}` : ``}`) :
                (`${!!aNum ? `${aNum}/${aDen}` : 0}`));
        } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE
    }
    else { // first sign is multiply or divide
        if (!fSign) { // first sign is divide
            first['whole'] = Math.floor(Math.random() * ((wholeQuota - 1) + 1));
            second['whole'] = Math.floor(Math.random() * ((first['whole']) + 1));

            first['num'] = Math.floor(Math.random() * ((deno - 1) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1));
            second['num'] = Math.floor(Math.random() * ((deno - first['num']) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01));

            const fPack = toolFracSimplify(deno, first['num']);

            first['num'] = fPack['num'];
            first['den'] = fPack['den'];

            const sPack = toolFracSimplify(deno, second['num']);

            second['num'] = sPack['num'];
            second['den'] = sPack['den'];

            exercise.push({
                type: 1, message: String.raw`${!!first.whole && first.whole != 0 ? `${first.whole}` : ``}\tfrac{${first.num}}{${first.den}}\;:\; ${!!second.whole && second.whole != 0 ? `${second.whole}` : ``}\tfrac{${second.num}}{${second.den}}\;=\;?`
            });

            let aWhole = 0;
            let aNum = (first.num + first.whole * first.den) * second.den;
            let aDen = first.den * (second.num + second.whole * second.den);

            const aPack = toolFracSimplify(aDen, aNum);

            aWhole += aPack['whole'];
            aNum = aPack['num'];
            aDen = aPack['den'];

            answer.push(!!aWhole ?
                (`${aWhole}${!!aNum ? `/${aNum}/${aDen}` : ``}`) :
                (`${!!aNum ? `${aNum}/${aDen}` : 0}`));
        } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE
        else { // first sign is multiply
            first['whole'] = Math.floor(Math.random() * (wholeQuota + 1));
            second['whole'] = Math.floor(Math.random() * (wholeQuota + 1));

            first['num'] = Math.floor(Math.random() * ((deno - 1) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.1));
            second['num'] = Math.floor(Math.random() * ((deno - first['num']) + 1 - (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01)))) + (dif < 40 ? 1 : Math.floor((deno - 1) * 0.01));

            const fPack = toolFracSimplify(deno, first['num']);

            first['num'] = fPack['num'];
            first['den'] = fPack['den'];

            const sPack = toolFracSimplify(deno, second['num']);

            second['num'] = sPack['num'];
            second['den'] = sPack['den'];

            exercise.push({
                type: 1, message: String.raw`${!!first.whole && first.whole != 0 ? `${first.whole}` : ``}\tfrac{${first.num}}{${first.den}}\;*\; ${!!second.whole && second.whole != 0 ? `${second.whole}` : ``}\tfrac{${second.num}}{${second.den}}\;=\;?`
            });

            let aWhole = 0;
            let aNum = (first.num + first.whole * first.den) * (second.num + second.whole * second.den);
            let aDen = first.den * second.den;

            const aPack = toolFracSimplify(aDen, aNum);

            aWhole += aPack['whole'];
            aNum = aPack['num'];
            aDen = aPack['den'];

            answer.push(!!aWhole ?
                (`${aWhole}${!!aNum ? `/${aNum}/${aDen}` : ``}`) :
                (`${!!aNum ? `${aNum}/${aDen}` : 0}`));
        } // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE
    }

    box['exe'] = exercise;
    box['ans'] = answer;
    box['desc'] = false;

    return box;
}

const fractionsTest = async (sett) => {
    const pack = [];

    const difficultyCheck = [30, 30, 30, 30, 70, 70, 70, 70, 100, 100];

    difficultyCheck.forEach(async (diff) => {
        const box = await fractions(diff, sett);

        pack.push(box);
    });

    console.log(pack);

    return pack;
}

const powerAndRoot = async (dif, sett) => {
    const box = {};

    const turn = Math.floor(Math.random() * 2); // turn ll determine whom ll carry the root and power (0 - first, 1 - second)
    const main = Math.floor(Math.random() * 3); // determine if there ll be a main root or power carrier (0 - no main, 1 - main root carrier, 2 - main power carrier)
    const sign = Math.floor(Math.random() * 4); // sign (0 - minus, 1 - plus, 2 - divide, 3 - multiply)
    const powerFlip = Math.floor(Math.random() * 2); // determine if the digits carry root or power (0 - root, 1 - power)

    let quota; // the limit that Ill generate powers from/ possible roots
    let first;
    let second;
    let carrier;
    let rawPow;
    let mainPow;
    let mp;
    // rawPow / mainPow ll be used:
    // >> rawPower ** 2 = A
    // >> sqrt(A)

    if (dif < 40) quota = 16;
    else if (dif >= 40) quota = 36;

    const exercise = [];
    const answer = [];

    if (sign == 0) { // minus sign
        mp = Math.floor(Math.random() * ((quota - 1) - Math.floor(quota * 0.4))) + Math.floor(quota * 0.4);
        mainPow = !main ? 0 : (main == 1 ? (mp ** 2) : (mp));
        rawPow = !main ?
            (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1) - 1)) + Math.floor(quota * 0.1) + 1) :
            (!turn ?
                (Math.floor(Math.random() * ((!powerFlip ? (quota ** 2) : (quota)) - mainPow)) + mainPow) :
                (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)));
        first = !turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (!main ?
                ((Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)) + (!powerFlip ? (rawPow) : (rawPow ** 2))) :
                (mainPow + (!powerFlip ? (rawPow) : (rawPow ** 2))));
        second = !!turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (!main ?
                (Math.floor(Math.random() * ((!powerFlip ? (rawPow) : (rawPow ** 2)) - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)) :
                ((!powerFlip ? (rawPow) : (rawPow ** 2)) - mainPow));

        let exerciseStr;
        let answerStr;

        if (!main) {
            answerStr = !turn ?
                (!powerFlip ?
                    (rawPow - second) :
                    (rawPow ** 2 - second)) :
                (!powerFlip ?
                    (first - rawPow) :
                    (first - rawPow ** 2));

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`\\sqrt{${first}}\\;-\\;${second}\\;=\\;?`) :
                    (`${first}^{2}\\;-\\;${second}\\;=\\;?`)) :
                (!powerFlip ?
                    (`${first}\\;-\\;\\sqrt{${second}}\\;=\\;?`) :
                    (`${first}\\;-\\;${second}^{2}\\;=\\;?`));
        }
        else if (main == 1) {
            answerStr = mp;

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`\\sqrt{\\sqrt{${first}}\\;-\\;${second}}\\;=\\;?`) :
                    (`\\sqrt{${first}^{2}\\;-\\;${second}}\\;=\\;?`)) :
                (!powerFlip ?
                    (`\\sqrt{${first}\\;-\\;\\sqrt{${second}}}\\;=\\;?`) :
                    (`\\sqrt{${first}\\;-\\;${second}^{2}}\\;=\\;?`));
        }
        else {
            answerStr = mp ** 2;

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`(\\sqrt{${first}}\\;-\\;${second})^2\\;=\\;?`) :
                    (`(${first}^{2}\\;-\\;${second})^2\\;=\\;?`)) :
                (!powerFlip ?
                    (`(${first}\\;-\\;\\sqrt{${second}})^2\\;=\\;?`) :
                    (`(${first}\\;-\\;${second}^{2})^2\\;=\\;?`));
        }

        exercise.push({
            type: 1, message: exerciseStr
        });

        answer.push(answerStr);
    } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE FIXED
    else if (sign == 1) { // plus sign
        mp = Math.floor(Math.random() * (quota - Math.floor(quota * 0.4))) + Math.floor(quota * 0.4);
        mainPow = !main ? 0 : (main == 1 ? (mp ** 2) : (mp));
        rawPow = !main ?
            (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)) :
            (Math.floor(Math.random() * ((mainPow - 1) - 1)) + 1);
        first = !turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (!main ?
                (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)) :
                (mainPow - (!powerFlip ? (rawPow) : (rawPow ** 2))));
        second = !!turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (!main ?
                (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1)) :
                (mainPow - (!powerFlip ? (rawPow) : (rawPow ** 2))));

        let exerciseStr;
        let answerStr;

        if (!main) {
            answerStr = !turn ?
                (!powerFlip ?
                    (rawPow + second) :
                    (rawPow ** 2 + second)) :
                (!powerFlip ?
                    (first + rawPow) :
                    (first + rawPow ** 2));

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`\\sqrt{${first}}\\;+\\;${second}\\;=\\;?`) :
                    (`${first}^{2}\\;+\\;${second}\\;=\\;?`)) :
                (!powerFlip ?
                    (`${first}\\;+\\;\\sqrt{${second}}\\;=\\;?`) :
                    (`${first}\\;+\\;${second}^{2}\\;=\\;?`));
        }
        else if (main == 1) {
            answerStr = mp;

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`\\sqrt{\\sqrt{${first}}\\;+\\;${second}}\\;=\\;?`) :
                    (`\\sqrt{${first}^{2}\\;+\\;${second}}\\;=\\;?`)) :
                (!powerFlip ?
                    (`\\sqrt{${first}\\;+\\;\\sqrt{${second}}}\\;=\\;?`) :
                    (`\\sqrt{${first}\\;+\\;${second}^{2}}\\;=\\;?`));
        }
        else {
            answerStr = mp ** 2;

            exerciseStr = !turn ?
                (!powerFlip ?
                    (`(\\sqrt{${first}}\\;+\\;${second})^2\\;=\\;?`) :
                    (`(${first}^{2}\\;+\\;${second})^2\\;=\\;?`)) :
                (!powerFlip ?
                    (`(${first}\\;+\\;\\sqrt{${second}})^2\\;=\\;?`) :
                    (`(${first}\\;+\\;${second}^{2})^2\\;=\\;?`));
        }

        exercise.push({
            type: 1, message: exerciseStr
        });

        answer.push(answerStr);
    } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE FIXED
    else if (sign == 2) { // divide sign
        carrier = Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1);
        rawPow = Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1);
        first = !turn ?
            (!powerFlip ? ((rawPow * carrier) ** 2) : (rawPow * carrier)) :
            ((!powerFlip ? (rawPow) : (rawPow ** 2)) * carrier);
        second = !!turn ? (!powerFlip ? (rawPow ** 2) : (rawPow)) : (carrier);

        let answerStr = !turn ?
            (!powerFlip ?
                (Math.sqrt(first) / second) :
                ((first) ** 2 / second)) :
            (!powerFlip ?
                (first / Math.sqrt(second)) :
                (first / (second) ** 2));

        let exerciseStr = !turn ?
            (!powerFlip ?
                (`\\sqrt{${first}}\\;:\\;${second}\\;=\\;?`) :
                (`${first}^{2}\\;:\\;${second}\\;=\\;?`)) :
            (!powerFlip ?
                (`${first}\\;:\\;\\sqrt{${second}}\\;=\\;?`) :
                (`${first}\\;:\\;${second}^{2}\\;=\\;?`));


        exercise.push({
            type: 1, message: exerciseStr
        });

        answer.push(answerStr);
    } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE
    else if (sign == 3) { // multiply sign
        rawPow = Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1);
        first = !turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1));
        second = !!turn ?
            (!powerFlip ? (rawPow ** 2) : (rawPow)) :
            (Math.floor(Math.random() * (quota - Math.floor(quota * 0.1))) + Math.floor(quota * 0.1));

        let answerStr = !turn ?
            (!powerFlip ?
                (rawPow * second) :
                ((rawPow ** 2) * second)) :
            (!powerFlip ?
                (first * rawPow) :
                (first * (rawPow ** 2)));

        let exerciseStr = !turn ?
            (!powerFlip ?
                (`\\sqrt{${first}}\\;*\\;${second}\\;=\\;?`) :
                (`${first}^{2}\\;*\\;${second}\\;=\\;?`)) :
            (!powerFlip ?
                (`${first}\\;*\\;\\sqrt{${second}}\\;=\\;?`) :
                (`${first}\\;*\\;${second}^{2}\\;=\\;?`));


        exercise.push({
            type: 1, message: exerciseStr
        });

        answer.push(answerStr);
    } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DONE FIXED


    box['exe'] = exercise;
    box['ans'] = answer;
    box['desc'] = false;

    return box;
}

const powerAndRootTest = async (sett) => {
    const pack = [];

    const difficultyCheck = [30, 30, 30, 100, 100, 100, 100, 100, 100, 100];

    difficultyCheck.forEach(async (diff) => {
        const box = await powerAndRoot(diff, sett);

        pack.push(box);
    });

    console.log(pack);

    return pack;
}

const examBasic = async (sett) => {
    console.log('tried to access exam');

    const pack = [];

    // must include forms and sizes
    const mustHave = [
        () => sumAndSub(100, sett),
        () => multiplyAndDivide(100, sett),
        () => mixed(100, sett),
        () => fractions(70, sett),
        () => powerAndRoot(100, sett),
    ];
    const additional = [
        () => sumAndSub(100, sett),
        () => multiplyAndDivide(100, sett),
        () => mixed(100, sett),
        () => fractions(70, sett),
        () => powerAndRoot(100, sett),
    ];

    for (const thing of mustHave) {
        const box = await thing();

        pack.push(box);
    }

    while (pack.length < 10) {
        const ind = Math.floor(Math.random() * additional.length);

        const box = await additional[ind]();

        pack.push(box);

        additional.splice(ind, 1);
    }

    console.log(pack);

    return pack;
}

const exercisePack = async (difficulty, topic, settings) => {
    let pack = [];
    let box = {};

    if (topic != 'exam_basic' && topic != 'exam_advanced') {
        //if (difficulty == 0 && topic == 'fraction_fractionMixed') difficulty = 30; // <====================== FOR TEST ONLY!!!! delete as you done!!!

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
                        box = await powerAndRoot(difficulty, settings);
                        break;
                    case 'fraction_fractionMixed':
                        box = await fractions(difficulty, settings);
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
                    pack = await powerAndRootTest(settings);
                    break;
                case 'fraction_fractionMixed':
                    pack = await fractionsTest(settings);
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
                pack = await examBasic(settings);
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