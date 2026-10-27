
"use strict";

/* ========================================
   CareerPath AI — Dashboard
   Frontend demo — AI/backend not connected
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Safely read saved career information.
    function readSessionData(key) {
        try {
            const value = sessionStorage.getItem(key);

            if (!value) return {};

            const parsed = JSON.parse(value);

            return parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
                ? parsed
                : {};
        } catch (error) {
            console.warn("Could not read session data:", error);
            return {};
        }
    }

    const studentDetails = readSessionData("careerPathStudent");

    // Safely read and write local storage.
    function readProgress(key, totalSteps) {
        try {
            const saved = JSON.parse(localStorage.getItem(key) || "[]");

            if (!Array.isArray(saved)) return [];

            return [...new Set(saved)].filter(
                (index) =>
                    Number.isInteger(index) &&
                    index >= 0 &&
                    index < totalSteps
            );
        } catch (error) {
            console.warn("Could not read roadmap progress:", error);
            return [];
        }
    }

    function saveProgress(key, progress) {
        try {
            localStorage.setItem(key, JSON.stringify(progress));
            return true;
        } catch (error) {
            console.warn("Could not save roadmap progress:", error);
            return false;
        }
    }

    // Dashboard elements.
    const targetRole = document.getElementById("targetRole");
    const targetRoleDescription = document.getElementById(
        "targetRoleDescription"
    );
    const cvFileName = document.getElementById("cvFileName");
    const cvFileStatus = document.getElementById("cvFileStatus");

    const skillMatchValue = document.getElementById("skillMatchValue");
    const skillMatchProgress = document.getElementById("skillMatchProgress");
    const skillMatchDescription = document.getElementById(
        "skillMatchDescription"
    );

    const dashboardSkills = document.getElementById("dashboardSkills");
    const dashboardSkillGaps = document.getElementById(
        "dashboardSkillGaps"
    );
    const dashboardRoadmap = document.getElementById("dashboardRoadmap");

    const progressText = document.getElementById("roadmapProgressText");
    const progressBar = document.getElementById("roadmapProgressBar");
    const progressFill = document.getElementById("roadmapProgressFill");
    const progressHelp = document.getElementById("roadmapProgressHelp");

    // Resolve the selected career.
    const roleName =
        typeof studentDetails.roleName === "string" &&
        studentDetails.roleName.trim()
            ? studentDetails.roleName.trim()
            : "Your chosen career";

    const career = roleName.toLowerCase();
    const hasSelectedRole =
        roleName !== "Your chosen career";

    const fileName =
        typeof studentDetails.fileName === "string"
            ? studentDetails.fileName.trim()
            : "";

    // Update career overview.
    if (targetRole) {
        targetRole.textContent = roleName;
    }

    if (targetRoleDescription) {
        targetRoleDescription.textContent = hasSelectedRole
            ? "Your selected career goal"
            : "Choose a career to start exploring your options.";
    }

    // A selected file is not the same as a backend upload.
    if (cvFileName) {
        cvFileName.textContent = fileName || "No CV selected";
        cvFileName.title = fileName || "";
    }

    if (cvFileStatus) {
        cvFileStatus.textContent = fileName
            ? "Selected in this browser session — not uploaded to a server"
            : "Choose a career and select your CV to get started.";
    }

    const uploadButton = document.querySelector(
        ".welcome-section .dashboard-button"
    );

    if (uploadButton) {
        uploadButton.textContent = hasSelectedRole
            ? "Update your career plan"
            : "Start your career plan";
    }

    // Keep the skill match honest until AI analysis exists.
    if (skillMatchValue) {
        skillMatchValue.textContent = "—";
    }

    if (skillMatchProgress) {
        skillMatchProgress.style.width = "0%";
    }

    const matchTrack = document.querySelector(
        ".skill-match-card [role='progressbar']"
    );

    if (matchTrack) {
        matchTrack.setAttribute("aria-valuenow", "0");
        matchTrack.setAttribute(
            "aria-label",
            "Skill match analysis is not available yet"
        );
    }

    if (skillMatchDescription) {
        skillMatchDescription.textContent =
            "No score is available yet. A real score requires CV processing and AI integration.";
    }

    // ----------------------------------------
    // Career learning suggestions
    // These are templates, not AI findings.
    // ----------------------------------------

    function getCareerPlan(name) {
        if (
            name.includes("data analyst") ||
            name.includes("data scientist") ||
            name.includes("business intelligence") ||
            name.includes("business analyst")
        ) {
            return {
                skills: [
                    ["Data Analysis", "Learn to clean, interpret and analyse datasets."],
                    ["SQL & Databases", "Practise querying, filtering and joining data."],
                    ["Data Visualisation", "Present findings through charts and dashboards."]
                ],
                gaps: [
                    ["Spreadsheet Skills", "Practise formulas, data cleaning and organisation."],
                    ["SQL Practice", "Work with sample databases and real queries."],
                    ["Reporting & Insights", "Explain what data shows and why it matters."]
                ],
                roadmap: [
                    ["Learn data fundamentals", "Practise organising data, formulas and basic analysis."],
                    ["Develop SQL and visualisation skills", "Query sample data and create clear charts."],
                    ["Build a data portfolio project", "Analyse a dataset and present your findings."]
                ]
            };
        }

        if (
            name.includes("designer") ||
            name.includes("ui/ux") ||
            name.includes("ux") ||
            name.includes("user experience") ||
            name.includes("user interface")
        ) {
            return {
                skills: [
                    ["Design Fundamentals", "Learn layout, colour, typography and visual hierarchy."],
                    ["Wireframes & Prototypes", "Turn ideas into user journeys and interactive designs."],
                    ["Usability Testing", "Gather feedback and improve the user experience."]
                ],
                gaps: [
                    ["Visual Design", "Practise consistent spacing, typography and layouts."],
                    ["Prototyping", "Create and test interactive screen designs."],
                    ["Portfolio Case Studies", "Explain the problem, design process and final outcome."]
                ],
                roadmap: [
                    ["Learn design fundamentals", "Study layout, typography, colour and accessibility."],
                    ["Design and test a product", "Create wireframes, a prototype and a user journey."],
                    ["Build a portfolio case study", "Document your decisions, feedback and improvements."]
                ]
            };
        }

        if (
            name.includes("cybersecurity") ||
            name.includes("penetration") ||
            name.includes("digital forensics") ||
            name.includes("information security") ||
            name.includes("security analyst")
        ) {
            return {
                skills: [
                    ["Networking Fundamentals", "Understand IP addresses, ports and network communication."],
                    ["Linux & Operating Systems", "Practise commands, permissions and system basics."],
                    ["Security Fundamentals", "Learn defensive security and risk management."]
                ],
                gaps: [
                    ["Networking", "Practise networking concepts and troubleshooting."],
                    ["Security Tools", "Explore defensive tools in authorised lab environments."],
                    ["Incident Response", "Learn to document and investigate security events."]
                ],
                roadmap: [
                    ["Learn networking and operating systems", "Practise networking concepts and basic Linux commands."],
                    ["Complete safe security labs", "Explore defensive security in authorised environments."],
                    ["Document a security project", "Explain the setup, findings and defensive recommendations."]
                ]
            };
        }

        if (
            name.includes("lawyer") ||
            name.includes("legal") ||
            name.includes("paralegal") ||
            name.includes("solicitor") ||
            name.includes("barrister")
        ) {
            return {
                skills: [
                    ["Legal Research", "Find relevant laws, cases and reliable sources."],
                    ["Legal Writing", "Practise clear case summaries and structured arguments."],
                    ["Critical Thinking", "Analyse facts and compare competing arguments."]
                ],
                gaps: [
                    ["Legal Research", "Practise finding and evaluating relevant sources."],
                    ["Writing & Analysis", "Develop clear, evidence-based written arguments."],
                    ["Case Preparation", "Practise summarising facts, issues and possible arguments."]
                ],
                roadmap: [
                    ["Strengthen legal research skills", "Study relevant sources and practise case summaries."],
                    ["Practise legal writing and analysis", "Structure arguments and evaluate evidence."],
                    ["Create a legal research portfolio", "Document suitable academic research and writing samples."]
                ]
            };
        }

        if (
            name.includes("software") ||
            name.includes("developer") ||
            name.includes("programmer") ||
            name.includes("web development") ||
            name.includes("frontend") ||
            name.includes("front-end") ||
            name.includes("backend") ||
            name.includes("back-end") ||
            name.includes("app development")
        ) {
            return {
                skills: [
                    ["Programming Fundamentals", "Strengthen problem-solving and core programming concepts."],
                    ["Development Tools", "Practise Git, debugging and development workflows."],
                    ["Project Development", "Build, test and document a working application."]
                ],
                gaps: [
                    ["Core Technical Skills", "Strengthen languages and frameworks used in your target role."],
                    ["Testing & Debugging", "Practise finding, fixing and preventing errors."],
                    ["Portfolio Projects", "Build projects that demonstrate your skills and decisions."]
                ],
                roadmap: [
                    ["Strengthen your technical foundations", "Practise programming, problem-solving and version control."],
                    ["Build a practical application", "Create a project with clear features and test your work."],
                    ["Publish and document your project", "Prepare a portfolio entry explaining your contribution."]
                ]
            };
        }

        if (
            name.includes("marketing") ||
            name.includes("social media") ||
            name.includes("content creator") ||
            name.includes("public relations") ||
            name.includes("communications")
        ) {
            return {
                skills: [
                    ["Audience Research", "Understand audiences, needs and customer behaviour."],
                    ["Content Strategy", "Plan relevant content for different channels."],
                    ["Campaign Analytics", "Measure results and identify opportunities to improve."]
                ],
                gaps: [
                    ["Content Planning", "Practise creating a consistent content calendar."],
                    ["Digital Tools", "Explore relevant publishing and analytics tools."],
                    ["Performance Reporting", "Use campaign data to explain results and next steps."]
                ],
                roadmap: [
                    ["Learn audience and content research", "Define an audience and plan content around its needs."],
                    ["Create a sample campaign", "Prepare campaign content for a chosen brand or cause."],
                    ["Measure and present results", "Build a sample report using clear performance measures."]
                ]
            };
        }

        if (
            name.includes("finance") ||
            name.includes("accountant") ||
            name.includes("accounting") ||
            name.includes("banking") ||
            name.includes("investment") ||
            name.includes("economist")
        ) {
            return {
                skills: [
                    ["Financial Fundamentals", "Understand financial statements and key concepts."],
                    ["Spreadsheet Analysis", "Practise calculations, formulas and financial models."],
                    ["Accuracy & Reporting", "Present numerical information clearly and carefully."]
                ],
                gaps: [
                    ["Financial Analysis", "Practise interpreting financial data and statements."],
                    ["Spreadsheet Tools", "Build confidence with formulas and structured worksheets."],
                    ["Reporting", "Summarise results and explain your assumptions."]
                ],
                roadmap: [
                    ["Learn financial fundamentals", "Study relevant accounting, finance or banking concepts."],
                    ["Practise spreadsheet analysis", "Work with sample financial data and calculations."],
                    ["Complete a sample case study", "Analyse a suitable example and present your findings."]
                ]
            };
        }

        if (name.includes("engineer") || name.includes("engineering")) {
            return {
                skills: [
                    ["Technical Foundations", "Strengthen the core principles of your engineering field."],
                    ["Problem-Solving", "Practise breaking complex problems into manageable steps."],
                    ["Technical Documentation", "Record methods, results and design decisions clearly."]
                ],
                gaps: [
                    ["Core Technical Knowledge", "Identify and revise essential concepts for your specialism."],
                    ["Practical Application", "Apply theory to a suitable project or exercise."],
                    ["Technical Communication", "Explain your process, results and recommendations."]
                ],
                roadmap: [
                    ["Review core engineering concepts", "Identify essential knowledge and practise relevant exercises."],
                    ["Complete a practical project", "Apply your knowledge to a project suitable for your field."],
                    ["Document your work", "Present your approach, results and lessons learned."]
                ]
            };
        }

        if (
            name.includes("teacher") ||
            name.includes("education") ||
            name.includes("lecturer") ||
            name.includes("tutor")
        ) {
            return {
                skills: [
                    ["Subject Knowledge", "Strengthen your understanding of the subject you teach."],
                    ["Lesson Planning", "Organise learning objectives, activities and assessments."],
                    ["Communication", "Practise explaining ideas clearly to different learners."]
                ],
                gaps: [
                    ["Lesson Design", "Create structured lessons with measurable objectives."],
                    ["Assessment", "Practise checking understanding and giving useful feedback."],
                    ["Learner Engagement", "Explore ways to support different learning needs."]
                ],
                roadmap: [
                    ["Strengthen teaching foundations", "Review core concepts and effective teaching approaches."],
                    ["Prepare a learning resource", "Create learning objectives, activities and an assessment."],
                    ["Gather feedback and reflect", "Review your resource and identify improvements."]
                ]
            };
        }

        if (
            name.includes("health") ||
            name.includes("nurse") ||
            name.includes("doctor") ||
            name.includes("medical") ||
            name.includes("pharmac")
        ) {
            return {
                skills: [
                    ["Core Professional Knowledge", "Study foundational concepts relevant to your chosen role."],
                    ["Communication", "Practise clear, respectful and professional communication."],
                    ["Ethics & Safety", "Understand the importance of ethical practice and safety."]
                ],
                gaps: [
                    ["Subject Knowledge", "Identify core knowledge expected in your chosen specialism."],
                    ["Professional Communication", "Practise clear and respectful communication."],
                    ["Ethics & Safety", "Review applicable professional standards and safety principles."]
                ],
                roadmap: [
                    ["Review professional foundations", "Study essential concepts and standards for your role."],
                    ["Practise through appropriate learning activities", "Use supervised training or approved learning resources where relevant."],
                    ["Review professional requirements", "Identify qualifications and standards relevant to your location."]
                ]
            };
        }

        return {
            skills: [
                ["Core Knowledge", "Learn the essential concepts for your chosen career."],
                ["Practical Skills", "Practise relevant tools, methods and techniques."],
                ["Communication & Collaboration", "Learn to explain your work and collaborate effectively."]
            ],
            gaps: [
                ["Career Fundamentals", "Identify the knowledge and skills commonly required in your target role."],
                ["Practical Experience", "Complete an exercise, project or relevant learning activity."],
                ["Professional Development", "Document your work and identify your next learning goals."]
            ],
            roadmap: [
                ["Learn the fundamentals", "Study essential skills and knowledge for " + name + "."],
                ["Practise your skills", "Complete an exercise or project related to your chosen career."],
                ["Build your portfolio", "Document a practical project and what you learned."]
            ]
        };
    }

    const careerPlan = getCareerPlan(career);

    // Render suggestion cards using textContent for safe output.
    function renderCards(container, items, className, labelText) {
        if (!container) return;

        container.replaceChildren();

        items.forEach(([headingText, descriptionText]) => {
            const card = document.createElement("div");
            card.className = className;

            const heading = document.createElement("h3");
            heading.textContent = headingText;

            const description = document.createElement("p");
            description.textContent = descriptionText;

            const label = document.createElement("span");
            label.textContent = labelText;

            card.append(heading, description, label);
            container.appendChild(card);
        });
    }

    renderCards(
        dashboardSkills,
        careerPlan.skills,
        "dashboard-skill-item",
        "Suggested learning focus"
    );

    renderCards(
        dashboardSkillGaps,
        careerPlan.gaps,
        "skill-gap-item",
        "Suggested development area — not AI detected"
    );

    // Roadmap progress is stored separately for each career.
    if (!dashboardRoadmap) return;

    dashboardRoadmap.replaceChildren();

    const progressKey =
        "careerPathProgress_" +
        career.replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

    let completedSteps = readProgress(
        progressKey,
        careerPlan.roadmap.length
    );

    function updateProgress() {
        const total = careerPlan.roadmap.length;
        const completed = completedSteps.length;
        const percentage = total
            ? Math.round((completed / total) * 100)
            : 0;

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
                ? "Great work! You've completed all the steps in this suggested roadmap."
                : completed + " of " + total + " learning steps completed.";
        }

        saveProgress(progressKey, completedSteps);
    }

    careerPlan.roadmap.forEach(([stepTitle, stepDescription], index) => {
        const item = document.createElement("div");
        item.className = "roadmap-step";

        const number = document.createElement("span");
        number.className = "step-number";
        number.textContent = String(index + 1);
        number.setAttribute("aria-hidden", "true");

        const content = document.createElement("div");
        content.className = "roadmap-step-content";

        const heading = document.createElement("h3");
        heading.textContent = stepTitle;

        const description = document.createElement("p");
        description.textContent = stepDescription;

        content.append(heading, description);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "roadmap-checkbox";
        checkbox.checked = completedSteps.includes(index);
        checkbox.setAttribute(
            "aria-label",
            "Mark " + stepTitle + " as completed"
        );

        if (checkbox.checked) {
            item.classList.add("completed");
        }

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                if (!completedSteps.includes(index)) {
                    completedSteps.push(index);
                }
                item.classList.add("completed");
            } else {
                completedSteps = completedSteps.filter(
                    (savedIndex) => savedIndex !== index
                );
                item.classList.remove("completed");
            }

            updateProgress();
        });

        item.append(number, content, checkbox);
        dashboardRoadmap.appendChild(item);
    });

    updateProgress();

    // Keep the dashboard's status honest.
    const dashboardNote = document.querySelector(".dashboard-note");

    if (dashboardNote) {
        dashboardNote.setAttribute("role", "note");
    }
});
