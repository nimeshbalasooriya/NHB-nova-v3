let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";  
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

// Handle commands based on user input
function takeCommand(message) {
    voice.style.display = "none";
    voice.classList.remove("pulse");  
    btn.style.display = "flex";

    // **Greeting Command**
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello! How can I assist you today?");
        return;
    }

    // **Assistant Info Command**
    if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by NHB LK company.");
        return;
    }

    // **Current Time Command**
    if (message.includes("what time is it")) {
        speak(getCurrentTime());
        return;
    }

    // **Current Date Command**
    if (message.includes("what is the date")) {
        speak(getCurrentDate());
        return;
    }

    // **Open App Command**
    if (message.includes("open app")) {
        openApp(message);
        return;
    }

    // **"What is" Command for Dataset Queries & Google Search**
    if (message.startsWith("what is ")) {
        let query = message.replace("what is ", "").trim();
        handleDatasetQuery(query, true);
        return;
    }

    // **Dataset Name Queries**
    handleDatasetQuery(message, false);
}

// **Get Current Time**
function getCurrentTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `The current time is ${hours}:${minutes}:${seconds} ${ampm}.`;
}

// **Get Current Date**
function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are 0-based
    const year = currentDate.getFullYear();

    return `Today's date is ${day}/${month}/${year}.`;
}

// **Open App Function**
function openApp(message) {
    if (message.includes("open browser")) {
        window.open("https://www.google.com", "_blank");
        speak("Opening the browser.");
    } else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com", "_blank");
        speak("Opening YouTube.");
    } else if (message.includes("open calendar")) {
        // Example for opening a calendar (adjust based on OS/platform)
        window.open("https://calendar.google.com", "_blank");
        speak("Opening your calendar.");
    } else {
        speak("I am not sure how to open that app.");
    }
}

// **Function to Handle Dataset Queries or Google Search**
function handleDatasetQuery(query, allowGoogleSearch) {
    // **Check in Buddhist Sites**
    const site = buddhistSitesInSriLanka.find(item => query === item.english_name.toLowerCase());
    if (site) {
        speak(`${site.english_name}, located in ${site.location}: ${site.description}`);
        return;
    }

    // **Check in Programming Languages**
    const language = programmingLanguages.find(lang => query === lang.language.toLowerCase());
    if (language) {
        speak(`${language.language}: ${language.description}`);
        return;
    }

    // **Check in Countries**
    const country = countries.find(item => query === item.country.toLowerCase());
    if (country) {
        speak(`${country.country} - Capital: ${country.capital}, Population: ${country.population}, Language: ${country.language}, Currency: ${country.currency}`);
        return;
    }

    // **Check in AI Apps**
    const app = aiApps.find(item => query === item.app.toLowerCase());
    if (app) {
        speak(`${app.app}: ${app.description}`);
        return;
    }

    // **Check in IT Companies**
    const company = itCompanies.find(item => query === item.company.toLowerCase());
    if (company) {
        speak(`${company.company}: ${company.description}`);
        return;
    }

    // **Check in Cybersecurity Terms**
    const cybersecurityTerm = cybersecurityTerms.find(item => query === item.term.toLowerCase());
    if (cybersecurityTerm) {
        speak(`${cybersecurityTerm.term}: ${cybersecurityTerm.description}`);
        return;
    }

    // **If Not Found → Perform Google Search (Only for "What is" Queries)**
    if (allowGoogleSearch) {
        speak(`I couldn't find information on that. Let me search Google for you.`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
}

// **Datasets**
const buddhistSitesInSriLanka = [
    { english_name: "Temple of the Tooth", sinhala_name: "Sri Dalada Maligawa", location: "Kandy", description: "The Temple of the Sacred Tooth Relic, one of the holiest Buddhist sites in Sri Lanka." },
    { english_name: "Ruwanwelisaya Stupa", sinhala_name: "Ruwanwelisaya", location: "Anuradhapura", description: "A massive stupa in Anuradhapura, an important Buddhist pilgrimage site." },
    { english_name: "Dambulla Cave Temple", sinhala_name: "Dambulla Cave Temple", location: "Dambulla", description: "A cave temple complex with Buddhist murals and statues, a UNESCO World Heritage site." },
    { english_name: "Mihintale", sinhala_name: "Mihintale", location: "Mihintale", description: "The birthplace of Buddhism in Sri Lanka, where King Devanampiya Tissa met Mahinda Thero." },
    { english_name: "Kiri Vehera", sinhala_name: "Kiri Vehera", location: "Tissamaharama", description: "An ancient Buddhist stupa and a popular pilgrimage site in southern Sri Lanka." }
];

const programmingLanguages = [
    { language: "Python", description: "Python is an interpreted, high-level programming language emphasizing readability and simplicity." },
    { language: "JavaScript", description: "JavaScript is a high-level programming language widely used for building interactive websites." },
    { language: "Java", description: "Java is a high-level, object-oriented programming language known for its platform independence." },
    { language: "C", description: "C is a general-purpose programming language widely used for system programming and embedded systems." },
    { language: "Ruby", description: "Ruby is an interpreted programming language known for its simplicity and productivity." },
    { language: "Go", description: "Go is a statically typed programming language developed by Google for scalable systems." },
    { language: "Swift", description: "Swift is a compiled programming language developed by Apple for iOS and macOS applications." }
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
    { app: "ChatGPT", description: "ChatGPT is a state-of-the-art AI language model developed by OpenAI." },
    { app: "Google Assistant", description: "Google Assistant is an AI-powered virtual assistant capable of voice interactions." },
    { app: "Siri", description: "Siri is Apple's voice-controlled AI assistant for iOS devices." },
    { app: "Alexa", description: "Alexa is Amazon's AI-powered voice assistant for smart home devices." },
    { app: "IBM Watson", description: "IBM Watson is an AI platform offering various natural language processing services." }
];

const itCompanies = [
    { company: "Apple", description: "Apple is a multinational technology company known for iPhones, MacBooks, and iOS." },
    { company: "Google", description: "Google is a leading tech company specializing in search, AI, and cloud computing." },
    { company: "Microsoft", description: "Microsoft is known for Windows OS, Office software, and cloud computing solutions." },
    { company: "Amazon", description: "Amazon is a global e-commerce and cloud computing giant with AWS services." },
    { company: "Facebook", description: "Facebook (Meta) is a social media and technology company focusing on VR and AI." }
];

// **Cybersecurity Terms Dataset**
const cybersecurityTerms = [
    { term: "Phishing", description: "Phishing is a type of online scam where attackers pretend to be legitimate organizations to steal sensitive information." },
    { term: "Malware", description: "Malware is software designed to damage or gain unauthorized access to computer systems." },
    { term: "Ransomware", description: "Ransomware is malicious software that locks or encrypts files and demands payment for their release." },
    { term: "Spyware", description: "Spyware is software that secretly monitors and collects user data without their knowledge." },
    { term: "Firewall", description: "A firewall is a security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules." },
    { term: "Encryption", description: "Encryption is the process of converting data into a code to prevent unauthorized access." },
    { term: "DDoS Attack", description: "A Distributed Denial of Service (DDoS) attack involves overwhelming a network or server with traffic to make it unavailable." }
];