const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");
const response = document.querySelector("#response");

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// DeepSeek API key and URL
const apiKey = "sk-e2fb43231bb44f558212d95edec8d13a"; // Add your API key here
const apiUrl = "https://api.deepseek.ai/v1/ask"; // Ensure this is the correct endpoint

// Function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Default language (English)
    window.speechSynthesis.speak(text_speak);
}

// Function to handle speech recognition
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    getAIResponse(transcript);
};

// Function to get AI response from DeepSeek API
function getAIResponse(message) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query: message })
    })
    .then(response => response.json())
    .then(data => {
        let aiResponse = data.response; // Assuming 'response' is the key in the API response
        response.innerText = aiResponse;
        speak(aiResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        response.innerText = "Sorry, I couldn't process your request.";
        speak("Sorry, I couldn't process your request.");
    });
}

// Start speech recognition when button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});