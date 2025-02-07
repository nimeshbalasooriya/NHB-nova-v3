const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a"; // ⚠️ Replace with your actual API key

async function getAIResponse(prompt) {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sk-e2fb43231bb44f558212d95edec8d13a}` // 🔥 API Key added here
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 100
        })
    });

    const data = await response.json();
    return data.choices[0].message.content; // Extracting AI response
}

// Example Usage
getAIResponse("Hello, how are you?").then(response => console.log(response));
