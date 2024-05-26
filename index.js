"use strict";

const axios = require('axios');
const readlineSync = require('readline-sync');
require('dotenv').config();

const API_KEY = process.env.GROQ_API_KEY;

const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: API_KEY
});
// async function main() {
//     const chatCompletion = await getGroqChatCompletion();
//     process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
// }
// async function getGroqChatCompletion() {
//     return groq.chat.completions.create({
//         messages: [
//             {
//                 role: "user",
//                 content: "Explain what are large language models"
//             }
//         ],
//         model: "llama3-8b-8192"
//     });
// }
// module.exports = {
//     main,
//     getGroqChatCompletion
// };


async function getChatbotResponse(userInput) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            model: 'llama3-8b-8192',
            messages: [
                {
                    role: 'user',
                    content: userInput
                }
            ],
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null
        });

        for await (const chunk of chatCompletion) {
            process.stdout.write(chunk.choices[0]?.delta?.content || '');
          }
        //for space between questions
          console.log();
          console.log();

    } catch (error) {
        console.error('Error communicating with GroqCloud API:', error.message);
        return 'Sorry, there was an error processing your request.';
    }
}

// Function to start the chatbot
async function startChatbot() {
    console.log('Welcome to the Chatbot! Type your questions below or type "exit" to quit.\n');

    while (true) {
        
        const userInput = readlineSync.question('You: ');
        console.log();
        if (userInput.toLowerCase() === 'exit') {
            console.log('\nThe chat has ended. It was a pleasure chatting with you!');
            break;
        }

        await getChatbotResponse(userInput);
    }
}
module.export ={
    getChatbotResponse,
    startChatbot
}

startChatbot();
