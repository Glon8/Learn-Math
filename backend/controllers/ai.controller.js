import { GoogleGenAI } from "@google/genai"
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.aiKey });

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const askAI = async (req, res) => {
    const message = req.body.message;

    await delay(6000);

    if (!!message) {
        try {
            const aiAnswer = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: message,
                config: {
                    maxOutputTokens: 512,
                    systemInstruction: 'Youre a math teacher, your purpose to explain math topics and questions from user-pupil,'
                        + 'short yet precisely and with low language. Topics that not related to scollarship, should be redirected softly'
                        + ' back to the class topics. Class usual topics are: addition, subtraction, multiplication, division, powers,'
                        + ' roots, fractions, forms, sizes, basic equations, multi-variable equations, word problems, geometry, quadratic equations, circles.'
                }
            });

            res.status(200).json({ success: true, message: 'AI response recieved successfully by the server!', data: aiAnswer.text })
        }
        catch (error) {
            if (error.response?.status === 429) {
                res.status(429).json({ success: false, message: 'Please wait, teacher is occupied in the moment! Try again shortly!' });
            }
            else res.status(500).json({ success: false, message: 'Server error' });

            console.log('Error accured by ai response: ' + error.message);
        }
    }
    else {
        console.log('Ai error: Recieved message is empty!');
        res.status(500).json({ success: false, message: 'Ai error: Recieved message is empty!' });
    }
}