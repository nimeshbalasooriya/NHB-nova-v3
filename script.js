async function fetchAIResponse(prompt) {
    const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();
    console.log("AI Response:", data.reply);
}