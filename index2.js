"use strict";

require('dotenv').config();

const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
async function main() {
    const chatCompletion = await getGroqChatCompletion();
    process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
}
async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Explain what are large language models"
            }
        ],
        model: "llama3-8b-8192"
    });
}
module.exports = {
    main,
    getGroqChatCompletion
};

main();
