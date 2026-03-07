-- Content Tier Pivot: Add content_tier column to stories table
-- Three tiers: 'deep' (1,500-3,000 words), 'medium' (600-1,200 words), 'short' (300-500 words)
-- All existing stories default to 'deep' since the current library is entirely long-form cultural essays.

-- 1. Add the column
ALTER TABLE stories ADD COLUMN IF NOT EXISTS content_tier text DEFAULT 'deep';

-- 2. Add check constraint for valid values
ALTER TABLE stories ADD CONSTRAINT stories_content_tier_check
  CHECK (content_tier IN ('deep', 'medium', 'short'));

-- 3. Backfill all existing published stories as 'deep'
UPDATE stories SET content_tier = 'deep' WHERE content_tier IS NULL;

-- 4. Create index for tier-based queries (used by knowledge API and stories index)
CREATE INDEX IF NOT EXISTS idx_stories_content_tier ON stories (content_tier);

-- 5. Create composite index for common query pattern: published + tier
CREATE INDEX IF NOT EXISTS idx_stories_published_tier ON stories (published, content_tier);
