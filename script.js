let currentLanguage = "en"; // Default language is English

// Function to handle language switch
function switchLanguage(lang) {
    currentLanguage = lang;
    if (currentLanguage === "si") {
        speak("ඔබ දැන් සිංහල භාෂාවට මාරු වී ඇත.");
    } else {
        speak("You have switched to English.");
    }
}

// Function to speak a message
function speak(message) {
    let speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}

// Function to handle user commands and responses
function takeCommand(message) {
    // Language switch commands (via voice)
    if (message.includes("switch to sinhala") || message.includes("සිංහලට මාරු වන්න")) {
        switchLanguage("si");
    } else if (message.includes("switch to english") || message.includes("ඉංග්‍රීසියට මාරු වන්න")) {
        switchLanguage("en");
    }

    // Handle greetings
    if (message.includes("hello") || message.includes("hey") || message.includes("හෙලෝ") || message.includes("හෙයි")) {
        speak(currentLanguage === "si" ? "ඔයාට හෙලෝ, මට උදව් කරනවද?" : "Hello, what can I help you?");
    } else if (message.includes("who are you") || message.includes("ඔබ කවුද")) {
        speak(currentLanguage === "si" ? "මම NHB LK සමාගම විසින් නිර්මාණය කළ කෘතිම බුද්ධි සහායකයෙක්." : "I am a virtual assistant created by NHB LK COMPANY.");
    } else if (message.includes("how are you") || message.includes("ඔයා කොහොමද") || message.includes("ඔයා කොහොමද?")) {
        speak(currentLanguage === "si" ? "මට හොඳයි, ඔබට කුමන කාරණයක් උදව් කරන්නද?" : "I'm doing well, how can I assist you?");
    }

    // Programming languages queries
    let langMatch = message.match(/what is (python|java|javascript|c\+\+|php|go|swift|kotlin|dart|typescript|ruby|rust|c#|sql|r|perl|html|css|ruby|shell|matlab|scala|rust|lua|vhdl|assembly)/);
    if (langMatch) {
        let lang = langMatch[1];
        let info = getProgrammingLanguageInfo(lang);
        speak(currentLanguage === "si" ? `මෙය ${lang} පිළිබඳවයි: ${info}` : info);
    } else {
        // Country-related queries
        let countryMatch = message.match(/what is (usa|canada|india|sri lanka|china|japan|germany|france|uk|australia)/);
        if (countryMatch) {
            let country = countryMatch[1];
            let countryInfo = getCountryInfo(country);
            speak(currentLanguage === "si" ? `${country} ගැන ඉතා වැදගත් විස්තර මෙයයි: ${countryInfo}` : countryInfo);
        } else {
            // AI models related queries
            let aiModelMatch = message.match(/what is (chatgpt|gpt|bard|bing|llama|deepmind|gpt-4|openai)/);
            if (aiModelMatch) {
                let aiModel = aiModelMatch[1];
                let aiInfo = getAIModelInfo(aiModel);
                speak(currentLanguage === "si" ? `${aiModel} පිළිබඳව: ${aiInfo}` : aiInfo);
            } else {
                // Google search for unrecognized queries
                let finalText = currentLanguage === "si" ? `මට මෙය ගැන අන්තර්ජාලයෙන් සොයාගන්න හැකි වුණා.` : "This is what I found on the internet regarding " + message;
                speak(finalText);
                window.open(`https://www.google.com/search?q=${message}`, "_blank");
            }
        }
    }
}

// Function to fetch programming language details in Sinhala and English
function getProgrammingLanguageInfo(language) {
    const languages = {
        "python": {
            en: "Python is a popular programming language known for its simplicity and readability. It is widely used in web development, data science, and AI.",
            si: "පයිතන් ප‍්‍රචලිත වැඩසටහන් භාෂාවක් වන අතර එය සරල හා කියවිය හැකි බවට හඳුනාගෙන ඇත. එය වෙබ් සංවර්ධන, දත්ත විද්‍යාව සහ කෘතිම බුද්ධිය සඳහා ප්‍රධාන භාෂාවක් ලෙස භාවිතා වේ."
        },
        "java": {
            en: "Java is a high-level, object-oriented programming language used for building enterprise applications and Android development.",
            si: "ජාවා යනු උසස් මට්ටමේ, වස්තු මූලික වූ වැඩසටහන් භාෂාවක් වන අතර එය සමාගම් යෙදුම් සහ ඇන්ඩ්රොයිඩ් සංවර්ධනය සඳහා භාවිතා වේ."
        },
        "javascript": {
            en: "JavaScript is a scripting language that runs in the browser and is used for building interactive and dynamic websites.",
            si: "ජාවාස්ක්‍රිප්ට් යනු බ්‍රවුසරය තුළ ක්‍රියාත්මක වන ස්ක්‍රිප්ට් භාෂාවක් වන අතර එය ක්‍රියාශීලී හා ඩයිනෑමික වෙබ්අඩවි සෑදීමට භාවිතා වේ."
        },
        "c++": {
            en: "C++ is a powerful programming language used in game development, systems programming, and applications requiring high performance.",
            si: "C++ යනු ගේම් සංවර්ධනය, පද්ධති වැඩසටහන් කිරීම සහ ඉහල කාර්ය සාධනය අවශ්‍ය යෙදුම් සඳහා භාවිතා වන බලවතු වැඩසටහන් භාෂාවකි."
        },
        "php": {
            en: "PHP is a server-side scripting language commonly used for web development and creating dynamic web pages.",
            si: "PHP යනු වෙබ් සංවර්ධනය සහ ඩයිනයික වෙබ් පිටු තැනීම සඳහා සාමාන්‍යයෙන් භාවිතා වන සේවාදායක පාර්ශව ස්ක්‍රිප්ට් භාෂාවකි."
        },
        "go": {
            en: "Go is a statically typed language developed by Google, known for its simplicity and efficiency in building scalable applications.",
            si: "ගෝ යනු ගූගල් විසින් නිර්මාණය කරන ලද ස්ථායී වර්ගකරණ භාෂාවකි, එය සරලත්වය සහ කාර්ය සාධනය සම්බන්ධව ප්‍රසිද්ධ වන අතර මනෝගත යෙදුම් සාදා ගැනීමට භාවිතා වේ."
        },
        "swift": {
            en: "Swift is a programming language created by Apple for developing iOS and macOS applications.",
            si: "ස්විෆට් යනු ඇපල් විසින් නිර්මාණය කරන ලද වැඩසටහන් භාෂාවකි, එය iOS සහ macOS යෙදුම් සංවර්ධනය සඳහා භාවිතා වේ."
        },
        "kotlin": {
            en: "Kotlin is a modern programming language that runs on the JVM and is used for Android development.",
            si: "කොට්ලින් යනු ජේවීඑම් (JVM) මත ක්‍රියාත්මක වන නවීන වැඩසටහන් භාෂාවකි, එය ඇන්ඩ්රොයිඩ් සංවර්ධනය සඳහා භාවිතා වේ."
        },
        "dart": {
            en: "Dart is a language developed by Google for building mobile, web, and desktop apps, especially used with the Flutter framework.",
            si: "ඩාට් යනු ගූගල් විසින් නිර්මාණය කරන ලද භාෂාවකි, එය ජංගම, වෙබ් සහ ඩෙස්ක්ටොප් යෙදුම් සාදා ගැනීමට භාවිතා වේ, විශේෂයෙන් ෆ්ලටර් ප්‍රාණීකරණය සමඟ."
        }
    };

    return languages[language] ? (currentLanguage === "si" ? languages[language].si : languages[language].en) : "I don't have information on this language.";
}

// Function to fetch country details
function getCountryInfo(country) {
    const countries = {
        "usa": {
            en: "The United States is a country located in North America, known for its cultural influence, economic power, and political importance.",
            si: "සංයුක්ත රාජධානිය යනු උතුරු ඇමරිකාවේ පිහිටි රටක් වන අතර එය සංස්කෘතික බලපෑම්, ආර්ථික බලය සහ දේශපාලනික වැදගත්කම සඳහා ප්‍රසිද්ධ වේ."
        },
        "canada": {
            en: "Canada is a country located in North America, known for its beautiful landscapes and multicultural society.",
            si: "කැනඩා යනු උතුරු ඇමරිකාවේ පිහිටි රටක් වන අතර එය මනෝගත දර්ශන සහ බහු සංස්කෘතික සමාජය සඳහා ප්‍රසිද්ධ වේ."
        },
        "india": {
            en: "India is a country in South Asia, famous for its rich history, diverse culture, and booming technology sector.",
            si: "ඉන්දියාව යනු දකුණු ආසියාවේ පිහිටි රටක් වන අතර එය ධනවත් ඉතිහාසය, විවිධ සංස්කෘතිය සහ සංවර්ධනය වන තාක්ෂණ ක්ෂේත්‍රය සඳහා ප්‍රසිද්ධ වේ."
        },
        "sri lanka": {
            en: "Sri Lanka is an island nation in South Asia, known for its natural beauty, rich history, and vibrant culture.",
            si: "ශ්‍රී ලංකාව යනු දකුණු ආසියාවේ පිහිටි දිවයිනක් වන අතර එය ස්වාභාවික රූපලාවණ්‍යය, ධනවත් ඉතිහාසය සහ සජීවී සංස්කෘතිය සඳහා ප්‍රසිද්ධ වේ."
        }
    };

    return countries[country] ? (currentLanguage === "si" ? countries[country].si : countries[country].en) : "I don't have information on this country.";
}

// Function to fetch AI models details
function getAIModelInfo(model) {
    const aiModels = {
        "chatgpt": {
            en: "ChatGPT is an AI model developed by OpenAI, capable of generating human-like text based on prompts. It is used for conversation, question answering, and content creation.",
            si: "ChatGPT යනු OpenAI විසින් නිර්මාණය කරන ලද කෘතිම බුද්ධියක් වන අතර එය කෙටි සහ හැසිරවිය හැකි පණිවුඩ ලබා දීමේ හැකියාව ඇත."
        },
        "gpt": {
            en: "GPT (Generative Pre-trained Transformer) is an AI model that uses large-scale unsupervised learning to generate human-like text. It's used in many natural language processing tasks.",
            si: "GPT (Generative Pre-trained Transformer) යනු කෘතිම බුද්ධි ආකෘතියක් වන අතර එය විශාල පරිමාණ අපොහොසත් අධ්‍යයන භාවිතා කරමින් මිනිස් මෙන්ම පණිවිඩ ජනනය කිරීමේ හැකියාව ඇත."
        }
    };

    return aiModels[model] ? (currentLanguage === "si" ? aiModels[model].si : aiModels[model].en) : "I don't have information on this AI model.";
}

// Voice Recognition Setup
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = currentLanguage === "si" ? "si-LK" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        takeCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak(currentLanguage === "si" ? "කථන හඳුනාගැනීමේ දෝෂයක් ඇති විය." : "There was an error in speech recognition.");
    };
} else {
    console.log("Speech recognition not supported in this browser.");
    speak(currentLanguage === "si" ? "කථන හඳුනාගැනීම මෙම බ්‍රවුසරයේ සහාය නොදක්වයි." : "Speech recognition is not supported in this browser.");
}