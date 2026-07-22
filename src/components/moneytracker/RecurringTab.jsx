import React, { useState } from 'react';
import { 
  Repeat, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Wallet, 
  Zap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Tag,
  Sparkles
} from 'lucide-react';

export default function RecurringTab({ entries, onAddEntry, onDeleteEntry, currentMonth }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Utilități');
  const [amount, setAmount] = useState('');
  const [dueDay, setDueDay] = useState('1');
  const [description, setDescription] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense

  // Filter only recurring entries
  const recurringEntries = entries.filter(e => e.is_recurring);

  const recurringIncomes = recurringEntries.filter(e => e.type === 'income');
  const recurringExpenses = recurringEntries.filter(e => e.type === 'expense');

  const totalRecurringIncome = recurringIncomes.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalRecurringExpense = recurringExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const recurringNet = totalRecurringIncome - totalRecurringExpense;
  const fixedBurdenRatio = totalRecurringIncome > 0 
    ? Math.min(100, Math.round((totalRecurringExpense / totalRecurringIncome) * 100))
    : 0;

  // Filter displayed recurring items
  const displayedEntries = recurringEntries
    .filter(e => filterType === 'all' ? true : e.type === filterType)
    .sort((a, b) => (a.due_day || 1) - (b.due_day || 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    onAddEntry({
      type,
      category,
      amount: parseFloat(amount),
      is_recurring: true,
      due_day: parseInt(dueDay) || 1,
      description,
      month_year: currentMonth
    });

    setAmount('');
    setDescription('');
    setShowAddForm(false);
  };

  const categoriesMap = {
    income: ['Salariu', 'Freelance', 'Chirie Primită', 'Investiții', 'Altele'],
    expense: ['Utilități', 'Chirie / Rate', 'Abonamente (Netflix, Spotify)', 'Asigurări', 'Servicii / Internet', 'Transport', 'Altele']
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800/60 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-xl text-accent">
              <Repeat className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-text tracking-wide">Tablou Tranzacții Recurente</h2>
          </div>
          <p className="text-xs text-text-muted font-light max-w-xl">
            Monitorizează exclusiv intrările și ieșirile fixe lunare (Salarii, Chiriile, Utilitățile, Abonamentele). 
            Află instant ce sumă netă îți rămâne garantat în fiecare lună după achitarea cheltuielilor fixe.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="z-10 bg-accent hover:bg-accent-hover text-background font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Adaugă Recurență Nouă</span>
        </button>
      </div>

      {/* Quick Add Form Modal / Drawer */}
      {showAddForm && (
        <form 
          onSubmit={handleSubmit}
          className="bg-neutral-900/90 border border-accent/30 p-6 rounded-3xl space-y-5 animate-slideDown shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Adaugă Venit sau Cheltuială Recurentă
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-text-muted hover:text-text uppercase font-bold"
            >
              Închide ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type selector */}
            <div>
              <label className="block text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">Tip Tranzacție</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => { setType('income'); setCategory(categoriesMap.income[0]); }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-text-muted hover:text-text'}`}
                >
                  + Venit Fix
                </button>
                <button
                  type="button"
                  onClick={() => { setType('expense'); setCategory(categoriesMap.expense[0]); }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-text-muted hover:text-text'}`}
                >
                  - Cheltuială Fixă
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">Categorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent"
              >
                {categoriesMap[type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">Suma (RON)</label>
              <input
                type="number"
                step="0.01"
                placeholder="ex: 4500 sau 250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Due Day */}
            <div>
              <label className="block text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                Ziua din lună când se procesează (1 - 31)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] text-text-muted font-semibold uppercase tracking-wider mb-2">
                Notă / Descriere (opțional)
              </label>
              <input
                type="text"
                placeholder="ex: Abonament Internet Digi sau Salariu Principal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-bold text-text-muted hover:text-text uppercase"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover text-background font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shadow-md"
            >
              Salvează Recurența
            </button>
          </div>
        </form>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Recurring Income KPI */}
        <div className="bg-background-secondary border border-neutral-800/40 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Venituri Recurente</span>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
            +{totalRecurringIncome.toLocaleString('ro-RO')} <span className="text-xs font-normal text-text-muted">RON</span>
          </div>
          <p className="text-[10px] text-text-muted mt-2 font-light">
            {recurringIncomes.length} surse fixe de venit în luna curentă
          </p>
        </div>

        {/* Recurring Expense KPI */}
        <div className="bg-background-secondary border border-neutral-800/40 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Cheltuieli Fixe</span>
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono tracking-tight">
            -{totalRecurringExpense.toLocaleString('ro-RO')} <span className="text-xs font-normal text-text-muted">RON</span>
          </div>
          <p className="text-[10px] text-text-muted mt-2 font-light">
            {recurringExpenses.length} obligații fixe lunare
          </p>
        </div>

        {/* Recurring Net Balance KPI */}
        <div className="bg-background-secondary border border-neutral-800/40 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-accent/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Disponibil Net Fix</span>
            <div className="p-2 bg-accent/10 rounded-xl text-accent">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-black font-mono tracking-tight ${recurringNet >= 0 ? 'text-accent' : 'text-rose-400'}`}>
            {recurringNet >= 0 ? '+' : ''}{recurringNet.toLocaleString('ro-RO')} <span className="text-xs font-normal text-text-muted">RON</span>
          </div>
          <p className="text-[10px] text-text-muted mt-2 font-light">
            Bani liberi după plată cheltuieli fixe
          </p>
        </div>

        {/* Fixed Burden Ratio KPI */}
        <div className="bg-background-secondary border border-neutral-800/40 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden group hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-text-muted uppercase font-bold tracking-wider">Grad Îndatorare Fixă</span>
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono tracking-tight">
            {fixedBurdenRatio}%
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${fixedBurdenRatio > 70 ? 'bg-rose-500' : fixedBurdenRatio > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`}
              style={{ width: `${fixedBurdenRatio}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cash Flow Timeline Calendar (1 - 31 Days) */}
      <div className="bg-background-secondary border border-neutral-800/40 p-6 rounded-3xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-bold text-text uppercase tracking-wider">Calendar Scadențe Fixe (Zilele Lunii 1 - 31)</h3>
          </div>
          <span className="text-xs text-text-muted font-light">Eșalonare tranzacții fixe pe zile</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-16 gap-2 pt-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const dayEntries = recurringEntries.filter(e => (e.due_day || 1) === day);
            const hasIncome = dayEntries.some(e => e.type === 'income');
            const hasExpense = dayEntries.some(e => e.type === 'expense');

            return (
              <div 
                key={day}
                className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[64px] ${
                  dayEntries.length > 0
                    ? hasIncome && hasExpense
                      ? 'bg-neutral-800 border-amber-500/50 text-text'
                      : hasIncome
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
                    : 'bg-neutral-950/40 border-neutral-800/60 text-text-muted opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-text-muted">Ziua {day}</span>
                {dayEntries.length > 0 ? (
                  <div className="space-y-0.5 my-1">
                    <span className="text-[11px] font-black font-mono block">
                      {dayEntries.length} {dayEntries.length === 1 ? 'plată' : 'plăți'}
                    </span>
                    <div className="flex gap-1 justify-center">
                      {hasIncome && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      {hasExpense && <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                    </div>
                  </div>
                ) : (
                  <span className="text-[9px] text-neutral-600 font-light">-</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Recurring List */}
      <div className="bg-background-secondary border border-neutral-800/40 rounded-3xl p-6 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-text uppercase tracking-wider">Lista Obligațiilor & Veniturilor Recurente</h3>
            <p className="text-xs text-text-muted font-light mt-0.5">Gestionează elementele fixe din bugetul tău lunar</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'all' ? 'bg-accent text-background' : 'text-text-muted hover:text-text'}`}
            >
              Toate ({recurringEntries.length})
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-text-muted hover:text-text'}`}
            >
              Venituri ({recurringIncomes.length})
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-text-muted hover:text-text'}`}
            >
              Cheltuieli ({recurringExpenses.length})
            </button>
          </div>
        </div>

        {displayedEntries.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-text-muted">
              <Repeat className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-text">Nicio recurență adăugată</h4>
            <p className="text-xs text-text-muted max-w-sm mx-auto font-light">
              Apăsă pe butonul „Adaugă Recurență Nouă” de mai sus pentru a adăuga prima ta cheltuială sau venit recurent.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedEntries.map(entry => (
              <div 
                key={entry.id}
                className="bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 p-4 rounded-2xl flex items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-3 rounded-xl shrink-0 ${entry.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                    {entry.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text truncate">{entry.category}</span>
                      <span className="text-[10px] font-mono bg-neutral-800 text-text-muted px-2 py-0.5 rounded-full border border-neutral-700 shrink-0">
                        Ziua {entry.due_day || 1}
                      </span>
                    </div>

                    {entry.description && (
                      <p className="text-xs text-text-muted truncate font-light">{entry.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className={`text-sm font-black font-mono block ${entry.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {entry.type === 'income' ? '+' : '-'}{Number(entry.amount).toLocaleString('ro-RO')} RON
                    </span>
                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Lunar</span>
                  </div>

                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-2 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all opacity-60 group-hover:opacity-100"
                    title="Șterge recurența"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
