
from career_recommender import recommend_careers
from ai_model import recommend_careers_ai, CAREER_DESCRIPTIONS


def recommend_careers_hybrid(cv_text, student_skills, top_n=5):
    # Calculate skill-based recommendations
    skill_results = recommend_careers(student_skills)

    # Calculate AI similarity for ALL careers
    ai_results = recommend_careers_ai(
        cv_text,
        top_n=len(CAREER_DESCRIPTIONS)
    )

    ai_scores = {
        item["career"]: item["similarity_score"]
        for item in ai_results
    }

    results = []

    for item in skill_results:
        career = item["career"]

        skill_score = item["match_percentage"] / 100

        # Cosine similarity can range from -1 to 1.
        raw_ai_score = ai_scores.get(career, 0.0)
        ai_score = max(0.0, min(1.0, raw_ai_score))

        # Initial hybrid ranking formula
        hybrid_score = (
            0.6 * skill_score +
            0.4 * ai_score
        )

        results.append({
            "career": career,
            "hybrid_score": round(hybrid_score, 4),
            "skill_match_percentage": item["match_percentage"],
            "ai_similarity": raw_ai_score,
            "matching_skills": item["matching_skills"],
            "missing_skills": item["missing_skills"]
        })

    results.sort(
        key=lambda item: item["hybrid_score"],
        reverse=True
    )

    return results[:top_n]
