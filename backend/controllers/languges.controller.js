import englishPackage from "../languages/englishPackage.js";
import hebrewPackage  from '../languages/hebrewPackage.js';
import russianPackage  from '../languages/russianPackage.js';

export const getLang = (req, res) => {
    const requestedLang = req.body.language;

    try {
        switch (requestedLang) {
            case 'en':
                res.status(200).json({ success: true, message: 'English language loaded!', data: englishPackage });
                break;
            case 'he':
                res.status(200).json({ success: true, message: 'Hebrew language loaded!', data: hebrewPackage });
                break;
            case 'ru':
                res.status(200).json({ success: true, message: 'Russian language loaded!', data: russianPackage });
                break;
        }
    }
    catch (error) {
        console.log('Error in loading language: ' + error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
