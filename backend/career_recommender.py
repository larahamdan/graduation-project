
# CareerPath AI - Career Recommendation System

CAREER_ROLES = {
    "Backend Developer": [
        "Python", "SQL", "FastAPI", "Git", "Docker"
    ],

    "Frontend Developer": [
        "HTML", "CSS", "JavaScript", "React", "Git"
    ],

    "Full Stack Developer": [
        "Python", "SQL", "HTML", "CSS",
        "JavaScript", "React", "Git"
    ],

    "Data Analyst": [
        "Python", "SQL", "Excel", "Power BI",
        "Data Analysis"
    ],

    "Data Scientist": [
        "Python", "SQL", "Machine Learning",
        "Statistics", "Data Analysis"
    ],

    "Machine Learning Engineer": [
        "Python", "Machine Learning", "TensorFlow",
        "PyTorch", "Git"
    ],

    "Cybersecurity Analyst": [
        "Python", "Linux", "Networking",
        "Cybersecurity", "Wireshark"
    ],

    "DevOps Engineer": [
        "Python", "Linux", "Docker",
        "Git", "Kubernetes"
    ],

    "Embedded Systems Engineer": [
        "C", "C++", "Python", "Microcontrollers",
        "Embedded Systems"
    ],

    "Electrical Engineer": [
        "MATLAB", "Circuit Design", "AutoCAD",
        "Electrical Engineering", "PLC"
    ],

    "Automation Engineer": [
        "PLC", "Python", "MATLAB",
        "Control Systems", "Automation"
    ],

    "UI/UX Designer": [
        "Figma", "UI Design", "UX Design",
        "Prototyping", "User Research"
    ],

    "Financial Analyst": [
        "Excel", "SQL", "Financial Modeling",
        "Power BI", "Data Analysis"
    ],

    "Digital Marketing Specialist": [
        "SEO", "Google Analytics", "Social Media",
        "Content Marketing", "Digital Marketing"
    ],

    "Project Manager": [
        "Project Management", "Agile",
        "Communication", "Leadership", "Jira"
    ]
}


def recommend_careers(student_skills):
    # Normalize skills for case-insensitive matching
    student_skills_set = {
        skill.strip().casefold()
        for skill in student_skills
        if isinstance(skill, str) and skill.strip()
    }

    recommendations = []

    for career, required_skills in CAREER_ROLES.items():

        matching_skills = [
            skill for skill in required_skills
            if skill.casefold() in student_skills_set
        ]

        missing_skills = [
            skill for skill in required_skills
            if skill.casefold() not in student_skills_set
        ]

        match_percentage = round(
            len(matching_skills) / len(required_skills) * 100, 1
        )

        recommendations.append({
            "career": career,
            "match_percentage": match_percentage,
            "matching_skills": matching_skills,
            "missing_skills": missing_skills
        })

    # Show strongest matches first
    recommendations.sort(
        key=lambda item: item["match_percentage"],
        reverse=True
    )

    return recommendations
