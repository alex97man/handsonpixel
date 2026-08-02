-- Table for storing monthly status overrides for recurring entries
create table if not exists public.money_tracker_recurring_status (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  access_key_hash text not null,
  recurring_entry_id uuid not null,
  month_year text not null,
  status text not null check (status in ('paid', 'pending', 'skipped')),
  unique (access_key_hash, recurring_entry_id, month_year)
);

alter table public.money_tracker_recurring_status enable row level security;

create policy "Allow all operations based on access_key_hash"
  on public.money_tracker_recurring_status for all using (true) with check (true);
