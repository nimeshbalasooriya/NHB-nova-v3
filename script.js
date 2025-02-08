let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let languageBtn = document.querySelector("#languageBtn");

// Default language set to English
let currentLanguage = "en";

// Speech synthesis function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

    // Check the current language and set it for speech
    text_speak.lang = currentLanguage === "si" ? "si-LK" : "en-US";

    window.speechSynthesis.speak(text_speak);
}

// Function to switch between languages
function switchLanguage(language) {
    if (language === "si") {
        currentLanguage = "si";
        speak("සිංහල භාෂාවට මාරු වුණා.");
        languageBtn.innerText = "Switch to English"; // Update button text
    } else {
        currentLanguage = "en";
        speak("Switched to English.");
        languageBtn.innerText = "Switch to Sinhala"; // Update button text
    }
}

// Event listener for language switch
languageBtn.addEventListener("click", () => {
    switchLanguage(currentLanguage === "en" ? "si" : "en");
});

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
    btn.style.display = "none"; // Hide the button while listening
});

// Handle the voice commands
function takeCommand(message) {
    btn.style.display = "flex"; // Show the button again

    // Language switch commands (via voice)
    if (message.includes("switch to sinhala")) {
        switchLanguage("si");
    } else if (message.includes("switch to english")) {
        switchLanguage("en");
    }

    // Handle common phrases and queries
    if (message.includes("hello") || message.includes("hey")) {
        speak(currentLanguage === "si" ? "ඔයාට හෙලෝ, මට උදව් කරනවද?" : "Hello Sir, what can I help you?");
    } else if (message.includes("what are you") || message.includes("ඔබ කවුද")) {
        speak(currentLanguage === "si" ? "මම NHB LK සමාගම විසින් නිර්මාණය කළ කෘතිම බුද්ධි සහායකයෙක්." : "I am a virtual assistant, created by NHB LK COMPANY.");
    } else if (message.includes("open youtube") || message.includes("යූ ටියුබ් ඇරිය")) {
        speak(currentLanguage === "si" ? "YouTube විවෘත කරනවා..." : "Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google") || message.includes("ගූගල් ඇරිය")) {
        speak(currentLanguage === "si" ? "Google විවෘත කරනවා..." : "Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time") || message.includes("වෙලාව")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(currentLanguage === "si" ? `දැන් වෙලාව ${time} ය.` : `The time is ${time}`);
    } else if (message.includes("date") || message.includes("දිනය")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(currentLanguage === "si" ? `අද දිනය ${date} වේ.` : `Today's date is ${date}`);
    } else {
        // Programming language and country detection using regular expressions
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
        "typescript": "TypeScript is a superset of JavaScript that adds static typing, making it easier to develop and maintain large-scale applications.",
        "ruby": "Ruby is a dynamic, interpreted language mainly used for web development with the Ruby on Rails framework.",
        "rust": "Rust is a systems programming language focused on safety, concurrency, and performance.",
        "c#": "C# is a modern, object-oriented language developed by Microsoft, commonly used in game development with Unity and enterprise applications.",
        "sql": "SQL, or Structured Query Language, is used for managing and querying relational databases.",
        "r": "R is a language used primarily for statistical computing and data analysis.",
        "perl": "Perl is a versatile scripting language used for web development, system administration, and text processing.",
        "html": "HTML (Hypertext Markup Language) is the standard language for creating web pages and web applications.",
        "css": "CSS (Cascading Style Sheets) is used for describing the presentation of a document written in HTML or XML.",
        "shell": "Shell scripting is a computer program designed to be run by the Unix shell, a command-line interpreter.",
        "matlab": "MATLAB is a programming platform designed for engineers and scientists to analyze and design systems and products.",
        "scala": "Scala is a strong static type system programming language that fuses functional and object-oriented programming.",
        "lua": "Lua is a lightweight, high-level scripting language designed for embedded use in applications.",
        "vhdl": "VHDL (VHSIC Hardware Description Language) is a hardware description language used for digital system design.",
        "assembly": "Assembly language is a low-level programming language that is closely related to machine code."
    };

    return languages[language] || (currentLanguage === "si" ? "මට මේ භාෂාව ගැන වැඩිදුර දැනුමක් නැහැ." : "I am not familiar with that programming language.");
}

// Country related responses
function getCountryInfo(country) {
    const countries = {
        "usa": "The United States of America is a country primarily located in North America. It is known for its cultural diversity, technological advancements, and influential global presence.",
        "canada": "Canada is a country in North America, famous for its natural beauty, multicultural society, and high quality of life.",
        "india": "India is a country in South Asia, known for its rich history, cultural diversity, and being the world's largest democracy.",
        "sri lanka": "Sri Lanka is an island nation in South Asia, known for its beaches, ancient cities, and the Ceylon tea industry.",
        "china": "China is the world's most populous country,
