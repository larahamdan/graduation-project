
-- CareerPath AI
-- Migration 002: Create CV analysis table

BEGIN;

CREATE TABLE IF NOT EXISTS public.cv_analyses (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES public.users(id),

    filename VARCHAR(255) NOT NULL,

    skills JSON NOT NULL,
    education JSON NOT NULL,
    experience JSON NOT NULL,

    extracted_text TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE
        NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS ix_cv_analyses_user_id
ON public.cv_analyses (user_id);

COMMIT;

