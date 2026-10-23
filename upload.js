
const careerForm = document.getElementById("careerForm");
const cvFile = document.getElementById("cvFile");
const uploadArea = document.getElementById("uploadArea");
const fileMessage = document.getElementById("fileMessage");
const formMessage = document.getElementById("formMessage");

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

let selectedFile = null;

function validateFile(file) {
  if (!file) {
    return "Please choose your CV first.";
  }

  const fileName = file.name.toLowerCase();
  const isAllowed = ALLOWED_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension)
  );

  if (!isAllowed) {
    return "Please select a PDF or DOCX file.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Your file is over 5 MB. Please choose a smaller CV.";
  }

  if (file.size === 0) {
    return "This file is empty. Please choose another one.";
  }

  return "";
}

function showSelectedFile(file) {
  const error = validateFile(file);

  if (error) {
    selectedFile = null;
    cvFile.value = "";
    fileMessage.textContent = error;
    formMessage.textContent = "";
    return;
  }

  selectedFile = file;
  fileMessage.textContent =
    `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;

  formMessage.textContent = "";
}

cvFile.addEventListener("change", () => {
  const file = cvFile.files[0];

  if (file) {
    showSelectedFile(file);
  }
});

// Drag-and-drop support
uploadArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadArea.classList.add("dragging");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadArea.classList.remove("dragging");

  const file = event.dataTransfer.files[0];

  if (!file) {
    return;
  }

  showSelectedFile(file);
});

// Form validation
careerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const role = document.getElementById("careerRole").value;
  const experience = document.getElementById("experience").value;
  const consent = document.getElementById("consent").checked;

  if (!name || !role || !experience) {
    formMessage.textContent = "Please complete your details first.";
    return;
  }

  if (!selectedFile) {
    formMessage.textContent =
      "We need your CV to continue. Choose a PDF or DOCX file.";
    return;
  }

  const fileError = validateFile(selectedFile);

  if (fileError) {
    formMessage.textContent = fileError;
    return;
  }

  if (!consent) {
    formMessage.textContent =
      "Please confirm that you agree to use your CV for career analysis.";
    return;
  }

  // Demo only: no CV is sent to a server at this stage.
  // The backend will be connected in a later step.
  const studentDetails = {
    name,
    role,
    experience,
    fileName: selectedFile.name
  };

  sessionStorage.setItem(
    "careerPathStudent",
    JSON.stringify(studentDetails)
  );

  const params = new URLSearchParams({
    name,
    role,
    experience
  });

  window.location.href = `results.html?${params.toString()}`;
});
