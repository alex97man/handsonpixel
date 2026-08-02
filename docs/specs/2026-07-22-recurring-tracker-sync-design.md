# Design Spec: Hybrid Recurring & Tracker Real-Time Category Sync

**Date**: 2026-07-22  
**Status**: Approved by User  
**Target Project**: `handsonpixel / moneytracker`

---

## 1. Goal & Context
The user wants to establish a clear relationship between the **Recurențe** (Recurring) tab and the **Tracker** tab:
1. **Recurențe Tab**: Serves as the Master Template configuration for all fixed recurring incomes (salary, rental income) and fixed recurring expenses (utilities, rent, subscriptions, loan payments).
2. **Tracker Tab**: Automatically projects master recurring entries onto the selected month's 31-day Cash-Flow timeline and category cards, while allowing one-off entries to be added on top.
3. **Hybrid Status Control**: For any given month in the Tracker, the user can toggle a recurring item between `[✓ Achitat]` (Paid), `[⏳ În Așteptare]` (Pending), and `[🚫 Ignorat Luna Asta]` (Skipped for this month).
4. **Real-Time Category Cards Grid**: Displays a live, visual breakdown of all active categories in the Tracker tab, summarizing total amounts (Fixed + One-off) and budget proportions in real time.

---

## 2. System Architecture & Data Flow

### 2.1 Master Recurring Entries
- Stored in Supabase `public.money_tracker_entries` with `is_recurring: true`.
- Managed, created, edited, and deleted primarily inside the `RecurringTab.jsx` workspace.

### 2.2 Monthly Hybrid Merging Logic & Permanent History Preservation
- Every month (`YYYY-MM`) maintains a permanent, immutable record of its financial history:
  - **Month-Specific One-Off Entries**: Stored in `money_tracker_entries` with `month_year = YYYY-MM` and `is_recurring = false`.
  - **Master Recurring Templates**: Stored in `money_tracker_entries` with `is_recurring = true`.
  - **Monthly Status Overrides**: Stored per `(recurring_entry_id, month_year)` in Supabase (`money_tracker_recurring_status` table or Supabase-backed persistence).
- When a user navigates to any month `YYYY-MM` (past, current, or future):
  1. Fetch one-off entries for `YYYY-MM`.
  2. Fetch master recurring templates.
  3. Fetch monthly status overrides for `YYYY-MM`.
  4. Project recurring templates onto `YYYY-MM` using their per-month override status (`paid`, `pending`, `skipped`).
- **History Preservation Guarantee**:
  - Modifying or changing status in month `2026-08` has ZERO effect on `2026-07` or any past month's history.
  - Historical snapshots for previous months remain 100% frozen, accurately reflecting what was earned, spent, paid, or skipped in that specific month.
  - AI Advisor analysis and category totals for past months are preserved per month in history.

### 2.3 Real-Time Category Breakdown
- Compute aggregated totals per category from all active merged entries:
  - `fixedAmount`: sum of active recurring entries for category.
  - `oneOffAmount`: sum of non-recurring entries for category.
  - `totalAmount`: `fixedAmount + oneOffAmount`.
- Render interactive category cards in `TrackerTab.jsx` with category icons, total RON, breakdown label, and proportion progress bars.

---

## 3. UI/UX Component Specifications

### 3.1 `TrackerTab.jsx`
- **Top Bar**: Month navigator (`< Înapoi`, Month Name, `Înainte >`).
- **Summary Cards (4 KPIs)**: Venituri, Cheltuieli, Rămași (Economii), Rată Economisire.
- **Category Cards Grid (NEW)**: Grid of interactive cards for all categories with non-zero activity, displaying category icons, total RON, fixed vs one-off breakdown, and percentage bars.
- **Transaction Form**: Add one-off or new recurring entries directly.
- **Transaction Ledger**:
  - Displays all entries for the month sorted by `due_day`.
  - Recurring items feature status toggle pill: `[✓ Achitat]` (green), `[⏳ În Așteptare]` (amber), `[🚫 Ignorat]` (muted).
  - Actions: Edit ✏️, Delete 🗑️, Toggle Status.
- **Cash-Flow Timeline Calendar (Days 1 - 31)**:
  - Renders 31 day tiles.
  - Displays recurring and one-off items on their corresponding `due_day`.

### 3.2 `RecurringTab.jsx`
- **Top Summary Cards**:
  - Total Venituri Recurente.
  - Total Cheltuieli Fixe.
  - Disponibil Net Fix (Bani Liberi = Venituri Fixe - Cheltuieli Fixe).
  - Grad Îndatorare Fixă (%).
- **Quick Add / Edit Form**: Manage master recurring templates (amount, type, category, due day 1-31, description).
- **Master Recurring List**: Filter by All / Incomes / Expenses with edit and delete capabilities.

---

## 4. Verification & Testing Plan
1. **Build Verification**: Run `npm run build` to confirm zero build errors or broken imports.
2. **Master Sync**: Add a recurring expense in `Recurențe` (e.g. Chirie 2000 RON on Day 5). Verify it immediately appears on Day 5 in `Tracker` for the current month and future months.
3. **Category Grid**: Verify category card for *Chirie/Rată* shows 2000 RON. Add a one-off expense of 100 RON in *Chirie/Rată*. Verify category card updates to 2100 RON (2000 RON fix + 100 RON ocazional).
4. **Hybrid Status Toggle**: Click `[🚫 Ignoră]` on a recurring item in July. Verify July total expense decreases, while August remains unaffected.
