-- ============================================================
-- Summer Camp — Supabase setup for SECURE accounts
-- ------------------------------------------------------------
-- Run this once in your Supabase project:
--   Dashboard → SQL Editor → New query → paste all of this → Run.
--
-- It replaces the insecure custom `accounts` table (plaintext
-- passwords, readable by anyone with the public key) with
-- Supabase Auth (passwords hashed server-side) + Row-Level
-- Security (each kid can read ONLY their own row; admin reads all).
-- ============================================================

-- 1) PROFILES — one row per user, linked to Supabase Auth (auth.users).
--    Note: there is NO password column. Supabase Auth holds the password,
--    hashed, in a table the public key cannot read.
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text unique not null,
  name       text,
  sex        text,
  birthday   date,
  role       text not null default 'kid',
  progress   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) ACTIVITY — per-day time + a small progress snapshot (admin dashboard).
create table if not exists public.activity (
  account_id   uuid not null references public.profiles(id) on delete cascade,
  day          date not null,
  time_seconds integer not null default 0,
  summary      jsonb,
  updated_at   timestamptz not null default now(),
  primary key (account_id, day)
);

-- 3) Helper: is the current caller an admin?
--    SECURITY DEFINER lets this read profiles WITHOUT triggering the
--    profiles RLS policy again (avoids infinite recursion).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 4) Turn ON Row-Level Security. THIS is what actually protects the data —
--    without it, the public key can read everything.
alter table public.profiles enable row level security;
alter table public.activity enable row level security;

-- 5) PROFILES policies ----------------------------------------------------
--    READ: your own row; an admin reads everyone.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select using (auth.uid() = id or public.is_admin());

--    INSERT: you may create ONLY your own row, and ONLY as a 'kid'
--    (so nobody can sign themselves up as an admin).
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
  for insert with check (auth.uid() = id and role = 'kid');

--    UPDATE: you may update your own row, but a kid cannot promote
--    themselves to admin (role must stay 'kid' unless already an admin).
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and (role = 'kid' or public.is_admin()));

-- 6) ACTIVITY policies: read/write only your own; admin can read all.
drop policy if exists activity_rw on public.activity;
create policy activity_rw on public.activity
  for all using (auth.uid() = account_id or public.is_admin())
  with check (auth.uid() = account_id);

-- ========================================================================
-- AFTER running the SQL above, finish in the dashboard:
--
--   A) Authentication → Sign In / Providers → Email →
--      turn OFF "Confirm email".
--      (Kids sign up with a username, not a real inbox, so there is no
--       confirmation link to click. Without this, signup can't finish.)
--
--   B) Authentication → Users → "Add user" →
--        Email:    admin@summercamp.local
--        Password: <choose a strong admin password>
--        ☑ Auto Confirm User
--      Then copy that new user's "User UID" and run this (paste the UID):
--
--        insert into public.profiles (id, username, name, role)
--        values ('PASTE-ADMIN-UID-HERE', 'admin', 'Parent Admin', 'admin');
--
--   C) Test on the LOCAL preview (code/index.preview.html):
--        - sign up a throwaway kid, confirm it logs in
--        - log in as username "admin" to see the dashboard
--        - log in as your son (he re-signs up once; his on-device
--          progress uploads automatically on first login)
--
--   D) ONLY after the new login works, delete the old insecure table:
--        drop table if exists public.accounts;
-- ========================================================================
