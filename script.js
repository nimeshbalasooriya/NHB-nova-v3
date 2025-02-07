const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a"; // ⚠️ Replace with your actual API key

async function getAIResponse(prompt) {
    const response = await fetch("https://api.deepseek.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-chat", // DeepSeek AI Model
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 500
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Example: Get AI response from user input
document.getElementById("sendBtn").addEventListener("click", async () => {
    let userInput = document.getElementById("userInput").value;
    let response = await getAIResponse(userInput);

    // Display response
    document.getElementById("chatbox").innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    document.getElementById("chatbox").innerHTML += `<p><b>AI:</b> ${response}</p>`;
});
