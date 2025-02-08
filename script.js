let btn = document.createElement("button");
btn.textContent = "Start Listening";
document.body.appendChild(btn);

let content = document.createElement("div");
content.textContent = "Say something...";
document.body.appendChild(content);

let voice = document.createElement("div");
voice.style.display = "none";
voice.textContent = "Listening...";
document.body.appendChild(voice);

// Dataset for programming languages
const programmingLanguages = [
    { language: "Python", description: "Python is an interpreted, high-level programming language for general-purpose programming. It emphasizes readability and simplicity." },
    { language: "JavaScript", description: "JavaScript is a high-level, just-in-time compiled programming language that is widely used for building interactive websites." },
    { language: "Java", description: "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible." },
    { language: "C", description: "C is a general-purpose, procedural programming language that is widely used for system programming and embedded systems." },
    { language: "Ruby", description: "Ruby is an interpreted, high-level, general-purpose programming language known for its simplicity and productivity." }
];

// Dataset for countries
const countries = [
    { country: "Sri Lanka", capital: "Colombo", population: "21.7 million", language: "Sinhala, Tamil", currency: "Sri Lankan Rupee" },
    { country: "United States", capital: "Washington, D.C.", population: "331 million", language: "English", currency: "US Dollar" },
    { country: "Japan", capital: "Tokyo", population: "126.3 million", language: "Japanese", currency: "Yen" },
    { country: "India", capital: "New Delhi", population: "1.38 billion", language: "Hindi, English", currency: "Indian Rupee" },
    { country: "Germany", capital: "Berlin", population: "83 million", language: "German", currency: "Euro" }
];

// Dataset for technology companies
const technologyCompanies = [
    { company: "Apple", headquarters: "Cupertino, California, USA", industry: "Consumer Electronics, Software", founded: "1976" },
    { company: "Microsoft", headquarters: "Redmond, Washington, USA", industry: "Software, Cloud Computing", founded: "1975" },
    { company: "Google", headquarters: "Mountain View, California, USA", industry: "Internet Services, Advertising", founded: "1998" },
    { company: "Amazon", headquarters: "Seattle, Washington, USA", industry: "E-commerce, Cloud Computing", founded: "1994" },
    { company: "Tesla", headquarters: "Palo Alto, California, USA", industry: "Automotive, Energy", founded: "2003" }
];

// Dataset for Presidents
const presidents = [
    { country: "Sri Lanka", president: "Anura Kumara Dissanayaka" },
    { country: "United States", president: "Joe Biden" },
    { country: "Russia", president: "Vladimir Putin" },
    { country: "China", president: "Xi Jinping" },
    { country: "India", president: "Droupadi Murmu" },
    { country: "France", president: "Emmanuel Macron" },
    { country: "Brazil", president: "Luiz Inácio Lula da Silva" },
    { country: "Mexico", president: "Andrés Manuel López Obrador" },
    { country: "South Korea", president: "Yoon Suk-yeol" },
    { country: "Germany", president: "Frank-Walter Steinmeier" },
    { country: "Turkey", president: "Recep Tayyip Erdoğan" }
];

// Function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";  // Correct language code
    window.speechSynthesis.speak(text_speak);
}

// Function to wish the user based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Voice recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
        btn.remove(); // This will remove the button after clicking
    });
} else {
    alert("Speech Recognition API is not supported by your browser.");
}

// Function to handle voice commands
function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    // Hello command
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello sir, what can I help you?");
    }
    // Programming languages details
    else if (message.includes("python") || message.includes("javascript") || message.includes("java") || message.includes("c") || message.includes("ruby")) {
        const language = programmingLanguages.find(lang => message.includes(lang.language.toLowerCase()));
        if (language) {
            speak(`${language.language}: ${language.description}`);
        } else {
            speak("Sorry, I don't have information on that programming language.");
        }
    }
    // Countries details
    else if (message.includes("sri lanka") || message.includes("united states") || message.includes("japan") || message.includes("india") || message.includes("germany")) {
        const country = countries.find(item => message.includes(item.country.toLowerCase()));
        if (country) {
            speak(`${country.country} - Capital: ${country.capital}, Population: ${country.population}, Language: ${country.language}, Currency: ${country.currency}`);
        } else {
            speak("Sorry, I don't have information on that country.");
        }
    }
    // Technology companies details
    else if (message.includes("apple") || message.includes("microsoft") || message.includes("google") || message.includes("amazon") || message.includes("tesla")) {
        const company = technologyCompanies.find(item => message.includes(item.company.toLowerCase()));
        if (company) {
            speak(`${company.company} - Headquarters: ${company.headquarters}, Industry: ${company.industry}, Founded: ${company.founded}`);
        } else {
            speak("Sorry, I don't have information on that company.");
        }
    }
    // Presidents details
    else if (message.includes("president of")) {
        const president = presidents.find(item => message.includes(item.country.toLowerCase()));
        if (president) {
            speak(`The President of ${president.country} is ${president.president}`);
        } else {
            speak("Sorry, I don't have information on that president.");
        }
    }
    // Existing commands
    else if (message.includes("who are you")) {
        speak("I am a voice assistant created by NHB LK Company.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message || message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}