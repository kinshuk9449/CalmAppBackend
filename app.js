const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: "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"
});

app.post("/chat", async (req, res) => {
    const userMsg = req.body.message;

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a calming emotional-support companion. Speak gently and empathetically."
            },
            { role: "user", content: userMsg }
        ]
    });

    res.json({ reply: completion.choices[0].message.content });
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
