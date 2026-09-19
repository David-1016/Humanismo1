/*
# Create poll votes and comments tables (single-tenant, no auth)

1. New Tables
- `poll_votes`: stores votes for the interactive poll
  - `id` (uuid, primary key)
  - `option` (text, not null)
  - `created_at` (timestamptz, default now())
- `audience_comments`: stores open-ended reflections from the audience
  - `id` (uuid, primary key)
  - `author` (text, not null)
  - `content` (text, not null)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD (no sign-in, public/shared data).
*/

CREATE TABLE IF NOT EXISTS poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  option text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_poll_votes" ON poll_votes;
CREATE POLICY "anon_select_poll_votes" ON poll_votes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_poll_votes" ON poll_votes;
CREATE POLICY "anon_insert_poll_votes" ON poll_votes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS audience_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audience_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_comments" ON audience_comments;
CREATE POLICY "anon_select_comments" ON audience_comments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_comments" ON audience_comments;
CREATE POLICY "anon_insert_comments" ON audience_comments FOR INSERT
  TO anon, authenticated WITH CHECK (true);