
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const savedDetails = sessionStorage.getItem("careerPathStudent");

    const cvFileName = document.getElementById("cvFileName");
    const cvFileStatus = document.getElementById("cvFileStatus");
    const dashboardSkills = document.getElementById("dashboardSkills");
    const dashboardRoadmap = document.getElementById("dashboardRoadmap");
   const dashboardSkillGaps = document.getElementById("dashboardSkillGaps");


    if (!savedDetails) {
        return;
    }

    let studentDetails;

    try {
        studentDetails = JSON.parse(savedDetails);
    } catch (error) {
        console.error("Could not read saved career details:", error);
        return;
    }

    const roleName = studentDetails.roleName || "Your chosen career";
    const title = roleName.toLowerCase();

   
const targetRole = document.getElementById("targetRole");
const targetRoleDescription = document.getElementById(
    "targetRoleDescription"
);

if (targetRole) {
    targetRole.textContent = roleName;
}

if (targetRoleDescription) {
    targetRoleDescription.textContent = "Your selected career goal";
}


    // Update the CV details.
    if (cvFileName && studentDetails.fileName) {
        cvFileName.textContent = studentDetails.fileName;
    }

    if (cvFileStatus && studentDetails.fileName) {
        cvFileStatus.textContent = "CV selected in this browser session";
    }

    const uploadButton = document.querySelector(
        ".welcome-section .dashboard-button"
    );

    if (uploadButton) {
        uploadButton.textContent = "Update your career plan";
    }

    // Suggested skills for the selected career.
    let skills;

    if (title.includes("data analyst")) {
        skills = [
            ["Excel & Spreadsheets", "Organise data and use formulas."],
            ["SQL", "Retrieve and filter information from databases."],
            ["Data Visualisation", "Present findings with charts and dashboards."]
        ];
    } else if (title.includes("designer")) {
        skills = [
            ["Design Fundamentals", "Learn layout, colour and typography."],
            ["Wireframes & Prototypes", "Turn ideas into visual designs."],
            ["User Feedback", "Test designs and improve usability."]
        ];
    } else if (
        title.includes("lawyer") ||
        title.includes("legal") ||
        title.includes("paralegal")
    ) {
        skills = [
            ["Legal Research", "Find relevant laws and reliable sources."],
            ["Legal Writing", "Practise clear case summaries and arguments."],
            ["Critical Thinking", "Analyse facts and compare arguments."]
        ];
    } else if (
        title.includes("cybersecurity") ||
        title.includes("penetration") ||
        title.includes("digital forensics")
    ) {
        skills = [
            ["Networking Basics", "Understand IP addresses and network communication."],
            ["Linux", "Practise commands and system permissions."],
            ["Security Fundamentals", "Learn defensive security in authorised labs."]
        ];
    } else if (title.includes("data") || title.includes("analytics")) {
        skills = [
            ["Data Analysis", "Learn to interpret information and identify patterns."],
            ["Technical Tools", "Practise relevant software and analytical methods."],
            ["Reporting", "Explain findings clearly using evidence."]
        ];
    } else if (title.includes("engineer") || title.includes("developer")) {
        skills = [
            ["Technical Foundations", "Learn the core concepts of your field."],
            ["Practical Projects", "Apply your knowledge to a small project."],
            ["Tools & Documentation", "Practise professional tools and document your work."]
        ];
    } else {
        skills = [
            ["Core Knowledge", "Learn the essential concepts for your chosen career."],
            ["Practical Skills", "Practise relevant tools and techniques."],
            ["Communication", "Explain your work and collaborate effectively."]
        ];
    }

    if (dashboardSkills) {
        dashboardSkills.replaceChildren();

        skills.forEach(function (skill) {
            const card = document.createElement("div");
            card.className = "dashboard-skill-item";

            const heading = document.createElement("h3");
            heading.textContent = skill[0];

            const description = document.createElement("p");
            description.textContent = skill[1];

            const note = document.createElement("span");
            note.textContent = "Suggested learning focus";

            card.append(heading, description, note);
            dashboardSkills.appendChild(card);
        });
    }

    
    // Suggested development areas for the selected career.
    const gapSuggestions = title.includes("data analyst")
        ? [
            ["SQL and Databases", "Practise querying, filtering and joining data."],
            ["Data Visualisation", "Learn to communicate findings through charts."],
            ["Spreadsheet Analysis", "Practise formulas, cleaning and organising data."]
        ]
        : title.includes("designer")
        ? [
            ["Design Fundamentals", "Practise layout, typography and visual hierarchy."],
            ["Prototyping", "Create interactive designs and test user journeys."],
            ["Usability Testing", "Learn to gather feedback and improve designs."]
        ]
        : title.includes("lawyer") || title.includes("legal")
        ? [
            ["Legal Research", "Practise finding relevant laws and reliable sources."],
            ["Legal Writing", "Develop clear, structured legal arguments."],
            ["Case Analysis", "Practise comparing facts and evaluating arguments."]
        ]
        : title.includes("cybersecurity")
        ? [
            ["Networking", "Build an understanding of network communication."],
            ["Linux Fundamentals", "Practise commands and permissions in a safe lab."],
            ["Security Principles", "Study defensive security and risk management."]
        ]
        : [
            ["Technical Foundations", "Strengthen the essential knowledge for your chosen field."],
            ["Practical Experience", "Build a small project or complete a relevant exercise."],
            ["Portfolio Development", "Document your work and explain what you learned."]
        ];

    if (dashboardSkillGaps) {
        dashboardSkillGaps.replaceChildren();

        gapSuggestions.forEach(function (gap) {
            const item = document.createElement("div");
            item.className = "skill-gap-item";

            const heading = document.createElement("h3");
            heading.textContent = gap[0];

            const description = document.createElement("p");
            description.textContent = gap[1];

            const label = document.createElement("span");
            label.className = "skill-gap-label";
            label.textContent = "Suggested development area";

            item.append(heading, description, label);
            dashboardSkillGaps.appendChild(item);
        });
    }
// Suggested learning roadmap.
    let steps;

    if (title.includes("data analyst")) {
        steps = [
            ["Learn spreadsheet skills", "Practise formulas and clean sample data."],
            ["Learn SQL", "Use queries to filter and analyse information."],
            ["Build a data project", "Create a simple dashboard and explain your findings."]
        ];
    } else if (title.includes("designer")) {
        steps = [
            ["Learn design fundamentals", "Study layout, typography and visual hierarchy."],
            ["Create a design project", "Build a wireframe or prototype."],
            ["Build your portfolio", "Present your design process and final work."]
        ];
    } else {
        steps = [
            ["Learn the fundamentals", "Study essential skills for " + roleName + "."],
            ["Practise your skills", "Complete exercises related to your chosen career."],
            ["Build your portfolio", "Document a practical project and what you learned."]
        ];
    }

if (dashboardRoadmap) {
    dashboardRoadmap.replaceChildren();

    const progressKey = "careerPathProgress_" + title;
    let completedSteps = [];

    try {
        completedSteps = JSON.parse(
            localStorage.getItem(progressKey) || "[]"
        );
        if (!Array.isArray(completedSteps)) {
            completedSteps = [];
        }
    } catch (error) {
        completedSteps = [];
    }

    const progressText = document.getElementById("roadmapProgressText");
    const progressBar = document.getElementById("roadmapProgressBar");
    const progressFill = document.getElementById("roadmapProgressFill");
    const progressHelp = document.getElementById("roadmapProgressHelp");

    function updateProgress() {
        const total = steps.length;
        const completed = completedSteps.length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        if (progressText) {
            progressText.textContent = percentage + "% complete";
        }

        if (progressFill) {
            progressFill.style.width = percentage + "%";
        }

        if (progressBar) {
            progressBar.setAttribute("aria-valuenow", String(percentage));
        }

        if (progressHelp) {
            progressHelp.textContent = completed === total
                ? "Amazing work! You've completed this learning roadmap."
                : completed + " of " + total + " learning steps completed.";
        }

        try {
            localStorage.setItem(progressKey, JSON.stringify(completedSteps));
        } catch (error) {
            console.warn("Could not save roadmap progress.", error);
        }
    }

    steps.forEach(function (step, index) {
        const item = document.createElement("div");
        item.className = "roadmap-step";

        const number = document.createElement("span");
        number.className = "step-number";
        number.textContent = String(index + 1);

        const content = document.createElement("div");
        content.className = "roadmap-step-content";

        const heading = document.createElement("h3");
        heading.textContent = step[0];

        const description = document.createElement("p");
        description.textContent = step[1];

        content.append(heading, description);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "roadmap-checkbox";
        checkbox.checked = completedSteps.includes(index);
        checkbox.setAttribute("aria-label", "Mark " + step[0] + " as completed");

        if (checkbox.checked) {
            item.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                if (!completedSteps.includes(index)) {
                    completedSteps.push(index);
                }
                item.classList.add("completed");
            } else {
                completedSteps = completedSteps.filter(function (stepIndex) {
                    return stepIndex !== index;
                });
                item.classList.remove("completed");
            }

            updateProgress();
        });

        item.append(number, content, checkbox);
        dashboardRoadmap.appendChild(item);
    });

    updateProgress();
}
});