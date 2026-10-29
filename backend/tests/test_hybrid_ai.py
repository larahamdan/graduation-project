
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


def test_electrical_engineer_cv_recommends_electrical_engineer():
    cv_path = (
        Path(__file__).resolve().parent
        / "sample_electrical_engineer_cv.txt"
    )

    text = cv_path.read_text(encoding="utf-8")
    analysis = analyze_cv(text)

    expected_skills = {
        "MATLAB",
        "Simulink",
        "Circuit Design",
        "Electronics",
        "PCB Design",
        "Arduino",
        "C",
        "PLC",
        "Electrical Systems",
        "Control Systems",
        "AutoCAD",
    }

    assert expected_skills.issubset(set(analysis["skills"]))

    results = recommend_careers_hybrid(
        cv_text=text,
        student_skills=analysis["skills"],
        top_n=5,
    )

    assert len(results) == 5
    assert results[0]["career"] == "Electrical Engineer"
    assert results[0]["skill_match_percentage"] == 80.0


from cv_analyzer import normalize_skills


def test_c_programming_normalization():
    skills = normalize_skills([
        "C Programming",
        "C Language",
        "C"
    ])

    assert skills == ["C"]


def test_embedded_systems_recognizes_c_skill():
    cv_path = (
        Path(__file__).resolve().parent
        / "sample_electrical_engineer_cv.txt"
    )

    text = cv_path.read_text(encoding="utf-8")
    analysis = analyze_cv(text)

    assert "C" in analysis["skills"]

    results = recommend_careers_hybrid(
        cv_text=text,
        student_skills=analysis["skills"],
        top_n=15,
    )

    embedded = next(
        result for result in results
        if result["career"] == "Embedded Systems Engineer"
    )

    assert "C" in embedded["matching_skills"]
    assert embedded["skill_match_percentage"] == 20.0

