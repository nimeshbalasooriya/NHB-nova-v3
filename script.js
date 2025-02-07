
 @@mm0 +1,31 @@
const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a"; // ⚠️ Replace with your actual API key
@@ -1,30 +1,15 @@

 const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a"; // ⚠️ Replace with your actual API key
async function getAIResponse(prompt) {
 const API_KEY = "sk-e2fb43231bb44f558212d95edec8d13a"; // ⚠️ Replace with your actual API key


 async function getAIResponse(prompt) {
 async function getAIResponse(prompt) {
     const response = await fetch("https://api.deepseek.com/v1/completions", {
     const response = await fetch("https://api.deepseek.com/v1/completions", {
        method: "POST",
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        headers: {
         method: "POST",
            "Content-Type": "application/json",
         method: "POST",
            "Authorization": `Bearer ${API_KEY}`
         headers: {
        },
         headers: {
        body: JSON.stringify({
             "Content-Type": "application/json",
             "Content-Type": "application/json",
             "Authorization": `Bearer ${API_KEY}`
             "Authorization": `Bearer ${API_KEY}`
         },
         },
         body: JSON.stringify({
         body: JSON.stringify({
             model: "deepseek-chat", // DeepSeek AI Model
             model: "deepseek-chat", // DeepSeek AI Model
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            temperature: 0.7,
             messages: [{ role: "user", content: prompt }],
             messages: [{ role: "user", content: prompt }],
             temperature: 0.7,
             temperature: 0.7,
             max_tokens: 500
             max_tokens: 500
            max_tokens: 100
         })
         })
    });
        })

