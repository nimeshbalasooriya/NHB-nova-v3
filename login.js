document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector("#loginBtn");

    // Predefined username & password (for demo)
    const correctUsername = "admin";
    const correctPassword = "nhbnova123";

    loginBtn.addEventListener("click", () => {
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;
        let errorMsg = document.querySelector("#error-msg");

        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "assistant.html"; // Redirect to Voice Assistant
        } else {
            errorMsg.innerText = "Invalid username or password!";
            errorMsg.style.color = "red";
        }
    });
});