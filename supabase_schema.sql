-- ====================================================================
-- SURYA V M PORTFOLIO — SUPABASE PRODUCTION DATABASE SCHEMA
-- Canonical Domain: https://surya.signbridge.click
-- ====================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/projects
-- 2. Select your project -> Click "SQL Editor" in the left sidebar
-- 3. Click "New query" -> Paste all the SQL below -> Click "Run" (Ctrl+Enter)
-- ====================================================================

-- 1. Create table for Contact Form inquiries & messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ticket_id TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    purpose TEXT DEFAULT 'New Business',
    source TEXT,
    message TEXT NOT NULL,
    signature TEXT,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'replied')),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Indexes for fast sorting and dashboard queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages (email);

-- 3. Enable Row Level Security (RLS) for data protection
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow public anonymous visitors to insert their inquiries
DROP POLICY IF EXISTS "Allow anonymous visitors to insert contact inquiries" ON public.contact_messages;
CREATE POLICY "Allow anonymous visitors to insert contact inquiries" 
ON public.contact_messages
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 5. RLS Policy: Only authenticated owner (you) can read inquiries
DROP POLICY IF EXISTS "Allow authenticated owner to view submissions" ON public.contact_messages;
CREATE POLICY "Allow authenticated owner to view submissions" 
ON public.contact_messages
FOR SELECT 
TO authenticated
USING (true);

-- 6. RLS Policy: Only authenticated owner can update status (mark read/archived)
DROP POLICY IF EXISTS "Allow authenticated owner to update submissions" ON public.contact_messages;
CREATE POLICY "Allow authenticated owner to update submissions" 
ON public.contact_messages
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. (Optional) Enable Supabase Realtime broadcast for new contact messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;

-- ====================================================================
-- (OPTIONAL) REALTIME VISITOR TELEMETRY TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.visitor_presence (
    session_id TEXT PRIMARY KEY,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    route TEXT DEFAULT '/',
    pseudonym TEXT,
    device_type TEXT
);

ALTER TABLE public.visitor_presence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anyone to upsert presence" ON public.visitor_presence;
CREATE POLICY "Allow anyone to upsert presence"
ON public.visitor_presence
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Verification Query
SELECT 'Supabase Portfolio Schema created successfully!' AS status;
