-- Simple database migration for Todo List App (Alternative version)
-- Run this in Supabase SQL Editor if you prefer a simpler setup

-- Drop existing table if it exists (be careful!)
-- DROP TABLE IF EXISTS public.tasks CASCADE;

-- Create tasks table with minimal constraints
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'notStarted',
  category TEXT DEFAULT 'work',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Basic indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at);

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Simple RLS policy - users can do everything with their own tasks
CREATE POLICY "tasks_policy" ON public.tasks
  FOR ALL USING (auth.uid() = user_id);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
