let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-us";
    window.speechSynthesis.speak(text_speak);
}

function getProgrammingLanguageInfo(language) {
    let languages = {
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
        "perl": "Perl is a versatile scripting language used for web development, system administration, and text processing."
    };

    return languages[language] || "I am not familiar with that programming language.";
}

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

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you?");
    } else if (message.includes("what are you")) {
        speak("I am a virtual assistant, created by NHB LK COMPANY.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else {
        // **Programming Language Detection Using Regular Expressions**
        let langMatch = message.match(/what is (python|java|javascript|c\+\+|php|go|swift|kotlin|dart|typescript|ruby|rust|c#|sql|r|perl)/);
        if (langMatch) {
            let lang = langMatch[1];
            let info = getProgrammingLanguageInfo(lang);
            speak(info);
        } else {
            let finalText = "This is what I found on the internet regarding " + message;
            speak(finalText);
            window.open(`https://www.google.com/search?q=${message}`, "_blank");
        }
    }
}