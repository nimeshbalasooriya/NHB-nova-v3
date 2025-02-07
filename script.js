let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Default language set to English
let currentLanguage = "en";

// DeepSeek API Key **(Replace with your actual key securely)**
const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

// Speech synthesis function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = currentLanguage === "si" ? "si-LK" : "en-US";
    window.speechSynthesis.speak(text_speak);
}

// Function to switch between languages
function switchLanguage(language) {
    if (language === "si") {
        currentLanguage = "si";
        speak("සිංහල භාෂාවට මාරු වුණා.");
    } else {
        currentLanguage = "en";
        speak("Switched to English.");
    }
}

// Speech recognition for voice command
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

// Function to handle AI queries using DeepSeek API
async function getAIResponse(message) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return currentLanguage === "si" ? "සමාවෙන්න, ගැටලුවක් සිදුවිය." : "Sorry, an error occurred.";
    }
}

// Handle the voice commands
async function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    // Language switch commands
    if (message.includes("සිංහලට මාරු වෙන්න")) {
        switchLanguage("si");
        return;
    } else if (message.includes("ඉංග්‍රීසිට මාරු වෙන්න")) {
        switchLanguage("en");
        return;
    }

    // AI Response using DeepSeek API
    let aiResponse = await getAIResponse(message);
    speak(aiResponse);
}
