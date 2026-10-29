
import re

SKILLS = [
    "Python",
    "Java",
    "JavaScript",
    "SQL",
    "HTML",
    "CSS",
    "FastAPI",
    "Django",
    "React",
    "Git",
    "Docker",
    "MATLAB",
    "C++",
    "Machine Learning",
    "Data Analysis",
    "Statistics",
    
    # Programming and software development
    "Python",
    "Java",
    "JavaScript",
    "SQL",
    "HTML",
    "CSS",
    "FastAPI",
    "Django",
    "React",
    "Git",
    "Docker",
    "C++",

    # Data science and analytics
    "Machine Learning",
    "Data Analysis",
    "Statistics",

    # Electrical and electronics engineering
    "MATLAB",
    "Simulink",
    "Circuit Design",
    "Electronics",
    "PCB Design",
    "Arduino",
    "C Programming",
    "PLC",
    "Electrical Systems",
    "Control Systems",
    "AutoCAD",
]


EDUCATION = [
    "Computer Engineering",
    "Software Engineering",
    "Electrical Engineering",
    "Electrical and Electronic Engineering",
    "Computer Science",
    "Information Technology",
    "Business Administration",
]

EXPERIENCE = [
    # Software Development
    "Software Developer",
    "Software Engineer",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Web Developer",
    "Mobile App Developer",
    "Game Developer",
    "Application Developer",
    "QA Engineer",
    "Software Tester",
    "DevOps Engineer",

    # Data and Artificial Intelligence
    "Data Analyst",
    "Data Scientist",
    "Data Engineer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Business Intelligence Analyst",
    "Data Architect",
    "Research Scientist",

    # Cybersecurity and IT
    "Cybersecurity Analyst",
    "Security Engineer",
    "Network Engineer",
    "Network Administrator",
    "System Administrator",
    "IT Support Specialist",
    "Cloud Engineer",
    "Database Administrator",
    "IT Consultant",

    # Electrical and Electronics Engineering
    "Electrical Engineer",
    "Electronics Engineer",
    "Embedded Systems Engineer",
    "Automation Engineer",
    "Control Systems Engineer",
    "PLC Programmer",
    "Telecommunications Engineer",
    "Power Systems Engineer",
    "Hardware Engineer",
    "Robotics Engineer",

    # Other Engineering Fields
    "Mechanical Engineer",
    "Civil Engineer",
    "Industrial Engineer",
    "Manufacturing Engineer",
    "Production Engineer",
    "Quality Engineer",
    "Chemical Engineer",
    "Biomedical Engineer",
    "Environmental Engineer",

    # Business and Management
    "Business Analyst",
    "Project Manager",
    "Product Manager",
    "Operations Manager",
    "Business Development Specialist",
    "Management Consultant",
    "Human Resources Specialist",
    "Recruitment Specialist",
    "Administrative Assistant",

    # Finance and Accounting
    "Financial Analyst",
    "Accountant",
    "Financial Advisor",
    "Investment Analyst",
    "Risk Analyst",
    "Auditor",
    "Banking Specialist",
    "Economist",

    # Marketing and Design
    "Marketing Specialist",
    "Digital Marketing Specialist",
    "Social Media Manager",
    "SEO Specialist",
    "Content Creator",
    "Graphic Designer",
    "UI Designer",
    "UX Designer",
    "UX Researcher",

    # Healthcare and Science
    "Doctor",
    "Nurse",
    "Pharmacist",
    "Medical Laboratory Technician",
    "Biologist",
    "Chemist",
    "Research Assistant",

    # Education
    "Teacher",
    "Lecturer",
    "Teaching Assistant",
    "Academic Researcher",

    # Sales and Customer Service
    "Sales Representative",
    "Sales Manager",
    "Account Manager",
    "Customer Service Representative",
    "Customer Success Specialist",

    # Student and Entry-Level Experience
    "Intern",
    "Software Development Intern",
    "Engineering Intern",
    "Electrical Engineering Intern",
    "Data Science Intern",
    "Marketing Intern",
    "Finance Intern",
    "Research Intern",
    "Trainee",
    "Graduate Trainee",


]


def find_matches(text: str, keywords: list[str]) -> list[str]:
    matches = []

    for keyword in keywords:
        pattern = r"(?<!\w)" + re.escape(keyword) + r"(?!\w)"

        if re.search(pattern, text, re.IGNORECASE):
            matches.append(keyword)

    return matches



def analyze_cv(text: str) -> dict:
    detected_skills = find_matches(text, SKILLS)

    # Search for alternative skill names in the CV text
    for standard_name, aliases in SKILL_ALIASES.items():
        for alias in aliases:
            pattern = r"(?<!\w)" + re.escape(alias) + r"(?!\w)"

            if re.search(pattern, text, re.IGNORECASE):
                detected_skills.append(standard_name)
                break

    return {
        "skills": normalize_skills(detected_skills),
        "education": find_matches(text, EDUCATION),
        "experience": find_matches(text, EXPERIENCE),
    }


# Different names that refer to the same skill
SKILL_ALIASES = {
    "JavaScript": ["JavaScript", "JS"],
    "Python": ["Python", "Python 3"],
    "SQL": ["SQL", "PostgreSQL", "MySQL"],
    "Git": ["Git", "GitHub"],
    "React": ["React", "React.js", "ReactJS"],
    "FastAPI": ["FastAPI"],
    "Machine Learning": ["Machine Learning", "ML"],
    "Excel": ["Excel", "Microsoft Excel", "MS Excel"],
    "Power BI": ["Power BI", "PowerBI"],
    "Docker": ["Docker"]
}


def normalize_skills(skills: list[str]) -> list[str]:
    normalized = []
    seen = set()

    for skill in skills:
        if not isinstance(skill, str):
            continue

        cleaned = skill.strip()

        for standard_name, aliases in SKILL_ALIASES.items():
            if cleaned.casefold() in {
                alias.casefold() for alias in aliases
            }:
                cleaned = standard_name
                break

        key = cleaned.casefold()

        if cleaned and key not in seen:
            normalized.append(cleaned)
            seen.add(key)

    return normalized

