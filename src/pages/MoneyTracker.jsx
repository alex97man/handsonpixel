import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import TrackerTab from '../components/moneytracker/TrackerTab';
import RecurringTab from '../components/moneytracker/RecurringTab';
import ForecastTab from '../components/moneytracker/ForecastTab';
import AiAdvisorTab from '../components/moneytracker/AiAdvisorTab';
import { Sparkles, BrainCircuit, Wallet, CalendarRange, LogOut, KeyRound, Repeat } from 'lucide-react';

const CORRECT_HASH = '92fd12a8f05c016c3c53fbb646ed580e595f0177df9d21a26d469360b3667f22'; // SHA-256 for "Temporar.123"

// Helper to hash password
const hashPassword = async (password) => {
  const utf8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export default function MoneyTracker() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('tracker');
  const [entries, setEntries] = useState([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  
  // Default month: Current Year-Month (e.g. "2026-07")
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  // Verify auth on mount
  useEffect(() => {
    const savedHash = localStorage.getItem('moneytracker_auth_key');
    if (savedHash === CORRECT_HASH) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch entries when authenticated or month changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated, currentMonth]);

  const fetchEntries = async () => {
    setEntriesLoading(true);
    try {
      const { data, error } = await supabase
        .from('money_tracker_entries')
        .select('*')
        .eq('access_key_hash', CORRECT_HASH)
        .eq('month_year', currentMonth)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching entries:', err);
    } finally {
      setEntriesLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(false);
    
    try {
      const hashed = await hashPassword(password);
      if (hashed === CORRECT_HASH) {
        localStorage.setItem('moneytracker_auth_key', CORRECT_HASH);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error('Crypto error:', err);
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('moneytracker_auth_key');
    setIsAuthenticated(false);
    setEntries([]);
  };

  const handleAddEntry = async (newEntry) => {
    try {
      const { data, error } = await supabase
        .from('money_tracker_entries')
        .insert([
          {
            ...newEntry,
            access_key_hash: CORRECT_HASH
          }
        ])
        .select();

      if (error) throw error;
      
      // Prepend the new entry to local state
      if (data && data.length > 0) {
        setEntries(prev => [data[0], ...prev]);
      }
    } catch (err) {
      console.error('Error adding entry:', err);
      alert('Eroare la salvarea tranzacției în baza de date.');
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const { error } = await supabase
        .from('money_tracker_entries')
        .delete()
        .eq('id', id)
        .eq('access_key_hash', CORRECT_HASH);

      if (error) throw error;

      // Filter out deleted entry from state
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error deleting entry:', err);
      alert('Eroare la ștergerea tranzacției.');
    }
  };

  // Shared calculations for other tabs
  const totalIncome = entries.filter(e => e.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const netSavings = totalIncome - totalExpense;

  // ── Render Login Screen ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md bg-background-secondary border border-neutral-800/40 p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-4 bg-accent/10 rounded-2xl text-accent mb-2">
              <KeyRound className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-wider text-text font-sans">
              Money Tracker
            </h1>
            <p className="text-xs text-text-muted font-light max-w-[280px] mx-auto">
              Introduceți parola de acces pentru a deschide dashboard-ul financiar privat.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Parolă..."
                className={`w-full bg-neutral-900 border ${
                  loginError ? 'border-rose-500' : 'border-neutral-800'
                } rounded-xl px-4 py-3.5 text-text font-sans text-center text-lg focus:outline-none focus:border-accent transition-colors`}
              />
              {loginError && (
                <p className="text-xs text-rose-400 mt-1 text-center font-light">
                  Parolă incorectă. Încearcă din nou.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-background font-black uppercase tracking-wider py-3.5 rounded-xl transition-colors shadow-lg shadow-accent/10"
            >
              Deblochează
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Render Dashboard Screen ──
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 relative z-10 space-y-6">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-neutral-800/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent/10 rounded-xl text-accent">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-text font-sans flex items-center gap-2">
              Money Tracker <span className="text-[10px] text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-normal">Safe</span>
            </h2>
            <p className="text-xs text-text-muted font-light">Vizualizare, planificare și forecast inteligent.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-text-muted hover:text-rose-400 transition-colors text-xs font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Deconectare</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-800/20 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'tracker' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Tracker</span>
        </button>
        <button
          onClick={() => setActiveTab('recurring')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'recurring' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <Repeat className="w-4 h-4" />
          <span>Recurențe</span>
        </button>
        <button
          onClick={() => setActiveTab('forecast')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'forecast' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <CalendarRange className="w-4 h-4" />
          <span>Forecast</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'ai' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span className="flex items-center gap-1">
            Advisor AI
            <Sparkles className="w-3 h-3 text-accent animate-pulse" />
          </span>
        </button>
      </div>

      {/* Main Tab Render Content */}
      <div className="relative min-h-[400px]">
        {entriesLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-25 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
          </div>
        )}

        {activeTab === 'tracker' && (
          <TrackerTab 
            entries={entries}
            onAddEntry={handleAddEntry}
            onDeleteEntry={handleDeleteEntry}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        )}

        {activeTab === 'recurring' && (
          <RecurringTab
            entries={entries}
            onAddEntry={handleAddEntry}
            onDeleteEntry={handleDeleteEntry}
            currentMonth={currentMonth}
          />
        )}

        {activeTab === 'forecast' && (
          <ForecastTab 
            monthlySavings={netSavings} 
          />
        )}

        {activeTab === 'ai' && (
          <AiAdvisorTab 
            entries={entries}
            accessKeyHash={CORRECT_HASH}
            currentMonth={currentMonth}
          />
        )}
      </div>

    </div>
  );
}
