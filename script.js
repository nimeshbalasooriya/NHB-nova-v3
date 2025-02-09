// Full datasets
const programmingLanguages = [
    { language: "Python", description: "Python is an interpreted, high-level programming language for general-purpose programming." },
    { language: "JavaScript", description: "JavaScript is a high-level, just-in-time compiled programming language for building interactive websites." },
    { language: "Java", description: "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible." },
    { language: "C", description: "C is a general-purpose, procedural programming language for system programming." },
    { language: "Ruby", description: "Ruby is a dynamic, open-source programming language focused on simplicity and productivity." }
];

const countries = [
    { country: "Sri Lanka", capital: "Colombo", population: "21.7 million", language: "Sinhala, Tamil", currency: "Sri Lankan Rupee" },
    { country: "United States", capital: "Washington, D.C.", population: "331 million", language: "English", currency: "US Dollar" },
    { country: "Japan", capital: "Tokyo", population: "126.3 million", language: "Japanese", currency: "Yen" },
    { country: "India", capital: "New Delhi", population: "1.38 billion", language: "Hindi, English", currency: "Indian Rupee" },
    { country: "Germany", capital: "Berlin", population: "83 million", language: "German", currency: "Euro" }
];

const technologyCompanies = [
    { company: "Apple", headquarters: "Cupertino, California, USA", industry: "Consumer Electronics, Software", founded: "1976" },
    { company: "Microsoft", headquarters: "Redmond, Washington, USA", industry: "Software, Cloud Computing", founded: "1975" },
    { company: "Google", headquarters: "Mountain View, California, USA", industry: "Internet Services, Advertising", founded: "1998" },
    { company: "Amazon", headquarters: "Seattle, Washington, USA", industry: "E-commerce, Cloud Computing", founded: "1994" },
    { company: "Tesla", headquarters: "Palo Alto, California, USA", industry: "Automotive, Energy", founded: "2003" }
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

// Create the content div to display speech result
let content = document.createElement("div");
content.textContent = "Say something...";
document.body.appendChild(content);

// Create the voice div to show when the assistant is listening
let voice = document.createElement("div");
voice.id = "voice";
voice.style.display = "none";  // Initially hidden
voice.textContent = "Listening...";
document.body.appendChild(voice);

// Create the sidebar for voice commands
let sidebar = document.createElement("div");
sidebar.id = "sidebar";
sidebar.style.display = "none"; // Initially hidden
document.body.appendChild(sidebar);

// Function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"; // Correct language code
    window.speechSynthesis.speak(text);
}

// Initialize Speech Recognition API
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    // Automatically start voice recognition when the page loads
    recognition.start();
    voice.style.display = "block";  // Show the "Listening" text
    sidebar.style.display = "block"; // Show the sidebar
    voice.classList.add("pulse"); // Add the animation class for mic animation

} else {
    alert("Speech Recognition API is not supported by your browser.");
}

// Function to handle voice commands
function takeCommand(message) {
    voice.style.display = "none"; // Hide the "Listening" text after processing
    voice.classList.remove("pulse"); // Remove animation class
    sidebar.style.display = "none"; // Hide the sidebar when command is processed

    // Hello command
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
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
    // Default command if no specific match
    else {
        speak("Sorry, I didn't understand that. Please try again.");
    }
}