import React, { useState, useEffect } from 'react';
import { Sparkles, Send, BrainCircuit, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';

export default function AiAdvisorTab({ entries, accessKeyHash }) {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Custom chat states
  const [customQuestion, setCustomQuestion] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Calculate snapshot data from entries
  const incomeEntries = entries.filter(e => e.type === 'income');
  const expenseEntries = entries.filter(e => e.type === 'expense');

  const totalIncome = incomeEntries.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = expenseEntries.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const remaining = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((remaining / totalIncome) * 100)) : 0;

  // Group expenses by category
  const expensesByCategory = expenseEntries.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  // Group recurring expenses
  const recurringExpenses = expenseEntries
    .filter(e => e.is_recurring)
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const fetchAdvice = async () => {
    if (totalIncome === 0 && totalExpense === 0) {
      setError("Te rog să adaugi câteva venituri sau cheltuieli în tab-ul 'Tracker' mai întâi pentru ca AI-ul să aibă date de analizat.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessKeyHash,
          action: 'general_advice',
          snapshot: {
            totalIncome,
            totalExpense,
            remaining,
            savingsRate,
            recurringExpenses,
            expensesByCategory,
            entriesCount: entries.length
          }
        })
      });

      if (!response.ok) {
        throw new Error('Nu am putut contacta consilierul AI. Asigură-te că cheia API este configurată în Vercel.');
      }

      const data = await response.json();
      setAdvice(data.advice);
    } catch (err) {
      console.error(err);
      setError(err.message || 'A apărut o eroare la generarea sfaturilor.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch advice automatically on mount if entries are present and advice is not yet loaded
  useEffect(() => {
    if (entries.length > 0 && !advice && !loading && !error) {
      fetchAdvice();
    }
  }, [entries]);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!customQuestion.trim() || chatLoading) return;

    const userMsg = customQuestion.trim();
    setCustomQuestion('');
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessKeyHash,
          action: 'ask_question',
          question: userMsg,
          snapshot: {
            totalIncome,
            totalExpense,
            remaining,
            savingsRate,
            recurringExpenses,
            expensesByCategory
          },
          chatHistory: chatLog.slice(-4) // Send last 4 messages for local context
        })
      });

      if (!response.ok) {
        throw new Error('Eroare la obținerea răspunsului de la AI.');
      }

      const data = await response.json();
      setChatLog(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { sender: 'ai', text: 'Scuze, a apărut o eroare și nu am putut răspunde la întrebare: ' + err.message }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background-secondary border border-neutral-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-text text-md uppercase tracking-wider">Consilier Financiar Inteligent (AI)</h4>
            <p className="text-xs text-text-muted font-light">Analizează automat bugetul tău curent și oferă sfaturi personalizate.</p>
          </div>
        </div>
        <button
          onClick={fetchAdvice}
          disabled={loading || entries.length === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-accent text-accent hover:text-background hover:bg-accent font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{advice ? 'Actualizează Analiză' : 'Generează Analiză'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl text-rose-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm font-light">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: General Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-background-secondary border border-neutral-800/40 p-8 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center min-h-[350px] space-y-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                <Sparkles className="w-5 h-5 text-accent absolute top-3.5 left-3.5 animate-pulse" />
              </div>
              <p className="text-sm text-text font-medium">Se analizează datele bugetului...</p>
              <p className="text-xs text-text-muted font-light text-center max-w-xs">AI-ul calculează rata de economisire, analizează distribuția cheltuielilor recurente și formulează prognoza.</p>
            </div>
          ) : advice ? (
            <div className="bg-background-secondary border border-neutral-800/40 p-6 rounded-2xl backdrop-blur-md space-y-4">
              <h3 className="text-md font-bold uppercase tracking-wider text-accent border-b border-neutral-800 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Recomandări Bugetare
              </h3>
              
              {/* Render MarkDown/Text nicely formatted */}
              <div className="prose prose-invert max-w-none text-sm text-text-muted leading-relaxed font-light space-y-4">
                {advice.split('\n\n').map((paragraph, idx) => {
                  // Basic formatting for headers and lists
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={idx} className="text-text font-bold text-sm uppercase tracking-wide mt-4 text-emerald-400">
                        {paragraph.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('-') || paragraph.startsWith('*')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1.5 mt-2">
                        {paragraph.split('\n').map((li, lIdx) => (
                          <li key={lIdx} className="font-light">
                            {li.replace(/^[-*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-background-secondary border border-neutral-800/40 p-8 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center min-h-[350px] text-text-muted space-y-3">
              <BrainCircuit className="w-12 h-12 text-neutral-700" />
              <h4 className="font-bold text-text-muted text-sm uppercase tracking-wide">Analiză AI Inactivă</h4>
              <p className="text-xs text-center max-w-sm font-light">
                Apasă pe butonul **„Generează Analiză”** din dreapta sus pentru ca AI-ul să îți analizeze veniturile și cheltuielile lunii și să îți ofere un ghid personalizat.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Q&A Financial Coach Chat */}
        <div className="lg:col-span-5 bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md flex flex-col min-h-[400px]">
          <h3 className="text-md font-bold uppercase tracking-wider text-accent border-b border-neutral-800 pb-2 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-accent" />
            Adresează o Întrebare
          </h3>

          {/* Chat area */}
          <div className="flex-grow bg-neutral-950/40 border border-neutral-900 rounded-xl p-3 mb-3 overflow-y-auto max-h-[300px] flex flex-col space-y-3 min-h-[220px]">
            {chatLog.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-text-muted text-center space-y-2 py-4">
                <HelpCircle className="w-8 h-8 text-neutral-850" />
                <p className="text-xs font-light">Pune o întrebare legată de bugetul tău curent.</p>
                <div className="flex flex-wrap gap-1 justify-center max-w-xs">
                  {['Cum obțin fond de urgență?', 'Unde pot economisi?', 'E fezabil să investesc?'].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setCustomQuestion(q)}
                      className="text-[9px] bg-neutral-900 border border-neutral-800 hover:border-accent text-text-muted hover:text-accent px-2 py-1 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatLog.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-normal font-sans ${
                    msg.sender === 'user' 
                      ? 'bg-accent/15 border border-accent/20 self-end text-text' 
                      : 'bg-neutral-900 border border-neutral-850 self-start text-text-muted font-light whitespace-pre-wrap'
                  }`}
                >
                  <span className="font-black uppercase text-[8px] tracking-wider mb-1 text-accent/60">
                    {msg.sender === 'user' ? 'Tu' : 'Advisor AI'}
                  </span>
                  {msg.text}
                </div>
              ))
            )}
            
            {chatLoading && (
              <div className="bg-neutral-900 border border-neutral-850 rounded-2xl p-3 self-start max-w-[85%] flex items-center gap-2 text-xs text-text-muted font-sans font-light">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span>Advisor AI scrie...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <input
              type="text"
              required
              disabled={chatLoading || entries.length === 0}
              value={customQuestion}
              onChange={e => setCustomQuestion(e.target.value)}
              placeholder={entries.length === 0 ? "Introdu date în Tracker..." : "Ex: Merită să investesc 200 RON în..."}
              className="flex-grow bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-accent transition-colors disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={chatLoading || !customQuestion.trim() || entries.length === 0}
              className="bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:pointer-events-none text-background p-2.5 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
