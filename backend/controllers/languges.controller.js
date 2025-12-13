import hebrewPackage from '../languages/hebrewPackage.js';
import russianPackage from '../languages/russianPackage.js';

export const getLang = (req, res) => {
    const { language } = req.body;
    try {
        if (language == 'he') return res.status(200).json({ success: true, message: 'Hebrew language loaded!', data: hebrewPackage });
        if (language == 'ru') return res.status(200).json({ success: true, message: 'Russian language loaded!', data: russianPackage });
    }
    catch (error) { console.error(error.message); res.status(500).json({ success: false, message: 'Server error' }); }
}
