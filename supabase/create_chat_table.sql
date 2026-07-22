-- Table for saving Advisor AI chat history permanently in Supabase
create table if not exists public.money_tracker_chat (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  access_key_hash text not null,
  sender text not null check (sender in ('user', 'ai')),
  text text not null,
  month_year text not null
);

alter table public.money_tracker_chat enable row level security;

create policy "Allow all operations based on access_key_hash"
  on public.money_tracker_chat for all using (true) with check (true);
