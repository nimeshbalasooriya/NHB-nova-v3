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
        "typescript": "TypeScript is a superset of JavaScript that adds static typing, making it easier to develop and maintain large-scale applications."
    };

    return languages[language] || "I am not familiar with that programming language.";
}

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
    } else if (message.includes("what is") && (message.includes("python") || message.includes("java") || message.includes("javascript") || message.includes("c++") || message.includes("php") || message.includes("go") || message.includes("swift") || message.includes("kotlin") || message.includes("dart") || message.includes("typescript"))) {
        let lang = message.split("what is ")[1].trim();
        let info = getProgrammingLanguageInfo(lang);
        speak(info);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}