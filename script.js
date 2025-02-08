let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let languageBtn = document.querySelector("#languageBtn");
let themeBtn = document.querySelector("#themeBtn");
let voiceGif = document.querySelector("#voice");
let sidebarBtn = document.querySelector("#sidebarBtn");
let sidebarContent = document.querySelector("#sidebarContent");
let programmingLanguages = document.querySelector("#programmingLanguages");
let countries = document.querySelector("#countries");
let currentLanguage = "en";
let isDarkMode = true;

// Toggle sidebar visibility
sidebarBtn.addEventListener("click", () => {
    sidebarContent.style.display = sidebarContent.style.display === "block" ? "none" : "block";
});

// Speech synthesis function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
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

// Function to switch between light and dark themes
function switchTheme() {
    if (isDarkMode) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        themeBtn.innerText = "Switch to Dark Mode";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        themeBtn.innerText = "Switch to Light Mode";
    }
    isDarkMode = !isDarkMode;
}

// Event listener for theme switch
themeBtn.addEventListener("click", switchTheme);

// Speech recognition for voice command
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Ensure recognition happens only when speech is finished
recognition.onstart = () => {
    voiceGif.style.display = "block"; // Show the voice animation
};

recognition.onend = () => {
    voiceGif.style.display = "none"; // Hide the animation once done
};

// Handle results after recognition
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.innerText = transcript; // Show recognized speech in the content area
    takeCommand(transcript); // Call takeCommand to process the voice input
};

// Start voice recognition when the button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; // Hide the button while listening
});

// Handle the voice commands
function takeCommand(message) {
    btn.style.display = "flex"; // Show the button again after recognition
    voiceGif.style.display = "none"; // Hide the animation after command processing

    if (message.includes("switch to sinhala")) {
        switchLanguage("si");
    } else if (message.includes("switch to english")) {
        switchLanguage("en");
    }

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
    } else if (message.includes("programming languages") || message.includes("ප්‍රෝග්‍රෑමීන්ග් භාෂා")) {
        speak(currentLanguage === "si" ? "මෙය කිහිපයකුත් ප්‍රෝග්‍රෑමීන්ග් භාෂා වලට අදාල වන්නේ ය." : "Here are some programming languages you should know about.");
        programmingLanguages.innerHTML = currentLanguage === "si" ? "C, C++, Java, Python, JavaScript, PHP, Swift, Kotlin, Ruby, and more." : "C, C++, Java, Python, JavaScript, PHP, Swift, Kotlin, Ruby, and more.";
    } else if (message.includes("countries") || message.includes("රටවල්")) {
        speak(currentLanguage === "si" ? "මෙය කිහිපයක් රටවල් ගැන වේ." : "Here are some countries around the world.");
        countries.innerHTML = currentLanguage === "si" ? "Sri Lanka, USA, Canada, Australia, India, UK, Japan, Brazil, and many more." : "Sri Lanka, USA, Canada, Australia, India, UK, Japan, Brazil, and many more.";
    } else {
        let finalText = currentLanguage === "si" ? `මට මෙය ගැන අන්තර්ජාලයෙන් සොයාගන්න හැකි වුණා.` : "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
</script>