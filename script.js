let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let languageBtn = document.querySelector("#languageBtn");
let voice = document.querySelector("#voice");

// Default language set to English
let currentLanguage = "en";

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
        languageBtn.innerText = "Switch to English";
    } else {
        currentLanguage = "en";
        speak("Switched to English.");
        languageBtn.innerText = "Switch to Sinhala";
    }
}

// Event listener for language switch
languageBtn.addEventListener("click", () => {
    switchLanguage(currentLanguage === "en" ? "si" : "en");
});

// Speech recognition for voice command
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onstart = () => {
    btn.style.display = "none"; // Hide the button while listening
    voice.style.display = "block"; // Show the voice animation
};

recognition.onend = () => {
    btn.style.display = "flex"; // Show the button again after listening
    voice.style.display = "none"; // Hide the voice animation
};

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
});

// Handle the voice commands
function takeCommand(message) {
    // Language switch commands (via voice)
    if (message.includes("switch to sinhala")) {
        switchLanguage("si");
    } else if (message.includes("switch to english")) {
        switchLanguage("en");
    }

    // Handle common phrases
    if (message.includes("hello") || message.includes("hey")) {
        speak(currentLanguage === "si" ? "ඔයාට හෙලෝ, මට උදව් කරනවද?" : "Hello Sir, what can I help you?");
    } else if (message.includes("what are you") || message.includes("ඔබ කවුද")) {
        speak(currentLanguage === "si" ? "මම NHB LK සමාගම විසින් නිර්මාණය කළ කෘතිම බුද්ධි සහායකයෙක්." : "I am a virtual assistant, created by NHB LK COMPANY.");
    }

    // Programming languages queries
    let langMatch = message.match(/what is (python|java|javascript|c\+\+|php|go|swift|kotlin|dart|typescript|ruby|rust|c#|sql|r|perl|html|css|ruby|shell|matlab|scala|rust|lua|vhdl|assembly)/);
    if (langMatch) {
        let lang = langMatch[1];
        let info = getProgrammingLanguageInfo(lang);
        speak(currentLanguage === "si" ? `මෙය ${lang} පිළිබඳවයි: ${info}` : info);
    } else {
        let countryMatch = message.match(/what is (usa|canada|india|sri lanka|china|japan|germany|france|uk|australia)/);
        if (countryMatch) {
            let country = countryMatch[1];
            let countryInfo = getCountryInfo(country);
            speak(currentLanguage === "si" ? `${country} ගැන ඉතා වැදගත් විස්තර මෙයයි: ${countryInfo}` : countryInfo);
        } else {
            // Google search for unrecognized queries
            let finalText = currentLanguage === "si" ? `මට මෙය ගැන අන්තර්ජාලයෙන් සොයාගන්න හැකි වුණා.` : "This is what I found on the internet regarding " + message;
            speak(finalText);
            window.open(`https://www.google.com/search?q=${message}`, "_blank");
        }
    }
}

// Programming language related responses
function getProgrammingLanguageInfo(language) {
    const languages = {
        "python": "Python is a popular programming language known for its simplicity and readability. It is widely used in web development, data science, and AI.",
        "java": "Java is a high-level, object-oriented programming language used in enterprise applications, Android development, and backend services.",
        "javascript": "JavaScript is a versatile programming language primarily used for web development, enabling dynamic and interactive websites.",
        "c++": "C++ is a powerful programming language commonly used in game development, system programming, and high-performance applications.",
        "php": "PHP is a server-side scripting language widely used for web development and content management systems like WordPress.",
        "go": "Go, also known as Golang, is a statically typed programming language developed by Google, known for its efficiency and concurrency support.",
        "swift": "Swift is Apple's programming language designed for developing iOS, macOS, watchOS, and tvOS applications.",
        "kotlin": "Kotlin is a modern programming language that runs on the Java Virtual Machine and is widely used for Android app development.",
        "dart": "Dart is a programming language developed by Google, mainly used for building cross-platform mobile applications using Flutter.",
        "typescript": "TypeScript is a superset of JavaScript that adds static typing, making it easier to develop and maintain large-scale applications."
    };

    return languages[language] || "Sorry, I don't have information about this language.";
}