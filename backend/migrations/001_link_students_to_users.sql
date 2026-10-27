
-- CareerPath AI
-- Migration 001: Link students to registered users

BEGIN;

-- 1. Add user_id to the students table.
-- Existing student records remain unchanged.
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS user_id INTEGER;

-- 2. Create the foreign key relationship.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'students_user_id_fkey'
          AND conrelid = 'public.students'::regclass
    ) THEN
        ALTER TABLE public.students
        ADD CONSTRAINT students_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES public.users(id);
    END IF;
END $$;

-- 3. Allow each user to have only one student profile.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'students_user_id_unique'
          AND conrelid = 'public.students'::regclass
    ) THEN
        ALTER TABLE public.students
        ADD CONSTRAINT students_user_id_unique
        UNIQUE (user_id);
    END IF;
END $$;

COMMIT;
