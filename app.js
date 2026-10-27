
/* ========================================
   CareerPath AI — Main JavaScript
   Homepage interactions only
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Highlight the active homepage section
    if (navLinks && "IntersectionObserver" in window) {
        const sections = document.querySelectorAll("main section[id]");

        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.querySelectorAll("a").forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${sectionId}`
                        );
                    });
                });
            },
            { rootMargin: "-25% 0px -60% 0px" }
        );

        sections.forEach(section => sectionObserver.observe(section));
    }

    // Optional start-button interaction
    const startButton = document.getElementById("startButton");
    const ctaMessage = document.getElementById("ctaMessage");

    if (startButton && ctaMessage) {
        startButton.addEventListener("click", () => {
            ctaMessage.textContent =
                "You're ready to take the next step. Let's build your career plan!";

            startButton.textContent = "Let's get started ✓";
        });
    }
});
