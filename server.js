const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: '*' }));  // ← Fixed CORS for all origins
app.use(express.json({ limit: '10mb' }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_FALLBACK_KEY";  // ← Environment se le

app.get('/', (req, res) => res.send("Gemini Proxy Running! Jai Shree Ram"));

app.post('/gemini', async (req, res) => {
    console.log("POST /gemini called! Prompt:", req.body.prompt);  // ← Debug log
    try {
        if (!req.body.prompt) {
            return res.status(400).json({ error: "No prompt provided" });
        }
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: req.body.prompt }] }],
                generationConfig: { temperature: 0.8, maxOutputTokens: 80 }
            },
            { timeout: 10000 }
        );
        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Jai Shree Ram 🙏";
        console.log("Gemini success! Reply:", reply);  // ← Debug log
        res.json({ reply: reply.trim() });
    } catch (err) {
        console.error("Gemini error:", err.message);  // ← Debug log
        res.status(500).json({ error: err.message, reply: "Jai Shree Ram 🙏" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));
