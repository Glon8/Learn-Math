import bcrypt from 'bcrypt'
const ServerAddon = 'Server verification fail:\r\n';

const verString = (string) => {
    if (string != null) {
        if (string.trim() == "") return false;
        else if (string.length < 2) return false;
        else return !!string.match(/^[a-zA-Z0-9 \u0400-\u04FF\u0590-\u05FF]{2,24}$/);
    }
}

const verEmail = (email) => {
    if (email != null) {
        if (email.trim() == "")
            return false;
        else if (email.length < 9) return false;
        else return !!email.match(/^[a-zA-Z0-9._%+-]{2,}@(gmail|outlook|hotmail|yahoo|icloud|aol|protonmail|zoho|mail|gmx|yandex|walla)\.(com|net|org|ru|co\.uk|co\.il|de|fr|eu|me)$/);
    }
}

export const verPassword = (thing, password) => {
    return bcrypt.compare(thing, password);
}

export const verifyName = (name) => {
    const box = {
        success: true,
        message: 'Server name verify success!',
        stat: 200
    };

    if (!name) {
        box.success = false;
        box.message = ServerAddon + 'User name cannot be empty!';
        box.stat = 400;
    } else if (name.length < 2) {
        box.success = false;
        box.message = ServerAddon + 'User name minimum length is 2!';
        box.stat = 422;
    } else if (!verString(name)) {
        box.success = false;
        box.message = ServerAddon + 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999';
        box.stat = 422;
    }

    return box;
};

export const verifyEmail = (email) => {
    const box = {
        success: true,
        message: 'Server email verify success!',
        stat: 200
    };

    if (!email) {
        box.success = false;
        box.message = ServerAddon + 'Email cannot be empty!';
        box.stat = 400;
    } else if (email.length < 9) {
        box.success = false;
        box.message = ServerAddon + 'Email minimum length is 9!';
        box.stat = 422;
    } else if (!verEmail(email)) {
        box.success = false;
        box.message = ServerAddon + 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com';
        box.stat = 422;
    }

    return box;
};

export const verifyPassword = (thing, password) => {
    const box = {
        success: true,
        message: 'Server password verify success!',
        stat: 200
    };

    if (!password) {
        box.success = false;
        box.message = ServerAddon + 'Password cannot be empty!';
        box.stat = 400;
    } else if (password.length < 4) {
        box.success = false;
        box.message = ServerAddon + 'Password minimum length is 4!';
        box.stat = 422;
    } else if (!verPassword(thing, password)) {
        box.success = false;
        box.message = ServerAddon + 'Passwords dont match!';
        box.stat = 422;
    }

    return box;
};

export const verifySecretQuestion = (secQues) => {
    const box = {
        success: true,
        message: 'Server secret question verify success!',
        stat: 200
    };

    if (!secQues) {
        box.success = false;
        box.message = ServerAddon + 'Secret question cannot be empty!';
        box.stat = 400;
    } else if (secQues.length < 2) {
        box.success = false;
        box.message = ServerAddon + 'Secret question minimum length is 2!';
        box.stat = 422;
    } else if (!verString(secQues)) {
        box.success = false;
        box.message = ServerAddon + 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age';
        box.stat = 422;
    }

    return box;
};

export const verifySecretAnswer = (thing, answer) => {
    const box = {
        success: true,
        message: 'Server secret answer verify success!',
        stat: 200
    };

    if (!answer) {
        box.success = false;
        box.message = ServerAddon + 'Secret answer cannot be empty!';
        box.stat = 400;
    } else if (answer.length < 2) {
        box.success = false;
        box.message = ServerAddon + 'Secret answer minimum length is 2!';
        box.stat = 422;
    }
    else if (!verPassword(thing, answer)) {
        box.success = false;
        box.message = ServerAddon + 'Secret answers dont match!';
        box.stat = 422;
    }

    return box;
};