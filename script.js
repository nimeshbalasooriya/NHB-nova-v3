let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Default language set to English
let currentLanguage = "en";

// DeepSeek API Key
const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a";

// Speech synthesis function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = currentLanguage === "si" ? "si-LK" : "en-US";
    window.speechSynthesis.speak(text_speak);
}

// Fetch response from DeepSeek API (AI Chatbot)
async function getAIResponse(query) {
    const url = `https://api.deepseek.ai/ask?query=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.answer || "Sorry, I couldn't find an answer.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Something went wrong. Please try again.";
    }
}

// Speech recognition for voice command
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.lang = "en-US"; // Default language
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.lang = currentLanguage === "si" ? "si-LK" : "en-US"; // Set language before starting
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

// Handle voice commands and AI responses
async function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    // **Language Switching**
    if (message.includes("sinhalaට මාරු කරන්න")) {
        switchLanguage("si");
    } else if (message.includes("switch to english")) {
        switchLanguage("en");
    }

    // **Common Voice Commands**
    else if (message.includes("hello") || message.includes("hey")) {
        speak(currentLanguage === "si" ? "ඔයාට හෙලෝ, මට උදව් කරනවද?" : "Hello Sir, what can I help you?");
    } else if (message.includes("what are you")) {
        speak(currentLanguage === "si" ? "මම NHB LK සමාගම විසින් නිර්මාණය කළ AI සහායකයෙක්." : "I am an AI assistant, created by NHB LK COMPANY.");
    } else if (message.includes("open youtube")) {
        speak(currentLanguage === "si" ? "YouTube විවෘත කිරීම..." : "Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak(currentLanguage === "si" ? "Google විවෘත කිරීම..." : "Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(currentLanguage === "si" ? `කාලය ${time} වේ.` : `The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(currentLanguage === "si" ? `අද දිනය ${date} වේ.` : `Today's date is ${date}`);
    } else {
        // **AI Chatbot Response Using DeepSeek API**
        let aiResponse = await getAIResponse(message);
        speak(aiResponse);
    }
}

// Function to switch between Sinhala and English
function switchLanguage(language) {
    currentLanguage = language;
    recognition.lang = language === "si" ? "si-LK" : "en-US"; // Update speech recognition language
    speak(language === "si" ? "සිංහලට මාරු කළා." : "Switched to English.");
}