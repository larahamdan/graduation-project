
/* ========================================
   CareerPath AI — Main JavaScript
   Homepage navigation + CV upload
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Elements used by the homepage
  const startButton = document.getElementById("startButton");
  const ctaMessage = document.getElementById("ctaMessage");

  // Navigation elements (if present on this page)
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile navigation after selecting a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Highlight the active homepage section
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const sectionId = entry.target.id;

            navLinks.querySelectorAll("a").forEach((link) => {
              const href = link.getAttribute("href");
              const isActive = href === `#${sectionId}`;

              link.classList.toggle("active", isActive);
            });
          });
        },
        { rootMargin: "-25% 0px -60% 0px" }
      );

      sections.forEach((section) => {
        sectionObserver.observe(section);
      });
    }
  }

  // Friendly homepage start button
  if (startButton && ctaMessage) {
    startButton.addEventListener("click", () => {
      ctaMessage.textContent =
        "You're ready to take the next step. Let's build your career plan!";

      startButton.textContent = "Let's get started ✓";
      startButton.setAttribute("aria-live", "polite");
    });
  }

  // CV upload page
  const careerForm = document.getElementById("careerForm");

  if (careerForm) {
    const cvFile = document.getElementById("cvFile");
    const uploadArea = document.getElementById("uploadArea");
    const uploadTitle = document.getElementById("uploadTitle");
    const uploadDescription =
      document.getElementById("uploadDescription");
    const uploadMessage = document.getElementById("uploadMessage");
    const analyzeButton = document.getElementById("analyzeButton");

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

    function showMessage(message, type = "info") {
      if (!uploadMessage) return;

      uploadMessage.textContent = message;
      uploadMessage.hidden = false;

      uploadMessage.classList.remove(
        "alert-success",
        "alert-error"
      );

      if (type === "success") {
        uploadMessage.classList.add("alert-success");
      } else if (type === "error") {
        uploadMessage.classList.add("alert-error");
      }
    }

    function validateFile(file) {
      if (!file) {
        return "Please choose your CV before continuing.";
      }

      const fileName = file.name.toLowerCase();
      const isAllowed = ALLOWED_EXTENSIONS.some((extension) =>
        fileName.endsWith(extension)
      );

      if (!isAllowed) {
        return "Please upload your CV as a PDF or DOCX file.";
      }

      if (file.size > MAX_FILE_SIZE) {
        return "Your file is too large. Please choose a file under 5 MB.";
      }

      if (file.size === 0) {
        return "This file appears to be empty. Please choose another file.";
      }

      return "";
    }

    function updateSelectedFile() {
      const file = cvFile?.files?.[0];

      if (!file) return;

      const error = validateFile(file);

      if (error) {
        showMessage(error, "error");
        cvFile.value = "";
        return;
      }

      if (uploadTitle) {
        uploadTitle.textContent = file.name;
      }

      if (uploadDescription) {
        const sizeInKB = Math.max(1, Math.round(file.size / 1024));
        uploadDescription.textContent =
          `${sizeInKB} KB · Ready to upload`;
      }

      showMessage(
        "Your CV is selected. Choose your target career to continue.",
        "success"
      );
    }

    if (cvFile) {
      cvFile.addEventListener("change", updateSelectedFile);
    }

    // Support drag-and-drop file selection
    if (uploadArea && cvFile) {
      ["dragenter", "dragover"].forEach((eventName) => {
        uploadArea.addEventListener(eventName, (event) => {
          event.preventDefault();
          uploadArea.classList.add("dragover");
        });
      });

      ["dragleave", "drop"].forEach((eventName) => {
        uploadArea.addEventListener(eventName, (event) => {
          event.preventDefault();
          uploadArea.classList.remove("dragover");
        });
      });

      uploadArea.addEventListener("drop", (event) => {
        const files = event.dataTransfer?.files;

        if (!files || files.length === 0) return;

        try {
          const transfer = new DataTransfer();
          transfer.items.add(files[0]);
          cvFile.files = transfer.files;
          updateSelectedFile();
        } catch {
          showMessage(
            "Please use Browse files to select your CV.",
            "error"
          );
        }
      });
    }

    // Validate the form before submitting
    careerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const file = cvFile?.files?.[0];
      const fileError = validateFile(file);
      const careerRole = document.getElementById("careerRole");

      if (fileError) {
        showMessage(fileError, "error");
        return;
      }

      if (!careerRole || !careerRole.value) {
        showMessage(
          "Please choose the career you'd like to work towards.",
          "error"
        );
        careerRole?.focus();
        return;
      }

      /*
       * The frontend is ready, but actual CV analysis requires
       * a working backend endpoint.
       *
       * Do not display fake analysis results or claim that the
       * CV has been analysed until the backend is connected.
       */

      showMessage(
        "Your CV and career choice are ready. The next step is to connect the analysis backend.",
        "info"
      );
    });
  }
});

  // Career search and custom career selection
  const careerSearch = document.getElementById("careerSearch");
  const careerRole = document.getElementById("careerRole");
  const customCareerGroup = document.getElementById("customCareerGroup");
  const customCareer = document.getElementById("customCareer");

  if (careerRole) {
    function updateCustomCareer() {
      const isOther = careerRole.value === "other";

      if (customCareerGroup) {
        customCareerGroup.hidden = !isOther;
      }

      if (customCareer) {
        customCareer.required = isOther;

        if (!isOther) {
          customCareer.value = "";
        }
      }
    }

    careerRole.addEventListener("change", updateCustomCareer);
    updateCustomCareer();
  }

  if (careerSearch && careerRole) {
    careerSearch.addEventListener("input", () => {
      const query = careerSearch.value.trim().toLowerCase();
      const options = Array.from(careerRole.options);

      // Show matching careers without changing the original option values.
      options.forEach((option) => {
        if (!option.value) {
          option.hidden = false;
          return;
        }

        const matches =
          option.textContent.toLowerCase().includes(query);

        option.hidden = query !== "" && !matches;
      });

      // Hide category headings when none of their careers match.
      Array.from(careerRole.querySelectorAll("optgroup")).forEach((group) => {
        const hasMatch = Array.from(group.options).some(
          (option) => !option.hidden
        );

        group.hidden = query !== "" && !hasMatch;
      });
    });
  }
