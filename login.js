
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        loginMessage.className = "form-message";
        loginMessage.textContent =
            "Sign-in is not available yet. The backend needs to be connected.";
        loginMessage.classList.add("error");
    });
}
