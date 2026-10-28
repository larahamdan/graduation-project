
import pytest

from learning_roadmap import generate_roadmap


def test_backend_developer_roadmap():
    result = generate_roadmap(
        ["SQL", "Git", "Docker"],
        10
    )

    assert result["total_estimated_hours"] == 57
    assert result["total_estimated_weeks"] == 6
    assert len(result["roadmap"]) == 3


def test_single_skill_roadmap():
    result = generate_roadmap(["Python"], 10)

    assert result["total_estimated_hours"] == 40
    assert result["total_estimated_weeks"] == 4


def test_missing_learning_plan():
    result = generate_roadmap(
        ["Unknown Skill"],
        10
    )

    assert result["roadmap"][0]["estimated_hours"] is None
    assert result["roadmap"][0]["estimated_weeks"] is None
    assert result["total_estimated_hours"] == 0


def test_invalid_study_hours():
    with pytest.raises(ValueError):
        generate_roadmap(["Python"], 0)


def test_no_missing_skills():
    result = generate_roadmap([], 10)

    assert result["total_estimated_hours"] == 0
    assert result["total_estimated_weeks"] == 0
    assert result["roadmap"] == []

