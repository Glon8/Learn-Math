const ServerAddon = 'Server verification fail:\r\n';

const verString = (string) => {
    if (string != null) {
        if (string.trim() == "") return false;
        else if (string.length < 2) return false;
        else return !!string.match(/^[a-zA-Z0-9 ]{2,24}$/);
    }
}

const verEmail = (email) => {
    if (email != null) {
        if (email.trim() == "")
            return false;
        else if (email.length < 9) return false;
        else return !!email.match(/^[a-zA-Z0-9._%+-]{2,}@(gmail|outlook|hotmail|yahoo|icloud|aol|protonmail|zoho|mail|gmx|yandex|walla)\.(com|net|org|ru|co\.uk|co\.il|de|fr|eu|me)$/);
        // /^[a-zA-Z0-9._%+-]{2,}@(gmail|outlook|hotmail|yahoo|icloud|aol|protonmail|zoho|mail|gmx|yandex|walla)\.(com|net|org|ru|co\.uk|co\.il|de|fr|eu|me)$/
    }
}

const verPassword = (password) => {
    if (password != null) {
        if (password.trim() == "")
            return false;
        else if (password.length < 4) return false;
        else return !!password.match(/^[a-zA-Z0-9!@#$%^&*]{4,32}$/);
    }
}

export const verifyName = (name) => {
    const box = {
        success: true,
        message: 'Server name verify success!',
        stat: '200'
    }

    if (!name) {
        box[success] = false;
        box[message] = ServerAddon + 'User name cannot be empty!';
        box[stat] = '';
    }
    else if (name.length < 2) {
        box[success] = false;
        box[message] = ServerAddon + 'User name minimum length is 2!';
        box[stat] = '';
    }
    else if (!verString(name)) {
        box[success] = false;
        box[message] = ServerAddon + 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999';
        box[stat] = '';
    }

    return box;
}

export const verifyEmail = (email) => {
    const box = {
        success: true,
        message: 'Server email verify success!',
        stat: '200'
    }

    if (!email) {
        box[success] = false;
        box[message] = ServerAddon + 'Email cannot be empty!';
        box[stat] = '';
    }
    else if (email.length < 9) {
        box[success] = false;
        box[message] = ServerAddon + 'Email minimum length is 9!';
        box[stat] = '';
    }
    else if (!verEmail(email)) {
        box[success] = false;
        box[message] = ServerAddon + 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com';
        box[stat] = '';
    }

    return box;
}

export const verifyPassword = (password) => {
    const box = {
        success: true,
        message: 'Server password verify success!',
        stat: '200'
    }

    if (!password) {
        box[success] = false;
        box[message] = ServerAddon + 'Password cannot be empty!';
        box[stat] = '';
    }
    else if (password.length < 4) {
        box[success] = false;
        box[message] = ServerAddon + 'Password minimum length is 4!';
        box[stat] = '';
    }
    else if (!verPassword(password)) {
        box[success] = false;
        box[message] = ServerAddon + 'Password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@';
        box[stat] = '';
    }

    return box;
}

export const verifySecretQuestion = (secQues) => {
    const box = {
        success: true,
        message: 'Server secret question verify success!',
        stat: '200'
    }

    if (!secQues) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret question cannot be empty!';
        box[stat] = '';
    }
    else if (secQues.length < 2) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret question minimum length is 2!';
        box[stat] = '';
    }
    else if (!verString(secQues)) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age';
        box[stat] = '';
    }

    return box;
}

export const verifySecretAnswer = (secAns) => {
    const box = {
        success: true,
        message: 'Server secret answer verify success!',
        stat: '200'
    }

    if (!secAns) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret answer cannot be empty!';
        box[stat] = '';
    }
    else if (secAns.length < 2) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret answer minimum length is 2!';
        box[stat] = '';
    }
    else if (!verString(secAns)) {
        box[success] = false;
        box[message] = ServerAddon + 'Secret answer invalid, allowed small, capital letters, and digits\r\nExample: 6';
        box[stat] = '';
    }

    return box;
}