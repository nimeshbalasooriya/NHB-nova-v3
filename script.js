let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";  // Adjust to desired language
    window.speechSynthesis.speak(text_speak);
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
    voice.classList.add("pulse");  
    btn.style.display = "none";
});

// Handle the commands based on the input message
function takeCommand(message) {
    voice.style.display = "none";
    voice.classList.remove("pulse");  
    btn.style.display = "flex";

    // **Greeting Command**
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello! How can I assist you today?");
    }

    // **Assistant Info Command**
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by NHB LK company.");
    }

    // **Website Opening Commands**
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
    else if (message.includes("open twitter") || message.includes("go to twitter")) {
        speak("Opening Twitter...");
        window.open("https://twitter.com/", "_blank");
    }
    else if (message.includes("open instagram") || message.includes("go to instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    }
    else if (message.includes("open wikipedia") || message.includes("go to wikipedia")) {
        speak("Opening Wikipedia...");
        window.open("https://wikipedia.org/", "_blank");
    }
    else if (message.includes("open nhb website")) {
        speak("Opening NHB LK official website...");
        window.open("https://nhblk.com/", "_blank");
    }

    // **Dataset Handling - Programming Languages**
    else {
        const language = programmingLanguages.find(lang => message.includes(lang.language.toLowerCase()));
        if (language) {
            speak(`${language.language}: ${language.description}`);
            return;
        }
    }

    // **Dataset Handling - Countries**
    const country = countries.find(item => message.includes(item.country.toLowerCase()));
    if (country) {
        speak(`${country.country} - Capital: ${country.capital}, Population: ${country.population}, Language: ${country.language}, Currency: ${country.currency}`);
        return;
    }

    // **Dataset Handling - AI Apps**
    const app = aiApps.find(item => message.includes(item.app.toLowerCase()));
    if (app) {
        speak(`${app.app}: ${app.description}`);
        return;
    }

    // **Dataset Handling - IT Companies**
    const company = itCompanies.find(item => message.includes(item.company.toLowerCase()));
    if (company) {
        speak(`${company.company}: ${company.description}`);
        return;
    }

    // **Dataset Handling - Buddhist Sites**
    const site = buddhistSitesInSriLanka.find(item => message.includes(item.name.toLowerCase()));
    if (site) {
        speak(`${site.name}, located in ${site.location}: ${site.description}`);
        return;
    }

    speak("Sorry, I don't have information on that.");
}

// **Datasets**
const programmingLanguages = [
    { language: "Python", description: "An interpreted, high-level programming language focusing on readability and simplicity." },
    { language: "JavaScript", description: "A versatile language widely used for web development and interactive websites." },
    { language: "Java", description: "An object-oriented, high-level programming language for cross-platform applications." },
    { language: "C", description: "A powerful, general-purpose programming language commonly used for system programming." },
    { language: "Ruby", description: "A dynamic, high-level programming language known for its simplicity and productivity." },
    { language: "Go", description: "A statically typed programming language developed by Google for scalability and efficiency." },
    { language: "Swift", description: "A powerful programming language created by Apple for iOS and macOS applications." }
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

const aiApps = [
    { app: "ChatGPT", description: "A language model developed by OpenAI for natural language processing tasks." },
    { app: "Google Assistant", description: "An AI-powered virtual assistant by Google for voice-based tasks." },
    { app: "Siri", description: "Apple's voice-controlled AI assistant available on iOS devices." },
    { app: "Alexa", description: "Amazon's AI-powered voice assistant used in Echo devices and smart home automation." },
    { app: "IBM Watson", description: "A robust AI platform offering machine learning and natural language processing services." }
];

const itCompanies = [
    { company: "Apple", description: "A leading technology company designing iPhones, MacBooks, and software solutions." },
    { company: "Google", description: "A multinational company known for search engines, AI, and cloud computing services." },
    { company: "Microsoft", description: "A software giant famous for Windows OS, Office Suite, and Azure Cloud services." },
    { company: "Amazon", description: "A global e-commerce leader with AWS cloud computing and AI innovations." },
    { company: "Facebook", description: "A social media conglomerate, now Meta, focusing on virtual reality and connectivity." }
];

const buddhistSitesInSriLanka = [
    { name: "Sri Dalada Maligawa", location: "Kandy", description: "The Temple of the Sacred Tooth Relic, a significant Buddhist site." },
    { name: "Anuradhapura", location: "Anuradhapura", description: "Ancient city with important Buddhist sites in Sri Lanka." },
    { name: "Ruwanwelisaya", location: "Anuradhapura", description: "A massive stupa important for Buddhist worshippers." }
];