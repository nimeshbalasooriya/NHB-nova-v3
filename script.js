// Variables for elements
const voiceBtn = document.getElementById('voiceBtn');
const languageBtn = document.getElementById('languageBtn');
const themeBtn = document.getElementById('themeBtn');
const content = document.getElementById('content');

let currentLanguage = 'en';
let isDarkMode = false;

// Function to speak text
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = currentLanguage === 'si' ? 'si-LK' : 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to switch between languages
function switchLanguage() {
    if (currentLanguage === 'en') {
        currentLanguage = 'si';
        languageBtn.textContent = "Switch to English";
        speak("සිංහල භාෂාවට මාරු වුණා.");
    } else {
        currentLanguage = 'en';
        languageBtn.textContent = "Switch to Sinhala";
        speak("Switched to English.");
    }
}

// Function to toggle dark mode
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark-mode', isDarkMode));
    themeBtn.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
}

// Function to start voice recognition
function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLanguage === 'si' ? 'si-LK' : 'en-US';

    recognition.start();
    
    recognition.onstart = () => {
        content.innerText = "Listening...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        content.innerText = `You said: ${transcript}`;
        processCommand(transcript);
    };

    recognition.onend = () => {
        content.innerText = "Press the button and speak.";
    };
}

// Function to process voice commands
function processCommand(command) {
    if (command.includes('hello')) {
        speak(currentLanguage === 'si' ? 'ඔයාට හෙලෝ!' : 'Hello!');
    } else if (command.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak(currentLanguage === 'si' ? `දැන් වෙලාව ${time} වේ.` : `The time is ${time}`);
    } else if (command.includes('open youtube')) {
        speak(currentLanguage === 'si' ? 'YouTube විවෘත කරනවා.' : 'Opening YouTube...');
        window.open('https://www.youtube.com');
    } else {
        speak(currentLanguage === 'si' ? 'මට මෙය සොයාගන්නා සේවාවක් තිබේ.' : 'I am searching this online for you.');
        window.open(`https://www.google.com/search?q=${command}`);
    }
}

// Event listeners for buttons
voiceBtn.addEventListener('click', startVoiceRecognition);
languageBtn.addEventListener('click', switchLanguage);
themeBtn.addEventListener('click', toggleTheme);