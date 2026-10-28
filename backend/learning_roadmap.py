
# CareerPath AI - Learning Roadmap Generator

# Estimated learning hours are approximate starting values.
# They are not guaranteed completion times.

SKILL_LEARNING_PLANS = {
    "Python": {
        "topics": [
            "Python syntax and variables",
            "Conditions, loops, and functions",
            "Data structures",
            "Object-oriented programming",
            "Build a small Python project"
        ],
        "estimated_hours": 40
    },

    "SQL": {
        "topics": [
            "Database fundamentals",
            "SELECT, WHERE, and ORDER BY",
            "JOIN operations",
            "GROUP BY and aggregate functions",
            "Practice with PostgreSQL"
        ],
        "estimated_hours": 25
    },

    "FastAPI": {
        "topics": [
            "HTTP and REST API fundamentals",
            "Create FastAPI endpoints",
            "Pydantic request validation",
            "Connect APIs to PostgreSQL",
            "Authentication and API testing"
        ],
        "estimated_hours": 25
    },

    "Git": {
        "topics": [
            "Version control fundamentals",
            "Git add, commit, and push",
            "Branches and merging",
            "GitHub collaboration",
            "Resolve merge conflicts"
        ],
        "estimated_hours": 12
    },

    "Docker": {
        "topics": [
            "Containers and images",
            "Install and use Docker",
            "Write a Dockerfile",
            "Docker Compose basics",
            "Containerize a backend application"
        ],
        "estimated_hours": 20
    },

    "HTML": {
        "topics": [
            "HTML document structure",
            "Headings, links, and forms",
            "Semantic HTML",
            "Accessibility basics",
            "Build a simple webpage"
        ],
        "estimated_hours": 15
    },

    "CSS": {
        "topics": [
            "Selectors and properties",
            "Box model",
            "Flexbox and Grid",
            "Responsive design",
            "Style a complete webpage"
        ],
        "estimated_hours": 25
    },

    "JavaScript": {
        "topics": [
            "Variables, functions, and arrays",
            "DOM manipulation",
            "Events and asynchronous JavaScript",
            "Fetch APIs",
            "Build an interactive project"
        ],
        "estimated_hours": 40
    },

    "React": {
        "topics": [
            "Components and JSX",
            "Props and state",
            "React hooks",
            "Routing and forms",
            "Build a React application"
        ],
        "estimated_hours": 35
    },

    "Excel": {
        "topics": [
            "Formulas and functions",
            "Sorting and filtering",
            "Pivot tables",
            "Charts and dashboards",
            "Data cleaning"
        ],
        "estimated_hours": 20
    },

    "Machine Learning": {
        "topics": [
            "Machine learning fundamentals",
            "Supervised and unsupervised learning",
            "Model training and evaluation",
            "Scikit-learn basics",
            "Build a machine learning project"
        ],
        "estimated_hours": 50
    },

    "Statistics": {
        "topics": [
            "Descriptive statistics",
            "Probability",
            "Distributions",
            "Hypothesis testing",
            "Regression fundamentals"
        ],
        "estimated_hours": 35
    }
}


import math


def generate_roadmap(missing_skills, weekly_study_hours):
    if weekly_study_hours <= 0:
        raise ValueError("Weekly study hours must be greater than zero")

    roadmap = []
    total_hours = 0

    for skill in missing_skills:
        plan = SKILL_LEARNING_PLANS.get(skill)

        if plan is None:
            roadmap.append({
                "skill": skill,
                "topics": ["Find an introductory course and practice projects"],
                "estimated_hours": None,
                "estimated_weeks": None,
                "note": "Detailed learning plan not available yet"
            })
            continue

        hours = plan["estimated_hours"]
        total_hours += hours

        roadmap.append({
            "skill": skill,
            "topics": plan["topics"],
            "estimated_hours": hours,
            "estimated_weeks": round(
                hours / weekly_study_hours, 1
            )
        })

    total_weeks = math.ceil(total_hours / weekly_study_hours)

    return {
        "weekly_study_hours": weekly_study_hours,
        "total_estimated_hours": total_hours,
        "total_estimated_weeks": total_weeks,
        "roadmap": roadmap
    }

