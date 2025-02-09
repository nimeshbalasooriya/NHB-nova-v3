let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Example datasets (can be extended as needed)
const programmingLanguages = [
    { language: "Python", description: "Python is an interpreted, high-level programming language for general-purpose programming. It emphasizes readability and simplicity." },
    { language: "JavaScript", description: "JavaScript is a high-level, just-in-time compiled programming language that is widely used for building interactive websites." },
    { language: "Java", description: "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible." },
    { language: "C", description: "C is a general-purpose, procedural programming language that is widely used for system programming and embedded systems." },
    { language: "Ruby", description: "Ruby is an interpreted, high-level, general-purpose programming language known for its simplicity and productivity." },
    { language: "Go", description: "Go is an open-source, statically typed programming language developed by Google, designed for efficiency and simplicity in building scalable systems." },
    { language: "Swift", description: "Swift is a general-purpose, compiled programming language developed by Apple for building iOS, macOS, watchOS, and tvOS applications." }
];

const countries = [
    { country: "Sri Lanka", capital: "Colombo", population: "21.7 million", language: "Sinhala, Tamil", currency: "Sri Lankan Rupee" },
    { country: "United States", capital: "Washington, D.C.", population: "331 million", language: "English", currency: "US Dollar" },
    { country: "Japan", capital: "Tokyo", population: "126.3 million", language: "Japanese", currency: "Yen" },
    { country: "India", capital: "New Delhi", population: "1.38 billion", language: "Hindi, English", currency: "Indian Rupee" },
    { country: "Germany", capital: "Berlin", population: "83 million", language: "German", currency: "Euro" },
    { country: "Canada", capital: "Ottawa", population: "38 million", language: "English, French", currency: "Canadian Dollar" },
    { country: "Australia", capital: "Canberra", population: "25 million", language: "English", currency: "Australian Dollar" }
];

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

// AI apps dataset
const aiApps = [
    { app: "ChatGPT", description: "ChatGPT is a state-of-the-art language model developed by OpenAI for natural language processing tasks, including conversational AI." },
    { app: "Google Assistant", description: "Google Assistant is a virtual assistant powered by AI, capable of performing tasks and answering questions based on voice input." },
    { app: "Siri", description: "Siri is Apple's voice-controlled assistant that uses AI to answer questions, make recommendations, and perform actions on Apple devices." },
    { app: "Alexa", description: "Alexa is Amazon's AI-powered voice assistant designed to provide a wide range of tasks, including smart home control, entertainment, and information." },
    { app: "IBM Watson", description: "IBM Watson is an AI platform offering various AI services, including natural language processing, machine learning, and data analytics." }
];

// IT companies dataset
const itCompanies = [
    { company: "Apple", description: "Apple Inc. is a multinational technology company that designs, manufactures, and sells consumer electronics, software, and services." },
    { company: "Google", description: "Google LLC is a multinational technology company specializing in Internet-related services and products, including online advertising, search, and cloud computing." },
    { company: "Microsoft", description: "Microsoft Corporation is a multinational technology company that produces software, electronics, and personal computers, known for Windows and Office products." },
    { company: "Amazon", description: "Amazon.com, Inc. is a multinational company focusing on e-commerce, cloud computing, and artificial intelligence, with the AWS platform as a leader in cloud services." },
    { company: "Facebook", description: "Facebook, Inc. (now Meta Platforms) is a social media conglomerate and technology company known for its social networking platform and virtual reality ventures." }
];

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";  // Adjust to desired language
    window.speechSynthesis.speak(text_speak);
}

// Function to wish based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Initialize Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Start listening when the button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    voice.classList.add("pulse");  // Add pulse animation
    btn.style.display = "none";
});

// Handle the commands based on the input message
function takeCommand(message) {
    voice.style.display = "none";
    voice.classList.remove("pulse");  // Remove pulse animation
    btn.style.display = "flex";

    // Command for greeting
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
    }
    // Command for virtual assistant info
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by NHB LK company.");
    }
    // Open websites
    else if (message.includes("open youtube") || message.includes("go to youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    }
    else if (message.includes("open google") || message.includes("go to google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    }
    else if (message.includes("open facebook") || message.includes("go to facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    }
    else if (message.includes("open instagram") || message.includes("go to instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    }
    // Commands for time and date
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    }
    // Handle programming languages
    else if (message.includes("python") || message.includes("javascript") || message.includes("java") || message.includes("c") || message.includes("ruby") || message.includes("go") || message.includes("swift")) {
        const language = programmingLanguages.find(lang => message.includes(lang.language.toLowerCase()));
        if (language) {
            speak(`${language.language}: ${language.description}`);
        } else {
            speak("Sorry, I don't have information on that programming language.");
        }
    }
    // Handle countries
    else if (message.includes("sri lanka") || message.includes("united states") || message.includes("japan") || message.includes("india") || message.includes("germany") || message.includes("canada") || message.includes("australia")) {
        const country = countries.find(item => message.includes(item.country.toLowerCase()));
        if (country) {
            speak(`${country.country} - Capital: ${country.capital}, Population: ${country.population}, Language: ${country.language}, Currency: ${country.currency}`);
        } else {
            speak("Sorry, I don't have information on that country.");
        }
    }
    // Handle presidents
    else if (message.includes("president of")) {
        const president = presidents.find(item => message.includes(item.country.toLowerCase()));
        if (president) {
            speak(`The President of ${president.country} is ${president.president}`);
        } else {
            speak("Sorry, I don't have information on that president.");
        }
    }
    // Handle AI apps
    else if (message.includes("chatgpt") || message.includes("google assistant") || message.includes("siri") || message.includes("alexa") || message.includes("ibm watson")) {
        const app = aiApps.find(item => message.includes(item.app.toLowerCase()));
        if (app) {
            speak(`${app.app}: ${app.description}`);
        } else {
            speak("Sorry, I don't have information on that AI app.");
        }
    }
    // Handle IT companies
    else if (message.includes("apple") || message.includes("google") || message.includes("microsoft") || message.includes("amazon") || message.includes("facebook")) {
        const company = itCompanies.find(item => message.includes(item.company.toLowerCase()));
        if (company) {
            speak(`${company.company}: ${company.description}`);
        } else {
            speak("Sorry, I don't have information on that IT company.");
        }
    }
    // Google search for unknown queries
    else if (message.includes("search")) {
        const query = message.replace("search", "").trim();
        speak(`Searching Google for ${query}...`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
    // Default response for unknown commands
    else {
        speak("I didn't understand that. Can you please repeat?");
    }
}