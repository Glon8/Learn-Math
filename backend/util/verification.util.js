import bcrypt from 'bcrypt'
const ServerAddon = 'Server verification fail:\r\n';

const verString = (string) => {
    if (string == null || string.trim() == "" || string.length < 2) return false;
    return !!string.match(/^[a-zA-Z0-9 \u0400-\u04FF\u0590-\u05FF]{2,24}$/);
}

const verEmail = (email) => {
    if (email == null || email.trim() == "" || email.length < 9) return false;
    return !!email.match(/^[a-zA-Z0-9._%+-]{2,}@(gmail|outlook|hotmail|yahoo|icloud|aol|protonmail|zoho|mail|gmx|yandex|walla)\.(com|net|org|ru|co\.uk|co\.il|de|fr|eu|me)$/);
}

export const encCompare = (plain, hashed) => {
    if (typeof plain !== 'string' || !plain.trim() || typeof hashed !== 'string' || !hashed.trim()) return false;
    return bcrypt.compare(plain, hashed);
}

export const verifyName = (name) => {
    if (!name) return { success: false, message: ServerAddon + 'User name cannot be empty!', stat: 400 }
    if (name.length < 2) return { success: false, message: ServerAddon + 'User name minimum length is 2!', stat: 422 }
    if (!verString(name)) return { success: false, message: ServerAddon + 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999', stat: 422 }
    return { success: true, message: 'Server name verify success!', stat: 200 }
};

export const verifyEmail = (email) => {
    if (!email) return { success: false, message: ServerAddon + 'Email cannot be empty!', stat: 400 }
    if (email.length < 9) return { success: false, message: ServerAddon + 'Email minimum length is 9!', stat: 422 }
    if (!verEmail(email)) return { success: false, message: 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com', stat: 422 }
    return { success: true, message: 'Server email verify success!', stat: 200 }
};

export const verifyPassword = async (plain, hashed) => {
    if (!plain) return { success: false, message: ServerAddon + 'Password cannot be empty!', stat: 400 }
    if (plain.length < 4) return { success: false, message: ServerAddon + 'Password minimum length is 4!', stat: 422 }
    if (!await encCompare(plain, hashed)) return { success: false, message: ServerAddon + 'Passwords dont match!', stat: 422 }
    return { success: true, message: 'Server password verify success!', stat: 200 }
};

export const verifySecretQuestion = (secQues) => {
    if (!secQues) return { success: false, message: ServerAddon + 'Secret question cannot be empty!', stat: 400 }
    if (secQues.length < 2) return { success: false, message: ServerAddon + 'Secret question minimum length is 2!', stat: 422 }
    if (!verString(secQues)) return { success: false, message: ServerAddon + 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age', stat: 422 }
    return { success: true, message: 'Server secret question verify success!', stat: 200 }
};

export const verifySecretAnswer = async (plain, hashed) => {
    if (!plain) return { success: false, message: ServerAddon + 'Secret answer cannot be empty!', stat: 400 }
    if (plain.length < 2) return { success: false, message: ServerAddon + 'Secret answer minimum length is 2!', stat: 422 }
    if (!await encCompare(plain, hashed)) return { success: false, message: ServerAddon + 'Secret answers dont match!', stat: 422 }
    return { success: true, message: 'Server secret answer verify success!', stat: 200 }
};