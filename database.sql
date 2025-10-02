-- Supabase SQL bundle for Todo List App
-- Paste into Supabase SQL Editor and run.
-- Safe to re-run due to IF NOT EXISTS and OR REPLACE usage.

-- ============================================
-- EXTENSIONS (required for gen_random_uuid)
-- ============================================
create extension if not exists pgcrypto;

-- ============================================
-- TABLES
-- ============================================

-- Profiles extends auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text unique,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color text default '#3B82F6',
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date timestamptz,
  priority text not null default 'medium' check (priority in ('low','medium','high')),
  status text not null default 'notStarted' check (status in ('notStarted','inProgress','done')),
  category text not null default 'work',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_priority check (priority in ('low','medium','high')),
  constraint valid_status check (status in ('notStarted','inProgress','done'))
);

-- ============================================
-- INDEXES
-- ============================================
create index if not exists idx_profiles_user_id on public.profiles(id);
create index if not exists idx_categories_user_id on public.categories(user_id);
create index if not exists idx_tasks_user_id on public.tasks(user_id);
create index if not exists idx_tasks_created_at on public.tasks(created_at);
create index if not exists idx_tasks_status on public.tasks(status);
create index if not exists idx_tasks_priority on public.tasks(priority);
create index if not exists idx_tasks_category on public.tasks(category);
create index if not exists idx_tasks_due_date on public.tasks(due_date);

-- ============================================
-- ROW LEVEL SECURITY (RLS) AND POLICIES
-- ============================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tasks enable row level security;

-- Profiles policies
do $$ begin
  create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can delete own profile" on public.profiles for delete using (auth.uid() = id);
exception when duplicate_object then null; end $$;

-- Categories policies
do $$ begin
  create policy "Users can view own categories" on public.categories for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can insert own categories" on public.categories for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can update own categories" on public.categories for update using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can delete own categories" on public.categories for delete using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

-- Tasks policies
do $$ begin
  create policy "Users can view own tasks" on public.tasks for select using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can insert own tasks" on public.tasks for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can update own tasks" on public.tasks for update using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "Users can delete own tasks" on public.tasks for delete using (auth.uid() = user_id);
exception when duplicate_object then null; end $$;

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at_column();

create or replace trigger update_tasks_updated_at
  before update on public.tasks
  for each row execute function update_updated_at_column();

-- Create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'firstName',
    new.raw_user_meta_data ->> 'lastName',
    new.email
  )
  on conflict(id) do update set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- OPTIONAL SEED
-- ============================================
-- Uncomment to insert defaults per-user after auth
-- insert into public.categories (id, name, color, user_id)
-- values (gen_random_uuid(),'Work','#3B82F6',auth.uid())
-- on conflict do nothing;


