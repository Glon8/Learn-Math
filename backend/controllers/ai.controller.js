import { GoogleGenAI } from "@google/genai"
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.aiKey });

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const askAI = async (req, res) => {
    const message = req.body.message;
    // delaying response - free gemini 10 requests per minute
    await delay(6000);
    // message validation
    if (!message) { console.error('Message is empty'); res.status(400).json({ success: false, message: 'Message is empty' }); }
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
        console.error(error.message); const errTooMany = error.response?.status === 429;
        res.status(errTooMany ? 429 : 500).json({ success: false, message: errTooMany ? 'Please wait, teacher is occupied in the moment! Try again shortly!' : 'Server error' });
    }
}