const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyDITVWHstOZk8uGbVxMd_kPLTVDGUAv9rA"; // ← Sirf yahan daalo

app.post('/gemini', async (req, res) => {
    try {
        const {
            prompt
        } = req.body;
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 70
                }
            }
        );

        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Jai Shree Ram 🙏";
        res.json({
            reply: reply.trim()
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            reply: "Jai Shree Ram 🙏"
        });
    }
});

app.get('/', (req, res) => res.send("Gemini Proxy Running! Jai Shree Ram"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));