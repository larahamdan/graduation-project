
/* ========================================
   CareerPath AI — Registration
   Frontend demo — backend not connected
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const formMessage = document.getElementById("formMessage");

    if (!registerForm || !formMessage) return;

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    function showMessage(message, type = "error") {
        formMessage.textContent = message;
        formMessage.className = "form-message";
        formMessage.classList.add(type);
        formMessage.hidden = false;
        formMessage.setAttribute("role", "alert");
        formMessage.setAttribute("aria-live", "polite");
    }

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        formMessage.textContent = "";
        formMessage.className = "form-message";
        formMessage.hidden = true;

        if (!passwordInput || !confirmPasswordInput) {
            showMessage(
                "The password fields could not be found. Please refresh the page.",
                "error"
            );
            return;
        }

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Check that the password meets the minimum length.
        if (password.length < 8) {
            showMessage(
                "Your password must contain at least 8 characters.",
                "error"
            );
            passwordInput.focus();
            return;
        }

        // Check that both password fields match.
        if (password !== confirmPassword) {
            showMessage(
                "Your passwords do not match. Please try again.",
                "error"
            );
            confirmPasswordInput.focus();
            return;
        }

        /*
         * DEMO MODE:
         * No account is created or stored.
         * Real registration requires a connected backend.
         */

        showMessage(
            "Demo mode: your form passed the basic checks, but no account has been created. You can preview the login page next.",
            "success"
        );

        const submitButton = registerForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        window.setTimeout(() => {
            window.location.href = "login.html";
        }, 1800);
    });
});
