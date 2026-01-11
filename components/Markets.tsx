import React from 'react';
import { YIELD_CURVE_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Globe, TrendingUp, BarChart2 } from 'lucide-react';

const Markets: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-semibold text-white">Global Markets</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time macro analysis and fixed income yield curves.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Curve */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                US Treasury Yield Curve
             </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={YIELD_CURVE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="tenor" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="yield" name="Current" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="lastYear" name="1 Year Ago" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
             Curve Inversion Watch: The 2Y/10Y spread is currently negative, signaling potential recessionary pressure.
          </p>
        </div>

        {/* Global Heatmap (Simplified) */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Sector Performance (Intraday)
             </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[300px]">
             {[
                { name: 'Tech', change: 1.2, size: 'col-span-1 row-span-2' },
                { name: 'Financials', change: -0.5, size: 'col-span-1' },
                { name: 'Energy', change: 2.1, size: 'col-span-1' },
                { name: 'Healthcare', change: 0.2, size: 'col-span-1' },
                { name: 'Consumer', change: -1.1, size: 'col-span-1' },
                { name: 'Utilities', change: 0.8, size: 'col-span-1' },
             ].map((sector) => (
                <div key={sector.name} className={`${sector.size} rounded bg-slate-700/50 border border-slate-600 p-4 flex flex-col justify-center items-center relative overflow-hidden group hover:border-slate-500 transition-all`}>
                   <div className={`absolute inset-0 opacity-10 ${sector.change > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                   <span className="text-sm font-bold text-slate-200 z-10">{sector.name}</span>
                   <span className={`text-lg font-bold z-10 ${sector.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {sector.change > 0 ? '+' : ''}{sector.change}%
                   </span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;