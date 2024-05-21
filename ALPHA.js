import https from 'https';
import readline from 'readline';
import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: "wjo7IuEQ8BYFZUGY1SxpfbJqSEYKqgQrlGXWv5lM",
});

async function analyzeAndProvideFeedback(answers) {
    const additionalPrompt = "give advice to make me feel good";
    const userText = answers.join("\n") + "\n\n" + additionalPrompt;

    try {
        const prediction = await cohere.generate({
            prompt: userText,
            maxTokens: 1000,
        });
        
        console.log("Received prediction", prediction);
    } catch (error) {
        console.error("API error:", error);
    }
}

const questions = [
    "How do you feel today? (happy, sad, stressed, etc.)",
    "What kind of activities have you been doing lately?",
    "How is your sleep?",
    "How are your eating habits?"
];

function startQuestionnaire() {
    console.log("Mood Assessment Survey\n");
    const answers = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let index = 0;
    function askQuestion() {
        if (index < questions.length) {
            rl.question(questions[index] + ": ", (answer) => {
                answers.push(answer);
                index++;
                askQuestion();
            });
        } else {
            analyzeAndProvideFeedback(answers);
            rl.close();
        }
    }

    askQuestion();
}

startQuestionnaire();
