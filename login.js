
/* ========================================
   CareerPath AI — Login
   Frontend demo — backend not connected
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (!loginForm || !loginMessage) return;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    function showMessage(message, type = "error") {
        loginMessage.textContent = message;
        loginMessage.className = "form-message";
        loginMessage.classList.add(type);
        loginMessage.hidden = false;
        loginMessage.setAttribute("aria-live", "polite");
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        loginMessage.textContent = "";
        loginMessage.className = "form-message";
        loginMessage.hidden = true;

        // Check that the expected fields exist.
        if (!emailInput || !passwordInput) {
            showMessage(
                "The login fields could not be found. Please refresh the page.",
                "error"
            );
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validate email.
        if (!email || !emailInput.validity.valid) {
            showMessage(
                "Please enter a valid email address.",
                "error"
            );
            emailInput.focus();
            return;
        }

        // Validate password.
        if (!password) {
            showMessage(
                "Please enter your password.",
                "error"
            );
            passwordInput.focus();
            return;
        }

        /*
         * DEMO MODE:
         * No credentials are authenticated.
         * No user session is created.
         * Real login requires a connected backend.
         */

        showMessage(
            "Demo mode: your details have not been authenticated. Opening the dashboard preview...",
            "success"
        );

        const submitButton = loginForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        window.setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    });
});
