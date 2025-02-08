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
            } else if (message.includes("ai") || message.includes("කෘතිම බුද්ධිය")) {
                let aiInfo = getAIInfo();
                speak(currentLanguage === "si" ? aiInfo.sinhala : aiInfo.english);
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
        "python": {
            english: "Python is a popular programming language known for its simplicity and readability. It is widely used in web development, data science, and AI.",
            sinhala: "Python යනු ජනප්‍රිය කේත පද්ධතියකි, එය පහසුකම සහ කියවීමට හැකි බවට පෙනේ. මෙය වෙබ් සංවර්ධනය, දත්ත විද්‍යාව සහ කෘතිම බුද්ධිය සඳහා පවා භාවිතා වේ."
        },
        "java": {
            english: "Java is a high-level, object-oriented programming language used in enterprise applications, Android development, and backend services.",
            sinhala: "Java යනු උසස් මට්ටමේ, වස්තු-සහ-සංයෝජිත කේත භාෂාවකි, එය ව්‍යවසායක යෙදුම්, Android සංවර්ධනය සහ පිටුපස සේවා සඳහා භාවිතා වේ."
        },
        "javascript": {
            english: "JavaScript is a versatile programming language primarily used for web development, enabling dynamic and interactive websites.",
            sinhala: "JavaScript යනු බහුලව භාවිතා කරන කේත භාෂාවකි, මූලිකව වෙබ් සංවර්ධනය සඳහා භාවිතා වේ, එය ගතික සහ අන්තර්ක්‍රියාකාරී වෙබ් අඩවි සැලසීමට ඉඩ දෙයි."
        }
    };

    return languages[language] || {english: "I am not familiar with that programming language.", sinhala: "මට එම කේත භාෂාව ගැන අවබෝධයක් නැත."};
}

// Country related responses
function getCountryInfo(country) {
    const countries = {
        "usa": {
            english: "The United States of America is a country primarily located in North America. It is known for its cultural diversity, technological advancements, and influential global presence.",
            sinhala: "එක්සත් ජනපදය යනු පරිප්‍රදේශය අධිකව පිහිටි පදනමක් වන දේශයකි. එය සංස්කෘතික විවිධත්වය, තාක්ෂණික ඉදිරිය සහ ආලෝකනීය ගෝලීය අස්ථානවලින් ප්‍රසිද්ධයි."
        },
        "canada": {
            english: "Canada is a country in North America, famous for its natural beauty, multicultural society, and high quality of life.",
            sinhala: "කැනඩාව යනු උතුරු ඇමරිකාවේ පිහිටි රටකි, එය ස්වාභාවික රූමය, බහු-ආධ්‍යාත්මික සමාජය සහ උසස් ජීවන ගුණය සඳහා ප්‍රසිද්ධයි."
        }
    };

    return countries[country] || {english: "Country information not available.", sinhala: "රට විස්තර ලබාගත නොහැක."};
}

// AI related responses
function getAIInfo() {
    return {
        english: "AI (Artificial Intelligence) refers to the simulation of human intelligence in machines that are programmed to think and learn. AI is used in a variety of fields such as machine learning, robotics, and natural language processing.",
        sinhala: "AI (කෘතිම බුද්ධිය) යනු යන්ත්‍රවල මනුෂ්‍ය බුද්ධිය පරිවර්තනය කිරීමයි, ඒවා චින්තනය කිරීම හා ඉගෙනීම සඳහා වැඩසටහන් කළ යන්ත්‍රයක් වන අතර, AI මැෂින් ලර්නින්, රොබෝටික්ස් හා ස්වභාවික භාෂා සැකසුම වැනි විවිධ ක්ෂේත්‍රවල භාවිතා වේ."
    };
}