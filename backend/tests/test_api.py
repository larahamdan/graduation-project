
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home_endpoint():
    response = client.get("/")

    assert response.status_code == 200


def test_cv_upload_requires_authentication():
    response = client.post("/cv/upload")

    assert response.status_code == 401


def test_career_recommendations_require_authentication():
    response = client.get("/careers/recommendations")

    assert response.status_code == 401


def test_learning_roadmap_requires_authentication():
    response = client.get(
        "/careers/roadmap",
        params={"career": "Backend Developer"}
    )

    assert response.status_code == 401


def test_cv_analyses_require_authentication():
    response = client.get("/cv/analyses")

    assert response.status_code == 401
