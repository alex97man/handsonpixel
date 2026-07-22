import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, HelpCircle } from 'lucide-react';

export default function ForecastTab({ monthlySavings }) {
  const defaultSavings = monthlySavings > 0 ? monthlySavings : 1000;
  
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(8);
  const [contribution, setContribution] = useState(defaultSavings);
  const [selectedProfile, setSelectedProfile] = useState('custom');

  // Update contribution when monthlySavings changes, but only if they haven't customized it much yet
  useEffect(() => {
    if (monthlySavings > 0) {
      setContribution(monthlySavings);
    }
  }, [monthlySavings]);

  const riskProfiles = {
    conservative: { name: 'Conservator', rate: 6, icon: ShieldCheck, color: 'text-emerald-400', desc: 'Depozite, Titluri de stat. Risc minim.' },
    moderate: { name: 'Moderat', rate: 9, icon: TrendingUp, color: 'text-accent', desc: 'ETF-uri globale, Imobiliare. Risc mediu.' },
    dynamic: { name: 'Dinamic', rate: 15, icon: AlertTriangle, color: 'text-amber-400', desc: 'Acțiuni individuale, Crypto. Risc ridicat.' }
  };

  const handleProfileSelect = (key) => {
    setSelectedProfile(key);
    setAnnualRate(riskProfiles[key].rate);
  };

  const calculateCompoundInterest = (p, rPercent, y) => {
    const monthlyRate = (rPercent / 100) / 12;
    const totalMonths = y * 12;
    
    if (monthlyRate === 0) {
      const principal = p * totalMonths;
      return { total: principal, principal, interest: 0 };
    }
    
    // Formula for future value of ordinary annuity: PMT * [((1 + r)^n - 1) / r]
    const total = p * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    const principal = p * totalMonths;
    const interest = Math.max(0, total - principal);
    
    return { total, principal, interest };
  };

  const currentCalc = calculateCompoundInterest(contribution, annualRate, years);

  // Generate data points for the SVG chart (e.g. 6 points: Year 0, Year Y/5, Year 2Y/5, etc.)
  const chartPoints = [];
  const intervals = 5;
  for (let i = 0; i <= intervals; i++) {
    const currentYear = Math.round((years / intervals) * i);
    const calc = calculateCompoundInterest(contribution, annualRate, currentYear);
    chartPoints.push({
      year: currentYear,
      principal: calc.principal,
      interest: calc.interest,
      total: calc.total
    });
  }

  // Find max value for chart scaling
  const maxVal = chartPoints[intervals].total || 1000;

  // SVG dimensions
  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 30, left: 75 };

  // Convert data points to SVG coordinates
  const pointsList = chartPoints.map((pt, i) => {
    const x = padding.left + (i / intervals) * (width - padding.left - padding.right);
    // Y points (0 at bottom, maxVal at top)
    const yTotal = height - padding.bottom - (pt.total / maxVal) * (height - padding.top - padding.bottom);
    const yPrincipal = height - padding.bottom - (pt.principal / maxVal) * (height - padding.top - padding.bottom);
    return { x, yTotal, yPrincipal, ...pt };
  });

  // SVG path definitions
  const totalAreaPath = pointsList.length > 0 
    ? `M ${pointsList[0].x} ${height - padding.bottom} ` + 
      pointsList.map(pt => `L ${pt.x} ${pt.yTotal}`).join(' ') + 
      ` L ${pointsList[pointsList.length - 1].x} ${height - padding.bottom} Z`
    : '';

  const principalAreaPath = pointsList.length > 0
    ? `M ${pointsList[0].x} ${height - padding.bottom} ` +
      pointsList.map(pt => `L ${pt.x} ${pt.yPrincipal}`).join(' ') +
      ` L ${pointsList[pointsList.length - 1].x} ${height - padding.bottom} Z`
    : '';

  const totalLinePath = pointsList.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.yTotal}`).join(' ');

  return (
    <div className="space-y-6">
      {/* Risk Profiles */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">Profile de Risc Predefinite</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(riskProfiles).map(([key, prof]) => {
            const IconComp = prof.icon;
            const isSelected = selectedProfile === key;
            const calc = calculateCompoundInterest(contribution, prof.rate, years);
            return (
              <button
                key={key}
                onClick={() => handleProfileSelect(key)}
                className={`p-4 rounded-2xl border text-left backdrop-blur-md transition-all ${
                  isSelected 
                    ? 'bg-accent/10 border-accent/60 shadow-lg shadow-accent/5' 
                    : 'bg-background-secondary border-neutral-800/40 hover:border-neutral-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-text text-sm uppercase tracking-wide">{prof.name}</span>
                  <IconComp className={`w-5 h-5 ${prof.color}`} />
                </div>
                <div className="text-xs text-text-muted mb-3 font-light min-h-[32px]">{prof.desc}</div>
                <div className="border-t border-neutral-850 pt-2 flex justify-between items-baseline">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Randament:</span>
                  <span className={`text-lg font-black font-sans ${prof.color}`}>{prof.rate}% / an</span>
                </div>
                <div className="mt-1 flex justify-between items-baseline">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Suma estimată:</span>
                  <span className="text-sm font-bold text-text font-sans">
                    {Math.round(calc.total).toLocaleString('ro-RO')} RON
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders and Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders column */}
        <div className="lg:col-span-5 bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md space-y-5">
          <h3 className="text-md font-bold uppercase tracking-wider text-accent border-b border-neutral-800 pb-2">
            Ajustare Parametri
          </h3>

          {/* Monthly Savings Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Depunere lunară</label>
              <span className="text-md font-bold text-text font-sans">{contribution.toLocaleString('ro-RO')} RON</span>
            </div>
            <input
              type="range"
              min="50"
              max="50000"
              step="50"
              value={contribution}
              onChange={e => {
                setContribution(Number(e.target.value));
                setSelectedProfile('custom');
              }}
              className="w-full accent-accent bg-neutral-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>50 RON</span>
              <span>50.000 RON</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Dobândă / Randament anual</label>
              <span className="text-md font-bold text-accent font-sans">{annualRate}% / an</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={annualRate}
              onChange={e => {
                setAnnualRate(Number(e.target.value));
                setSelectedProfile('custom');
              }}
              className="w-full accent-accent bg-neutral-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Years Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted font-sans">Perioadă economisire</label>
              <span className="text-md font-bold text-text font-sans">{years} ani</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={e => setYears(Number(e.target.value))}
              className="w-full accent-accent bg-neutral-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>1 an</span>
              <span>40 ani</span>
            </div>
          </div>
        </div>

        {/* Calculations Results & Custom Chart */}
        <div className="lg:col-span-7 bg-background-secondary border border-neutral-800/40 p-5 rounded-2xl backdrop-blur-md flex flex-col">
          <h3 className="text-md font-bold uppercase tracking-wider text-accent border-b border-neutral-800 pb-2 mb-4">
            Proiecție Evoluție
          </h3>

          {/* Core outputs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-neutral-900/40 border border-neutral-800/20 p-3 rounded-xl">
              <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Total depus</div>
              <div className="text-md font-bold text-text font-sans mt-1">
                {Math.round(currentCalc.principal).toLocaleString('ro-RO')} <span className="text-[10px] font-normal">RON</span>
              </div>
            </div>
            <div className="bg-neutral-900/40 border border-neutral-800/20 p-3 rounded-xl">
              <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold text-accent">Dobândă acumulată</div>
              <div className="text-md font-bold text-accent font-sans mt-1">
                {Math.round(currentCalc.interest).toLocaleString('ro-RO')} <span className="text-[10px] font-normal">RON</span>
              </div>
            </div>
            <div className="bg-neutral-900/40 border border-neutral-800/20 p-3 rounded-xl">
              <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Suma totală</div>
              <div className="text-md font-black text-text font-sans mt-1">
                {Math.round(currentCalc.total).toLocaleString('ro-RO')} <span className="text-[10px] font-normal">RON</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="relative flex-grow flex items-center justify-center min-h-[220px]">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = padding.top + ratio * (height - padding.top - padding.bottom);
                const value = Math.round(maxVal * (1 - ratio));
                return (
                  <g key={idx} className="opacity-20">
                    <line 
                      x1={padding.left} 
                      y1={y} 
                      x2={width - padding.right} 
                      y2={y} 
                      stroke="#8A8A8A" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />
                    <text 
                      x={padding.left - 8} 
                      y={y + 4} 
                      fill="#8A8A8A" 
                      fontSize="9" 
                      fontWeight="bold"
                      textAnchor="end"
                      className="font-sans"
                    >
                      {value >= 1000000 
                        ? `${(value / 1000000).toFixed(1)}M` 
                        : value >= 1000 
                          ? `${(value / 1000).toFixed(0)}k` 
                          : value}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Areas */}
              {/* Total Future Value Area (Deposited + Interest) */}
              <path 
                d={totalAreaPath} 
                fill="url(#totalGlowGrad)" 
                opacity="0.15"
              />
              {/* Principal Deposited Area */}
              <path 
                d={principalAreaPath} 
                fill="#8A8A8A" 
                opacity="0.1"
              />

              {/* Area boundaries */}
              <path 
                d={totalLinePath} 
                fill="none" 
                stroke="#3fb7bc" 
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path 
                d={pointsList.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.yPrincipal}`).join(' ')} 
                fill="none" 
                stroke="#8A8A8A" 
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Points Markers & Tooltip Text */}
              {pointsList.map((pt, idx) => (
                <g key={idx}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.yTotal} 
                    r="4" 
                    fill="#0A0A0A" 
                    stroke="#3fb7bc" 
                    strokeWidth="2" 
                  />
                  <text 
                    x={pt.x} 
                    y={height - 8} 
                    fill="#8A8A8A" 
                    fontSize="9.5" 
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-sans"
                  >
                    An {pt.year}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <g transform={`translate(${padding.left + 15}, ${padding.top - 8})`}>
                <circle cx="0" cy="0" r="4" fill="#3fb7bc" />
                <text x="8" y="3" fill="#8A8A8A" fontSize="9" fontWeight="bold">Suma totală (cu dobândă)</text>
                <circle cx="150" cy="0" r="4" fill="#8A8A8A" />
                <text x="158" y="3" fill="#8A8A8A" fontSize="9" fontWeight="bold">Doar depunerile tale</text>
              </g>

              {/* Gradient definition */}
              <defs>
                <linearGradient id="totalGlowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3fb7bc" />
                  <stop offset="100%" stopColor="#3fb7bc" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
