const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.get('/', (req, res) => {
    res.send("Gemini Proxy LIVE — Jai Shree Ram 🙏");
});

app.post('/gemini', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || "Jai Shree Ram";
const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 100 }
    },
    { timeout: 15000 }
);

        const reply = response.data.candidates[0].content.parts[0].text
            .replace(/```/g, '')
            .trim();

        console.log("Gemini reply →", reply);
        res.json({ reply });

    } catch (error) {
        console.error("Gemini Error:", error.response?.data || error.message);
        res.status(500).json({
            error: error.message,
            reply: "Jai Shree Ram 🙏"
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server chal raha hai port ${PORT} pe — Jai Shree Ram`);
});
