
/* ========================================
   CareerPath AI — CV Upload and Career Selection
   Frontend demo — backend not connected
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const careerForm = document.getElementById("careerForm");
    if (!careerForm) return;

    const cvFile = document.getElementById("cvFile");
    const uploadArea = document.getElementById("uploadArea");
    const uploadTitle = document.getElementById("uploadTitle");
    const uploadDescription = document.getElementById("uploadDescription");
    const formMessage = document.getElementById("uploadMessage");
    const analyzeButton = document.getElementById("analyzeButton");

    const careerRole = document.getElementById("careerRole");
    const careerSearch = document.getElementById("careerSearch");
    const customCareerGroup = document.getElementById("customCareerGroup");
    const customCareer = document.getElementById("customCareer");

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

    let selectedFile = null;
    let isSubmitting = false;

    function showMessage(message, type = "info") {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.hidden = !message;
        formMessage.classList.remove("alert-success", "alert-error");

        if (type === "success") {
            formMessage.classList.add("alert-success");
        } else if (type === "error") {
            formMessage.classList.add("alert-error");
        }
    }

    function validateFile(file) {
        if (!file) return "Please choose your CV first.";

        const fileName = file.name.toLowerCase();
        const isAllowed = ALLOWED_EXTENSIONS.some(extension =>
            fileName.endsWith(extension)
        );

        if (!isAllowed) {
            return "Please select a PDF or DOCX file.";
        }

        if (file.size === 0) {
            return "This file is empty. Please choose another one.";
        }

        if (file.size > MAX_FILE_SIZE) {
            return "Your CV must be 5 MB or smaller.";
        }

        return "";
    }

    function resetSelectedFile() {
        selectedFile = null;

        if (cvFile) cvFile.value = "";

        if (uploadTitle) {
            uploadTitle.textContent = "Choose your CV to get started";
        }

        if (uploadDescription) {
            uploadDescription.textContent =
                "Select a PDF or DOCX file from your device.";
        }
    }

    function showSelectedFile(file) {
        const error = validateFile(file);

        if (error) {
            resetSelectedFile();
            showMessage(error, "error");
            return false;
        }

        selectedFile = file;

        if (uploadTitle) {
            uploadTitle.textContent = file.name;
        }

        if (uploadDescription) {
            const sizeInKB = Math.max(1, Math.round(file.size / 1024));
            uploadDescription.textContent =
                `${sizeInKB} KB · Ready to continue`;
        }

        showMessage("Your CV is selected successfully.", "success");
        return true;
    }

    if (cvFile) {
        cvFile.addEventListener("change", () => {
            const file = cvFile.files?.[0];

            if (!file) {
                selectedFile = null;
                return;
            }

            showSelectedFile(file);
        });
    }

    /* DRAG AND DROP */

    if (uploadArea && cvFile) {
        ["dragenter", "dragover"].forEach(eventName => {
            uploadArea.addEventListener(eventName, event => {
                event.preventDefault();
                uploadArea.classList.add("dragover");
            });
        });

        ["dragleave", "drop"].forEach(eventName => {
            uploadArea.addEventListener(eventName, event => {
                event.preventDefault();
                uploadArea.classList.remove("dragover");
            });
        });

        uploadArea.addEventListener("drop", event => {
            const file = event.dataTransfer?.files?.[0];
            if (!file) return;

            if (!showSelectedFile(file)) return;

            try {
                const transfer = new DataTransfer();
                transfer.items.add(file);
                cvFile.files = transfer.files;
            } catch {
                // Some browsers may not allow assigning dropped files.
            }
        });
    }

    /* CAREER SEARCH */

    function filterCareers() {
        if (!careerSearch || !careerRole) return;

        const searchTerm = careerSearch.value.trim().toLowerCase();
        const options = Array.from(careerRole.options);

        options.forEach(option => {
            if (!option.value || option.value === "other") {
                option.hidden = false;
                return;
            }

            option.hidden =
                searchTerm !== "" &&
                !option.textContent.toLowerCase().includes(searchTerm);
        });

        careerRole.querySelectorAll("optgroup").forEach(group => {
            const hasMatch = Array.from(group.options).some(
                option => !option.hidden
            );

            group.hidden = searchTerm !== "" && !hasMatch;
        });

        if (searchTerm) {
            const matchingCareer = options.some(option =>
                option.value &&
                option.value !== "other" &&
                option.textContent.toLowerCase().includes(searchTerm)
            );

            showMessage(
                matchingCareer
                    ? ""
                    : 'No listed career matches. Choose "Other career" to enter your own.'
            );
        } else {
            showMessage("");
        }
    }

    careerSearch?.addEventListener("input", filterCareers);

    /* CUSTOM CAREER */

    function updateCustomCareer() {
        if (!careerRole) return;

        const isOther = careerRole.value === "other";

        if (customCareerGroup) {
            customCareerGroup.hidden = !isOther;
        }

        if (customCareer) {
            customCareer.required = isOther;
            customCareer.disabled = !isOther;

            if (!isOther) customCareer.value = "";
        }
    }

    careerRole?.addEventListener("change", () => {
        updateCustomCareer();
        showMessage("");
    });

    updateCustomCareer();

    /* FORM SUBMISSION */

    careerForm.addEventListener("submit", event => {
        event.preventDefault();

        if (isSubmitting) return;

        showMessage("");

        const file = cvFile?.files?.[0] || selectedFile;
        const fileError = validateFile(file);

        if (fileError) {
            showMessage(fileError, "error");
            cvFile?.focus();
            return;
        }

        if (!careerRole?.value) {
            showMessage(
                "Please select the career you're interested in.",
                "error"
            );

            careerRole?.focus();
            return;
        }

        const role = careerRole.value;
        let roleName =
            careerRole.options[careerRole.selectedIndex].text.trim();

        if (role === "other") {
            roleName = customCareer?.value.trim() || "";

            if (!roleName) {
                showMessage("Please enter your preferred career.", "error");
                customCareer?.focus();
                return;
            }

            if (roleName.length > 120) {
                showMessage(
                    "Please keep your career title under 120 characters.",
                    "error"
                );

                customCareer?.focus();
                return;
            }
        }

        // Demo only: the CV stays on the user's device.
        // No account, server upload, or AI analysis is performed.

        const studentDetails = {
            role,
            roleName,
            fileName: file.name,
            fileSize: file.size,
            analysisStatus: "backend-not-connected"
        };

        try {
            sessionStorage.setItem(
                "careerPathStudent",
                JSON.stringify(studentDetails)
            );
        } catch {
            showMessage(
                "Your browser could not save the demo details. Please try again.",
                "error"
            );
            return;
        }

        const params = new URLSearchParams({
            role,
            roleName,
            fileName: file.name,
            demo: "true"
        });

        isSubmitting = true;

        if (analyzeButton) {
            analyzeButton.disabled = true;
            analyzeButton.textContent = "Opening demo results...";
        }

        window.location.href = `results.html?${params.toString()}`;
    });
});
