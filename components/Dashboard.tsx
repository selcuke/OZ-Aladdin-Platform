import React, { useState, useEffect } from 'react';
import { MOCK_PORTFOLIO, MOCK_INDICES, CHART_DATA_PERFORMANCE } from '../constants';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, AlertTriangle, RefreshCw, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BENCHMARKS = [
  { id: 'sp500', name: 'S&P 500 Index', ytd: 8.4 },
  { id: 'msci', name: 'MSCI World', ytd: 6.2 },
  { id: 'agg', name: 'Bloomberg Global Agg', ytd: 1.5 },
  { id: 'nasdaq', name: 'NASDAQ 100', ytd: 14.1 },
  { id: 'custom', name: 'Custom Strategy', ytd: 5.0 }
];

const Dashboard: React.FC = () => {
  const [indices, setIndices] = useState(MOCK_INDICES);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedBenchmark, setSelectedBenchmark] = useState(BENCHMARKS[0]);

  useEffect(() => {
    // 3-second interval for "real-time" feel
    const interval = setInterval(() => {
      setIndices(currentIndices => 
        currentIndices.map(index => {
          // Simulate realistic market movement (random walk)
          // Reduced volatility for faster update frequency (0.05% max per tick)
          const volatility = 0.0005;
          const drift = (Math.random() * 2 - 1) * volatility;
          
          const newValue = index.value * (1 + drift);
          // Update daily change % based on the drift
          const newChange = index.change + (drift * 100);

          return {
            ...index,
            value: Number(newValue.toFixed(2)),
            change: Number(newChange.toFixed(2))
          };
        })
      );
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const alpha = MOCK_PORTFOLIO.ytdReturn - selectedBenchmark.ytd;
  const maxVal = Math.max(MOCK_PORTFOLIO.ytdReturn, selectedBenchmark.ytd) * 1.2;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total AUM</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {(MOCK_PORTFOLIO.totalAum / 1000000000).toFixed(2)}B
            </span>
            <span className="text-xs font-medium text-slate-500">{MOCK_PORTFOLIO.currency}</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-400">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            <span>+1.2% Today</span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Risk Level (VaR)</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">
              {MOCK_PORTFOLIO.riskLevel}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-400">
             <Activity className="w-3 h-3 mr-1" />
             <span>Sharpe Ratio: {MOCK_PORTFOLIO.sharpeRatio}</span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">YTD Return</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">
              +{MOCK_PORTFOLIO.ytdReturn}%
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-400">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>vs Benchmark +8.4%</span>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Alerts</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">3</span>
            <span className="text-xs text-red-400 font-medium">1 Critical</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-400">
            <AlertTriangle className="w-3 h-3 mr-1" />
            <span>Portfolio Drift > 0.5%</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Chart + Benchmark) */}
        <div className="lg:col-span-2 space-y-6">
            {/* Chart Section */}
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-white">Performance Analytics</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-500">1M</button>
                  <button className="px-3 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded hover:bg-slate-600">3M</button>
                  <button className="px-3 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded hover:bg-slate-600">YTD</button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA_PERFORMANCE}>
                    <defs>
                      <linearGradient id="colorPf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Area type="monotone" dataKey="portfolio" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPf)" strokeWidth={2} name="Portfolio" />
                    <Area type="monotone" dataKey="benchmark" stroke="#64748b" fillOpacity={1} fill="url(#colorBm)" strokeWidth={2} strokeDasharray="5 5" name="Benchmark" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Benchmark Comparison Section */}
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-medium text-white">YTD Benchmark Comparison</h2>
                    </div>
                    <select 
                        className="bg-slate-700 text-slate-200 text-sm rounded border border-slate-600 p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
                        value={selectedBenchmark.id}
                        onChange={(e) => setSelectedBenchmark(BENCHMARKS.find(b => b.id === e.target.value) || BENCHMARKS[0])}
                    >
                        {BENCHMARKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Alpha Stats */}
                    <div className="flex-shrink-0 text-center md:text-left bg-slate-900/50 p-4 rounded border border-slate-800 min-w-[140px]">
                        <div className="text-slate-500 text-xs uppercase font-medium tracking-wider mb-1">Alpha Generated</div>
                        <div className={`text-3xl font-bold ${alpha >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                           {alpha > 0 ? '+' : ''}{alpha.toFixed(2)}%
                        </div>
                        <div className="text-slate-400 text-xs mt-1">vs {selectedBenchmark.name}</div>
                    </div>

                    {/* Bars */}
                    <div className="flex-1 w-full space-y-5">
                        {/* Portfolio Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-white">{MOCK_PORTFOLIO.name}</span>
                                <span className="font-bold text-blue-400">{MOCK_PORTFOLIO.ytdReturn.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                <div 
                                    className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out" 
                                    style={{ width: `${(MOCK_PORTFOLIO.ytdReturn / maxVal) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Benchmark Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-300">{selectedBenchmark.name}</span>
                                <span className="font-bold text-slate-400">{selectedBenchmark.ytd.toFixed(2)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                <div 
                                    className="bg-slate-400 h-full rounded-full transition-all duration-500 ease-out" 
                                    style={{ width: `${(selectedBenchmark.ytd / maxVal) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Market Feed (Right Column) */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-medium text-white">Market Overview</h2>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Live</span>
             </div>
          </div>
          
          <div className="space-y-4">
            {indices.map((idx) => (
              <div key={idx.name} className="flex justify-between items-center py-3 border-b border-slate-700 last:border-0">
                <div>
                  <div className="text-sm font-medium text-slate-200">{idx.name}</div>
                  <div className="text-xs text-slate-500">Global Index</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{idx.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className={`text-xs font-medium flex items-center justify-end ${idx.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {idx.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {Math.abs(idx.change).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-700">
             <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-white">Aladdin Insight</h3>
                <span className="text-[10px] text-slate-500">{lastUpdated.toLocaleTimeString()}</span>
             </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Volatility is ticking up in the Fixed Income sector as treasury yields fluctuate. Recommend reviewing duration exposure in the Global Equity Alpha Fund to mitigate rate sensitivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;