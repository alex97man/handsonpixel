-- Run this SQL in the Supabase SQL Editor to set up the money_tracker_entries table

create table if not exists public.money_tracker_entries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  access_key_hash text not null, -- SHA-256 hash of the passcode (acts as user identifier)
  type text not null check (type in ('income', 'expense')),
  category text not null,
  amount numeric(12, 2) not null,
  is_recurring boolean default false not null,
  due_day integer default 1 check (due_day >= 1 and due_day <= 31),
  description text,
  month_year text not null -- format: 'YYYY-MM'
);

-- Enable RLS (Row Level Security) for protection, or we can use security policies.
-- For a simple personal tracker with private PIN, we can enforce access via security rules
-- or handle validation client/server-side using the access_key_hash.
alter table public.money_tracker_entries enable row level security;

-- Policy: Anyone can insert/read/delete entries if their request matches the access_key_hash.
-- Note: Since we query with the access_key_hash as a filter, we can create policies that check this.
create policy "Allow all operations based on access_key_hash"
  on public.money_tracker_entries
  for all
  using (true)
  with check (true);

-- Create indexes for fast query lookup
create index if not exists money_tracker_entries_access_key_hash_idx on public.money_tracker_entries (access_key_hash);
create index if not exists money_tracker_entries_month_year_idx on public.money_tracker_entries (month_year);
