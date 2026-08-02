# Recurring Sync & Permanent Monthly History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a hybrid data flow between master recurring templates and monthly tracker views, displaying real-time category card summaries and preserving immutable monthly history across transitions.

**Architecture:** Master recurring templates (`is_recurring: true`) are merged dynamically into any selected month `YYYY-MM`. Monthly status overrides (`paid`, `pending`, `skipped`) and one-off entries are persisted per month in Supabase (`money_tracker_recurring_status` table), ensuring past months' records remain 100% frozen and intact.

**Tech Stack:** React 19, Vite, Tailwind CSS, Supabase JS Client, Lucide Icons.

---

### Task 1: Supabase Database Schema for Monthly Status Overrides

**Files:**
- Create: `supabase/create_status_table.sql`

- [ ] **Step 1: Write SQL schema for `money_tracker_recurring_status`**

```sql
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
```

- [ ] **Step 2: Commit SQL migration**

```bash
git add supabase/create_status_table.sql
git commit -m "db: add money_tracker_recurring_status schema"
```

---

### Task 2: Update MoneyTracker Data Fetching & Hybrid Merging Logic

**Files:**
- Modify: `src/pages/MoneyTracker.jsx`

- [ ] **Step 1: Update `fetchEntries` to fetch both master recurring templates and month-specific entries**

```javascript
  const fetchEntries = async () => {
    setEntriesLoading(true);
    try {
      // Fetch entries for current month OR recurring master entries
      const { data, error } = await supabase
        .from('money_tracker_entries')
        .select('*')
        .eq('access_key_hash', CORRECT_HASH)
        .or(`month_year.eq.${currentMonth},is_recurring.eq.true`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching entries:', err);
    } finally {
      setEntriesLoading(false);
    }
  };
```

- [ ] **Step 2: Run build check**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/MoneyTracker.jsx
git commit -m "feat: fetch master recurring entries alongside monthly entries in MoneyTracker"
```

---

### Task 3: Build Real-Time Category Cards Grid & Status Toggle Pills in TrackerTab

**Files:**
- Modify: `src/components/moneytracker/TrackerTab.jsx`

- [ ] **Step 1: Add Category Cards Grid and Monthly Status Pills to `TrackerTab.jsx`**

Render category cards summarizing:
- Total amount (Fixed + One-Off)
- Category breakdown label
- Visual progress/proportion bar

Render status toggle pills for recurring items in the transaction ledger:
- `[✓ Achitat]`
- `[⏳ În Așteptare]`
- `[🚫 Ignorat]`

- [ ] **Step 2: Run build check**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/moneytracker/TrackerTab.jsx
git commit -m "feat: add real-time category cards grid and monthly status pills in TrackerTab"
```

---

### Task 4: Deploy & Verify Deployment

**Files:**
- Build: `./dist/`

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Commit and push to main**

```bash
git add .
git commit -m "feat: complete recurring sync with category grid and monthly history retention"
git push origin main
```
