import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Calendar, Info, RefreshCw, Clock } from 'lucide-react';

const CATEGORIES = {
  income: ['Salariu', 'Investiții', 'Freelance', 'Cadouri', 'Altele'],
  expense: ['Chirie/Rată', 'Utilități', 'Mâncare', 'Transport', 'Sănătate', 'Educație', 'Divertisment', 'Cumpărături', 'Abonamente', 'Altele']
};

export default function TrackerTab({ entries, onAddEntry, onDeleteEntry, currentMonth, setCurrentMonth }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [dueDay, setDueDay] = useState(new Date().getDate());
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await onAddEntry({
        type,
        category,
        amount: parseFloat(amount),
        is_recurring: isRecurring,
        due_day: parseInt(dueDay, 10) || 1,
        description: description.trim(),
        month_year: currentMonth
      });
      setAmount('');
      setDescription('');
      setIsRecurring(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculations
  const incomeEntries = entries.filter(e => e.type === 'income');
  const expenseEntries = entries.filter(e => e.type === 'expense');

  const totalIncome = incomeEntries.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenseEntries.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const remaining = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((remaining / totalIncome) * 100)) : 0;

  // Month navigation helpers
  const handlePrevMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const prevDate = new Date(year, month - 2, 1);
    const prevMonthStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(prevMonthStr);
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split('-').map(Number);
    const nextDate = new Date(year, month, 1);
    const nextMonthStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(nextMonthStr);
  };

  const formatMonthName = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' });
  };

  // Sort entries by due_day ascending
  const sortedEntries = [...entries].sort((a, b) => (a.due_day || 1) - (b.due_day || 1));

  // Group entries by due_day for the Cash Flow Timeline
  const timelineByDay = sortedEntries.reduce((acc, entry) => {
    const day = entry.due_day || 1;
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Month Navigator */}
      <div className="flex items-center justify-between bg-background-secondary border border-neutral-800/40 p-3 rounded-2xl backdrop-blur-md">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-neutral-800 rounded-lg text-accent transition-colors text-xs font-bold uppercase tracking-wider"
        >
          &larr; Înapoi
        </button>
        <div className="flex items-center gap-2 text-text font-medium text-lg uppercase tracking-wider font-sans">
          <Calendar className="w-5 h-5 text-accent" />
          <span>{formatMonthName(currentMonth)}</span>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-neutral-800 rounded-lg text-accent transition-colors text-xs font-bold uppercase tracking-wider"
        >
          Înainte &rarr;
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background-secondary border border-neutral-800/40 p-4 rounded-2xl backdrop-blur-md relative overflow-hidden">
          <div className="text-text-muted text-xs font-semibold uppercase tracking-wider">Venituri</div>
          <div className="text-2xl font-black mt-2 text-emerald-400 font-sans">
            {totalIncome.toLocaleString('ro-RO')} <span className="text-sm font-normal">RON</span>
          </div>
          <ArrowUpRight className="absolute right-4 bottom-4 w-10 h-10 text-emerald-500/10" />
        </div>

        <div className="bg-background-secondary border border-neutral-800/40 p-4 rounded-2xl backdrop-blur-md relative overflow-hidden">
          <div className="text-text-muted text-xs font-semibold uppercase tracking-wider">Cheltuieli</div>
          <div className="text-2xl font-black mt-2 text-rose-400 font-sans">
            {totalExpense.toLocaleString('ro-RO')} <span className="text-sm font-normal">RON</span>
          </div>
          <ArrowDownRight className="absolute right-4 bottom-4 w-10 h-10 text-rose-500/10" />
        </div>

        <div className="bg-background-secondary border border-neutral-800/40 p-4 rounded-2xl backdrop-blur-md relative overflow-hidden">
          <div className="text-text-muted text-xs font-semibold uppercase tracking-wider">Rămași (Economii)</div>
          <div className={`text-2xl font-black mt-2 font-sans ${remaining >= 0 ? 'text-accent' : 'text-rose-500'}`}>
            {remaining.toLocaleString('ro-RO')} <span className="text-sm font-normal">RON</span>
          </div>
          <Info className="absolute right-4 bottom-4 w-10 h-10 text-accent/10" />
        </div>

        <div className="bg-background-secondary border border-neutral-800/40 p-4 rounded-2xl backdrop-blur-md relative overflow-hidden col-span-2 lg:col-span-1">
          <div className="text-text-muted text-xs font-semibold uppercase tracking-wider">Rată Economisire</div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-text font-sans">{savingsRate}%</span>
            <span className="text-xs text-text-muted">din venituri</span>
          </div>
          <div className="w-full bg-neutral-900 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(savingsRate, 100)}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form - Add Entry */}
        <div className="lg:col-span-5 bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md space-y-4">
          <h3 className="text-md font-bold uppercase tracking-wider text-accent border-b border-neutral-800 pb-2">
            Adaugă Tranzacție
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Toggle */}
            <div className="flex bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/30">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-text-muted hover:text-text'
                }`}
              >
                Cheltuială
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-text-muted hover:text-text'
                }`}
              >
                Venit
              </button>
            </div>

            {/* Amount & Due Day in 2 Columns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Sumă (RON)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-text font-sans focus:outline-none focus:border-accent transition-colors text-md font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Ziua din lună (1-31)</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  required
                  value={dueDay}
                  onChange={e => setDueDay(e.target.value)}
                  placeholder="Ziua 1-31"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-text font-sans text-center focus:outline-none focus:border-accent transition-colors text-md font-bold"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Categorie</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
              >
                {CATEGORIES[type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Recurring Checkbox */}
            <div className="flex items-center justify-between py-2 border-y border-neutral-800/30">
              <div className="flex items-center gap-2">
                <RefreshCw className={`w-4 h-4 ${isRecurring ? 'text-accent animate-spin-slow' : 'text-text-muted'}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Repetiție lunară (Recurentă)</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isRecurring} 
                  onChange={e => setIsRecurring(e.target.checked)} 
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-neutral-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-500 after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent peer-checked:after:bg-background"></div>
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Descriere (Opțional)</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Ex: Salariu angajator, Chirie apartament..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-accent-hover text-background font-black uppercase tracking-wider py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>{isSubmitting ? 'Se adaugă...' : 'Adaugă Tranzacție'}</span>
            </button>
          </form>
        </div>

        {/* Ledger List */}
        <div className="lg:col-span-7 bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
            <h3 className="text-md font-bold uppercase tracking-wider text-accent">
              Tranzacții (Ordonate după dată)
            </h3>
            <span className="text-xs text-text-muted font-light">{entries.length} înregistrări</span>
          </div>

          {entries.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-text-muted space-y-2 py-8">
              <Info className="w-8 h-8 text-neutral-700" />
              <p className="text-sm">Nicio tranzacție înregistrată pentru această lună.</p>
              <p className="text-xs">Introdu veniturile și cheltuielile recurente folosind formularul.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto space-y-2 max-h-[420px] pr-1">
              {sortedEntries.map(entry => (
                <div 
                  key={entry.id} 
                  className="flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/20 p-3 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Day badge */}
                    <div className="flex flex-col items-center justify-center w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-xl shrink-0">
                      <span className="text-[9px] text-text-muted uppercase font-bold">Ziua</span>
                      <span className="text-sm font-black text-accent font-sans leading-none">{entry.due_day || 1}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text text-sm">{entry.category}</span>
                        {entry.is_recurring && (
                          <span className="text-[9px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-bold uppercase">
                            Recurent
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-muted font-light">
                        {entry.description || 'Fără descriere'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold font-sans text-sm ${entry.type === 'income' ? 'text-emerald-400' : 'text-text'}`}>
                      {entry.type === 'income' ? '+' : '-'}{Number(entry.amount).toLocaleString('ro-RO')} RON
                    </span>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-neutral-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Șterge tranzacție"
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

      {/* Cash Flow Timeline Calendar */}
      {entries.length > 0 && (
        <div className="bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
            <Clock className="w-5 h-5 text-accent" />
            <h3 className="text-md font-bold uppercase tracking-wider text-text">
              Calendar Flux de Numerar (Cash Flow Timeline)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {Object.entries(timelineByDay).map(([day, dayEntries]) => {
              const dayIncome = dayEntries.filter(e => e.type === 'income').reduce((acc, c) => acc + Number(c.amount), 0);
              const dayExpense = dayEntries.filter(e => e.type === 'expense').reduce((acc, c) => acc + Number(c.amount), 0);
              const netDay = dayIncome - dayExpense;

              return (
                <div key={day} className="bg-neutral-900/60 border border-neutral-800/40 p-3 rounded-xl flex flex-col justify-between space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-accent">Ziua {day}</span>
                    <span className="text-[9px] text-text-muted font-mono">{dayEntries.length} op.</span>
                  </div>

                  <div className="space-y-1">
                    {dayIncome > 0 && (
                      <div className="text-[11px] font-bold text-emerald-400 font-sans">
                        +{dayIncome.toLocaleString('ro-RO')}
                      </div>
                    )}
                    {dayExpense > 0 && (
                      <div className="text-[11px] font-bold text-rose-400 font-sans">
                        -{dayExpense.toLocaleString('ro-RO')}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-neutral-850 pt-1 text-[10px] text-text-muted truncate">
                    {dayEntries.map(e => e.category).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
