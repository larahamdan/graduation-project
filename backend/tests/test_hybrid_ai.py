
from pathlib import Path

from cv_analyzer import analyze_cv
from hybrid_recommender import recommend_careers_hybrid


def test_backend_cv_recommends_backend_developer():
    cv_path = (
        Path(__file__).resolve().parent
        / "sample_backend_cv.txt"
    )

    text = cv_path.read_text(encoding="utf-8")
    analysis = analyze_cv(text)

    results = recommend_careers_hybrid(
        cv_text=text,
        student_skills=analysis["skills"],
        top_n=15
    )

    assert len(results) == 15
    assert results[0]["career"] == "Backend Developer"

    backend = results[0]

    assert backend["skill_match_percentage"] == 100.0
    assert backend["missing_skills"] == []


def test_data_analyst_cv_recommends_data_analyst():
    cv_path = (
        Path(__file__).resolve().parent
        / "sample_data_analyst_cv.txt"
    )

    text = cv_path.read_text(encoding="utf-8")
    analysis = analyze_cv(text)

    assert "Excel" in analysis["skills"]
    assert "Statistics" in analysis["skills"]

    results = recommend_careers_hybrid(
        cv_text=text,
        student_skills=analysis["skills"],
        top_n=5
    )

    assert len(results) == 5
    assert results[0]["career"] == "Data Analyst"
    assert results[0]["skill_match_percentage"] == 100.0
