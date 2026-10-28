
from career_recommender import recommend_careers


def test_backend_developer_match():
    results = recommend_careers([
        "Python", "SQL", "FastAPI"
    ])

    backend = next(
        item for item in results
        if item["career"] == "Backend Developer"
    )

    assert backend["match_percentage"] == 60.0
    assert backend["missing_skills"] == ["Git", "Docker"]


def test_skill_aliases():
    results = recommend_careers([
        "Python 3", "PostgreSQL", "GitHub", "FastAPI"
    ])

    backend = next(
        item for item in results
        if item["career"] == "Backend Developer"
    )

    assert backend["match_percentage"] == 80.0
    assert backend["missing_skills"] == ["Docker"]


def test_recommendations_are_sorted():
    results = recommend_careers(["Python", "SQL"])

    percentages = [
        item["match_percentage"]
        for item in results
    ]

    assert percentages == sorted(
        percentages,
        reverse=True
    )

