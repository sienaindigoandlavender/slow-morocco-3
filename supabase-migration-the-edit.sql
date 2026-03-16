-- ============================================
-- The Edit: Email Capture System — Supabase Migration
-- Run this in the Supabase SQL Editor
-- ============================================

-- Add new columns to existing newsletter_subscribers table
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS confirmed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS confirm_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS source_page text,
  ADD COLUMN IF NOT EXISTS subscribed_at timestamptz DEFAULT now();

-- Mark all existing active subscribers as confirmed (they opted in before double opt-in)
UPDATE newsletter_subscribers
SET confirmed = true, confirmed_at = COALESCE(updated_at, now())
WHERE status = 'active' AND confirmed IS NOT true;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed ON newsletter_subscribers(confirmed);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON newsletter_subscribers(confirm_token);

-- ============================================
-- Email Sequence Table (for future weekly sends)
-- ============================================

CREATE TABLE IF NOT EXISTS email_sequence (
  send_order integer PRIMARY KEY,
  story_slug text NOT NULL,
  subject_line text NOT NULL,
  intro_line text NOT NULL,
  sent_at timestamptz
);

-- First 12 weeks
INSERT INTO email_sequence (send_order, story_slug, subject_line, intro_line) VALUES
(1, 'the-ksour', 'The fortified villages that outlasted empires', 'They were built to return to the earth. Some refused.'),
(2, 'the-gnawa', 'The ceremony that lasts all night', 'The guembri opens the door. You walk through it or you don''t.'),
(3, 'the-kings-lions', 'Morocco had lions', 'The last wild Barbary lion was shot in 1942. The bloodline survived somewhere else.'),
(4, 'moroccan-dirham-currency', 'The coin in your pocket is Greek', 'The dirham''s name comes from the drachma. The journey between is 2,400 years long.'),
(5, 'amazigh-identity', 'Five thousand years before Arabic arrived', 'The Imazighen call themselves the free people. The name is not metaphorical.'),
(6, 'the-airmail-pilot', 'The pilot who crashed into a book', 'Saint-Exupéry flew the mail run to Tarfaya. The desert taught him how to write.'),
(7, 'the-saffron-harvest', 'One hundred and fifty thousand flowers', 'That is what it takes to make a single kilo. The harvest lasts two weeks in November.'),
(8, 'play-it-again-sam', 'Nobody said that line in Casablanca', 'The film was shot in Burbank. Rick''s Café didn''t exist until a diplomat built it in 2004.'),
(9, 'the-pillars', 'The five things that hold the structure', 'One of them involves your money. Another involves your sleep.'),
(10, 'bird-atlas-morocco', 'Three hundred thousand raptors cross Morocco every autumn', 'The Strait of Gibraltar is nine miles wide. The birds have been using it for longer than humans have existed.'),
(11, 'french-protectorate', 'The forty-four years that explain modern Morocco', 'It was called a protectorate, not a colony. The legal fiction mattered.'),
(12, 'wildlife-atlas-morocco', 'The leopard that might still be in the mountains', 'The last confirmed sighting was decades ago. The locals are less certain it is gone.')
ON CONFLICT (send_order) DO NOTHING;
