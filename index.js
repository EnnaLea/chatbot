const axios = require('axios');
const readlineSync = require('readline-sync');
require('dotenv').config();

// Replace these with your actual GroqCloud and Llama3 API keys
const GROQCLOUD_API_KEY = process.env.GROQ_API_KEY;
const LLAMA3_API_KEY = 'your-llama3-api-key';

// Function to send user input to GroqCloud and get a response from Llama3
async function getChatbotResponse(userInput) {
    try {
        // Make a request to GroqCloud API
        const groqcloudResponse = await axios.post('https://api.groqcloud.com/v1/query', {
            input: userInput
        }, {
            headers: {
                'Authorization': `Bearer ${GROQCLOUD_API_KEY}`
            }
        });

        const groqcloudData = groqcloudResponse.data;

        // Assuming GroqCloud returns a structured format, get the relevant data for Llama3
        const formattedInput = groqcloudData.formatted_input;

        // Make a request to Llama3 API
        const llama3Response = await axios.post('https://api.llama3.com/v1/generate', {
            input: formattedInput
        }, {
            headers: {
                'Authorization': `Bearer ${LLAMA3_API_KEY}`
            }
        });

        const llama3Data = llama3Response.data;
        return llama3Data.response;
    } catch (error) {
        console.error('Error communicating with APIs:', error.message);
        return 'Sorry, there was an error processing your request.';
    }
}

// Function to start the chatbot
async function startChatbot() {
    console.log('Welcome to the Chatbot! Type your questions below. Type "exit" to quit.');

    while (true) {
        const userInput = readlineSync.question('You: ');

        if (userInput.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            break;
        }

        const response = await getChatbotResponse(userInput);
        console.log('Chatbot:', response);
    }
}

// Start the chatbot
startChatbot();
