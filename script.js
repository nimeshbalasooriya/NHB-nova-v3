let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voiceGif = document.querySelector("#voice");
let languageBtn = document.querySelector("#languageBtn");

// Default language
let currentLanguage = "en";

// Speech synthesis function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = currentLanguage === "si" ? "si-LK" : "en-US";
    window.speechSynthesis.speak(text_speak);
}

// Function to switch languages
function switchLanguage() {
    if (currentLanguage === "en") {
        currentLanguage = "si";
        speak("සිංහල භාෂාවට මාරු වුණා.");
        languageBtn.innerText = "Switch to English";
    } else {
        currentLanguage = "en";
        speak("Switched to English.");
        languageBtn.innerText = "Switch to Sinhala";
    }
}

// Add event listener to language button
languageBtn.addEventListener("click", switchLanguage);

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onstart = () => {
    btn.classList.add("listening"); // Start animation
    voiceGif.style.display = "block"; // Show voice gif
};

recognition.onend = () => {
    btn.classList.remove("listening"); // Stop animation
    voiceGif.style.display = "none"; // Hide voice gif
};

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    processCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
});

// Function to handle commands
function processCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak(currentLanguage === "si" ? "ඔයාට හෙලෝ, මට උදව් කරනවද?" : "Hello, how can I help?");
    } else if (message.includes("open youtube") || message.includes("යූ ටියුබ් ඇරිය")) {
        speak(currentLanguage === "si" ? "YouTube විවෘත කරනවා..." : "Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("time") || message.includes("වෙලාව")) {
        let time = new Date().toLocaleTimeString();
        speak(currentLanguage === "si" ? `දැන් වෙලාව ${time} ය.` : `The time is ${time}`);
    } else {
        speak(currentLanguage === "si" ? "මට මෙය හඳුනාගත නොහැක." : "I couldn't recognize that.");
    }
}
