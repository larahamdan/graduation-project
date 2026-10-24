
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        loginMessage.className = "form-message";
        loginMessage.textContent =
            "Demo mode: sign-in is not connected yet. Opening the dashboard preview...";
        loginMessage.classList.remove("error");
        loginMessage.classList.add("success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);
    });
}
