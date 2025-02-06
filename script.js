// DeepSeek API Key
const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a";

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let currentLanguage = "en"; // Default language

// Speech Synthesis Function
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = (currentLanguage === "si") ? "si-LK" : "en-US";
    speechSynthesis.speak(speech);
}

// Speech Recognition Setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Default English
recognition.onresult = async (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    await handleCommand(transcript);
};

// Click Event to Start Recognition
btn.addEventListener("click", () => {
    recognition.start();
});

// Handle Voice Commands and Chatbot Queries
async function handleCommand(message) {
    // Language Switching
    if (message.includes("switch to sinhala") || message.includes("සිංහලට මාරු වෙන්න")) {
        currentLanguage = "si";
        speak("සිංහල භාෂාවට මාරු කරන ලදී.");
        return;
    } else if (message.includes("switch to english")) {
        currentLanguage = "en";
        speak("Switched to English.");
        return;
    }

    // Common Voice Assistant Commands
    if (message.includes("hello") || message.includes("hey")) {
        speak((currentLanguage === "si") ? "හෙලෝ! මට උදව් කරන්නද?" : "Hello! How can I assist you?");
    } else if (message.includes("what are you")) {
        speak((currentLanguage === "si") ? "මම NHB LK සමාගම විසින් නිර්මාණය කළ AI සහායකයෙක්." : "I am an AI assistant, created by NHB LK COMPANY.");
    } else if (message.includes("open youtube")) {
        speak((currentLanguage === "si") ? "YouTube විවෘත කරමින්..." : "Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak((currentLanguage === "si") ? "Google විවෘත කරමින්..." : "Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak((currentLanguage === "si") ? `දැනට වේලාව ${time} ය.` : `The current time is ${time}.`);
    } else if (message.includes("date")) {
        let date = new Date().toDateString();
        speak((currentLanguage === "si") ? `අද දිනය ${date} ය.` : `Today's date is ${date}.`);
    } else {
        // If No Predefined Commands Found, Use DeepSeek AI Chatbot
        let response = await getAIResponse(message);
        speak(response);
    }
}

// Fetch AI Response from DeepSeek API
async function getAIResponse(userMessage) {
    try {
        let response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.7
            })
        });

        let data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return (currentLanguage === "si") ? "මට පිළිතුරක් ලබාගත නොහැක." : "I couldn't get a response.";
    }
}