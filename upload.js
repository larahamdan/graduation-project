
const careerForm = document.getElementById("careerForm");
const cvFile = document.getElementById("cvFile");
const uploadArea = document.getElementById("uploadArea");
const uploadTitle = document.getElementById("uploadTitle");
const uploadDescription = document.getElementById("uploadDescription");
const formMessage = document.getElementById("uploadMessage");

const careerRole = document.getElementById("careerRole");
const careerSearch = document.getElementById("careerSearch");
const customCareerGroup = document.getElementById("customCareerGroup");
const customCareer = document.getElementById("customCareer");

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

let selectedFile = null;

function validateFile(file) {
    if (!file) return "Please choose your CV first.";

    const fileName = file.name.toLowerCase();

    if (!ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext))) {
        return "Please select a PDF or DOCX file.";
    }

    if (file.size > MAX_FILE_SIZE) {
        return "Your CV must be 5 MB or smaller.";
    }

    if (file.size === 0) {
        return "This file is empty. Please choose another one.";
    }

    return "";
}

function showMessage(message) {
    formMessage.textContent = message;
    formMessage.hidden = !message;
}

function showSelectedFile(file) {
    const error = validateFile(file);

    if (error) {
        selectedFile = null;
        cvFile.value = "";
        uploadTitle.textContent = "Choose your CV to get started";
        uploadDescription.textContent = error;
        showMessage(error);
        return;
    }

    selectedFile = file;
    uploadTitle.textContent = file.name;
    uploadDescription.textContent =
        `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;

    showMessage("");
}

cvFile.addEventListener("change", () => {
    const file = cvFile.files[0];
    if (file) showSelectedFile(file);
});

// Drag-and-drop support
uploadArea.addEventListener("dragover", event => {
    event.preventDefault();
    uploadArea.classList.add("dragging");
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", event => {
    event.preventDefault();
    uploadArea.classList.remove("dragging");

    const file = event.dataTransfer.files[0];
    if (!file) return;

    showSelectedFile(file);

    if (validateFile(file) === "") {
        try {
            const transfer = new DataTransfer();
            transfer.items.add(file);
            cvFile.files = transfer.files;
        } catch (error) {
            // Keep the selected file for demo validation.
        }
    }
});

// Search the available careers
careerSearch.addEventListener("input", () => {
    const searchTerm = careerSearch.value.trim().toLowerCase();
    let firstMatch = null;

    Array.from(careerRole.options).forEach(option => {
        if (!option.value || option.value === "other") return;

        const matches = option.text.toLowerCase().includes(searchTerm);

        if (searchTerm && matches && !firstMatch) {
            firstMatch = option;
        }
    });

    if (searchTerm && firstMatch) {
        careerRole.value = firstMatch.value;
    } else if (searchTerm) {
        careerRole.value = "other";
    }
});

// Show the custom career field when needed
careerRole.addEventListener("change", () => {
    const isOther = careerRole.value === "other";

    customCareerGroup.hidden = !isOther;
    customCareer.required = isOther;

    if (!isOther) customCareer.value = "";

    showMessage("");
});

// Validate and continue to the results page
careerForm.addEventListener("submit", event => {
    event.preventDefault();
    showMessage("");

    if (!selectedFile || validateFile(selectedFile)) {
        showMessage("Please choose a valid PDF or DOCX CV, up to 5 MB.");
        return;
    }

    const role = careerRole.value;

    if (!role) {
        showMessage("Please select the career you're interested in.");
        careerRole.focus();
        return;
    }

    let roleName = careerRole.options[careerRole.selectedIndex].text;

    if (role === "other") {
        roleName = customCareer.value.trim();

        if (!roleName) {
            showMessage("Please enter your preferred career.");
            customCareer.focus();
            return;
        }
    }

    // Demo only: the CV is not uploaded to a server yet.
    const studentDetails = {
        role,
        roleName,
        fileName: selectedFile.name,
        fileSize: selectedFile.size
    };

    sessionStorage.setItem(
        "careerPathStudent",
        JSON.stringify(studentDetails)
    );

    const params = new URLSearchParams({
        role,
        roleName,
        fileName: selectedFile.name
    });

    window.location.href = `results.html?${params.toString()}`;
});
