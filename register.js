
const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

if (registerForm && formMessage) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        formMessage.className = "form-message";

        if (password !== confirmPassword) {
            formMessage.textContent = "Your passwords do not match.";
            formMessage.classList.add("error");
            return;
        }

        formMessage.textContent =
            "Your form is valid! Account creation will be available when the backend is connected.";
        formMessage.classList.add("success");
    });
}
