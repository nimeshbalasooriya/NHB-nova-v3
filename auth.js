document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; // Redirect if not logged in
    }

    document.querySelector("#logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html"; // Redirect to login
    });
});