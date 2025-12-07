-- TISAverse Studybooks Database Tables
-- Run this migration in Supabase SQL Editor

-- ============================================
-- 1. progress-books: Page completion tracking
-- ============================================
CREATE TABLE IF NOT EXISTS "progress-books" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workbook_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  component_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_data JSONB,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one progress record per user per page
  UNIQUE(user_id, workbook_id, lesson_id, page_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_progress_books_user_id ON "progress-books"(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_books_workbook ON "progress-books"(workbook_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_books_status ON "progress-books"(status);

-- RLS policies
ALTER TABLE "progress-books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON "progress-books"
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON "progress-books"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON "progress-books"
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 2. preferences-books: Learning preferences
-- ============================================
CREATE TABLE IF NOT EXISTS "preferences-books" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  preferred_difficulty TEXT CHECK (preferred_difficulty IN ('easy', 'medium', 'hard')),
  preferred_owls TEXT[],
  preferred_topics TEXT[],
  reading_speed TEXT CHECK (reading_speed IN ('slow', 'medium', 'fast')),
  learning_style TEXT CHECK (learning_style IN ('visual', 'kinesthetic', 'auditory', 'reading')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_preferences_books_user_id ON "preferences-books"(user_id);

-- RLS policies
ALTER TABLE "preferences-books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences" ON "preferences-books"
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON "preferences-books"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON "preferences-books"
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 3. drawings-books: Canvas saves
-- ============================================
CREATE TABLE IF NOT EXISTS "drawings-books" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workbook_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  drawing_data JSONB,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one drawing per user per page
  UNIQUE(user_id, workbook_id, lesson_id, page_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_drawings_books_user_id ON "drawings-books"(user_id);
CREATE INDEX IF NOT EXISTS idx_drawings_books_page ON "drawings-books"(workbook_id, lesson_id, page_id);

-- RLS policies
ALTER TABLE "drawings-books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own drawings" ON "drawings-books"
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own drawings" ON "drawings-books"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own drawings" ON "drawings-books"
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 4. stickers-books: Sticker placements
-- ============================================
CREATE TABLE IF NOT EXISTS "stickers-books" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workbook_id TEXT NOT NULL,
  sticker_id TEXT NOT NULL,
  placed_on_page TEXT,
  placed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_stickers_books_user_id ON "stickers-books"(user_id);
CREATE INDEX IF NOT EXISTS idx_stickers_books_workbook ON "stickers-books"(workbook_id);

-- RLS policies
ALTER TABLE "stickers-books" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stickers" ON "stickers-books"
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stickers" ON "stickers-books"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stickers" ON "stickers-books"
  FOR UPDATE USING (auth.uid() = user_id);


-- ============================================
-- 5. Updated_at trigger function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to tables with updated_at
CREATE TRIGGER update_progress_books_updated_at
  BEFORE UPDATE ON "progress-books"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_books_updated_at
  BEFORE UPDATE ON "preferences-books"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drawings_books_updated_at
  BEFORE UPDATE ON "drawings-books"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- Success message
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ TISAverse Studybooks tables created successfully!';
  RAISE NOTICE '   - progress-books';
  RAISE NOTICE '   - preferences-books';
  RAISE NOTICE '   - drawings-books';
  RAISE NOTICE '   - stickers-books';
END $$;
