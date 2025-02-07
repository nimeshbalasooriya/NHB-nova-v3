const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// API Key (⚠️ Secure API key using .env in production)
const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a";

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.deepseek.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 100
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "API error" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));