
from sentence_transformers import SentenceTransformer
from sentence_transformers import util

from functools import lru_cache

# A pretrained AI model for comparing text meaning
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"



@lru_cache(maxsize=1)
def load_model():
    print("Loading pretrained AI model...")
    return SentenceTransformer(MODEL_NAME)



def compare_texts(text1, text2):
    model = load_model()

    embeddings = model.encode(
        [text1, text2],
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        embeddings[0],
        embeddings[1]
    )

    return round(similarity.item(), 4)


if __name__ == "__main__":
    text1 = "I develop APIs using Python and databases."
    text2 = "Backend software engineering with Python and SQL."

    score = compare_texts(text1, text2)

    print("Semantic similarity:", score)


CAREER_DESCRIPTIONS = {
    "Backend Developer": (
        "Develop server-side applications, REST APIs, "
        "database integrations, authentication, "
        "and backend services using Python and SQL."
    ),

    "Frontend Developer": (
        "Build interactive websites and user interfaces "
        "using HTML, CSS, JavaScript, and React."
    ),

    "Full Stack Developer": (
        "Develop both frontend and backend applications, "
        "including websites, APIs, and databases."
    ),

    "Data Analyst": (
        "Analyze datasets, create reports, build dashboards, "
        "and identify patterns using SQL, Excel, and Python."
    ),

    "Data Scientist": (
        "Apply statistics, machine learning, and programming "
        "to analyze data and build predictive models."
    ),

    "Machine Learning Engineer": (
        "Develop, train, evaluate, and deploy machine learning "
        "models and artificial intelligence systems."
    ),

    "Cybersecurity Analyst": (
        "Protect computer systems, analyze security threats, "
        "monitor networks, and investigate vulnerabilities."
    ),

    "DevOps Engineer": (
        "Automate software deployment and infrastructure "
        "using Linux, Docker, Kubernetes, and cloud tools."
    ),

    "Embedded Systems Engineer": (
        "Develop embedded software and hardware systems "
        "using microcontrollers, C, C++, and electronics."
    ),

    "Electrical Engineer": (
        "Design and analyze electrical circuits, power "
        "systems, and electrical engineering applications."
    ),

    "Automation Engineer": (
        "Develop industrial automation systems using PLCs, "
        "control systems, sensors, and robotics."
    ),

    "UI/UX Designer": (
        "Design user interfaces, improve user experience, "
        "create prototypes, and conduct user research."
    ),

    "Financial Analyst": (
        "Analyze financial data, create financial models, "
        "evaluate investments, and prepare business reports."
    ),

    "Digital Marketing Specialist": (
        "Manage digital marketing campaigns, search engine "
        "optimization, social media, and online advertising."
    ),

    "Project Manager": (
        "Plan projects, manage schedules, coordinate teams, "
        "monitor risks, and deliver project objectives."
    )
}

@lru_cache(maxsize=1)
def get_career_embeddings():
    model = load_model()

    careers = list(CAREER_DESCRIPTIONS.keys())
    descriptions = list(CAREER_DESCRIPTIONS.values())

    embeddings = model.encode(
        descriptions,
        convert_to_tensor=True
    )

    return careers, embeddings




def recommend_careers_ai(cv_text, top_n=5):
    model = load_model()

    # Reuse previously calculated career embeddings
    careers, career_embeddings = get_career_embeddings()

    cv_embedding = model.encode(
        cv_text,
        convert_to_tensor=True
    )

    similarities = util.cos_sim(
        cv_embedding,
        career_embeddings
    )[0]

    results = []

    for career, similarity in zip(careers, similarities):
        results.append({
            "career": career,
            "similarity_score": round(
                similarity.item(), 4
            )
        })

    results.sort(
        key=lambda item: item["similarity_score"],
        reverse=True
    )

    return results[:top_n]



    for career, similarity in zip(careers, similarities):
        results.append({
            "career": career,
            "similarity_score": round(
                similarity.item(), 4
            )
        })

    results.sort(
        key=lambda item: item["similarity_score"],
        reverse=True
    )

    return results[:top_n]
