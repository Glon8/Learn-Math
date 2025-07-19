import { langPackage as en } from '../languages/englishPackage'
import { langPackage as he } from '../languages/hebrewPackage'
import { langPackage as ru } from '../languages/russianPackage'

export const getLang = (req, res) => {
    const requestedLang = req.body.language;

    try {
        switch (requestedLang) {
            case 'en':
                res.status(200).json({ success: true, message: 'English language loaded!', data: en });
                break;
            case 'he':
                res.status(200).json({ success: true, message: 'Hebrew language loaded!', data: he });
                break;
            case 'ru':
                res.status(200).json({ success: true, message: 'Russian language loaded!', data: ru });
                break;
        }
    }
    catch (error) {
        console.log('Error in loading language: ' + error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
