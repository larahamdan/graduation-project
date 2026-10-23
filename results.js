
const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const role = params.get("role");
const experience = params.get("experience");

const roleNames = {
  frontend: "Frontend Developer",
  data: "Data Analyst",
  cybersecurity: "Cybersecurity Engineer",
  backend: "Backend Developer",
  software: "Software Engineer",
  uiux: "UI/UX Designer"
};

const experienceNames = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
};

const selectedRole = roleNames[role] || "Frontend Developer";
const selectedExperience = experienceNames[experience] || "Beginner";

document.getElementById("careerTitle").textContent = selectedRole;

document.getElementById("experienceText").textContent =
  `${selectedExperience} level · Your career journey starts here`;

document.getElementById("welcomeText").textContent = name
  ? `Hey ${name}! Let's turn your career goals into a plan you can actually follow.`
  : "Let's turn your career goals into a plan you can actually follow.";
