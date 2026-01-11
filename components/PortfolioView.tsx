import React, { useState } from 'react';
import { MOCK_PORTFOLIO, CHART_DATA_ALLOCATION } from '../constants';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis as BXAxis, YAxis as BYAxis } from 'recharts';
import { Download, Filter, MoreHorizontal, Briefcase, Leaf } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#64748b'];

const PortfolioView: React.FC = () => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [orderType, setOrderType] = useState('BUY');

  return (
    <div className="space-y-6 relative">
      {/* Trade Modal */}
      {isTradeModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                 <h3 className="font-semibold text-white">New Order Entry</h3>
                 <button onClick={() => setIsTradeModalOpen(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <div className="p-6 space-y-4">
                 <div className="flex bg-slate-800 rounded p-1">
                    <button onClick={() => setOrderType('BUY')} className={`flex-1 py-1.5 text-sm font-medium rounded ${orderType === 'BUY' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>Buy</button>
                    <button onClick={() => setOrderType('SELL')} className={`flex-1 py-1.5 text-sm font-medium rounded ${orderType === 'SELL' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}>Sell</button>
                 </div>
                 <div>
                    <label className="block text-xs text-slate-400 mb-1">Ticker</label>
                    <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. MSFT" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs text-slate-400 mb-1">Quantity</label>
                       <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div>
                       <label className="block text-xs text-slate-400 mb-1">Limit Price</label>
                       <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                 </div>
                 <button onClick={() => setIsTradeModalOpen(false)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded font-medium mt-2">
                    Submit Order
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">{MOCK_PORTFOLIO.name}</h1>
          <p className="text-slate-400 text-sm mt-1">Managed by: {MOCK_PORTFOLIO.manager} | ID: {MOCK_PORTFOLIO.id}</p>
        </div>
        <div className="flex gap-2">
          <button 
             onClick={() => setIsTradeModalOpen(true)}
             className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500 text-sm font-medium shadow-lg shadow-emerald-900/20"
          >
            <Briefcase className="w-4 h-4 mr-2" /> Trade
          </button>
          <button className="flex items-center px-3 py-2 bg-slate-800 text-slate-300 rounded border border-slate-700 hover:bg-slate-700 text-sm">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Chart */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Asset Allocation</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHART_DATA_ALLOCATION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHART_DATA_ALLOCATION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ESG Scorecard (New) */}
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col">
           <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              ESG & Sustainability
           </h3>
           <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-end justify-between mb-2">
                 <span className="text-slate-400 text-sm">Portfolio Score</span>
                 <span className="text-2xl font-bold text-white">84<span className="text-sm font-normal text-slate-500">/100</span></span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-6">
                 <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full" style={{ width: '84%' }}></div>
              </div>
              
              <div className="h-[120px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                       { name: 'Env', val: 88 },
                       { name: 'Soc', val: 76 },
                       { name: 'Gov', val: 92 },
                    ]}>
                       <BXAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                       <Tooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                       <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Top Holdings Table */}
        <div className="lg:col-span-3 bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-700">
             <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Top Holdings</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-900/50 text-xs uppercase font-medium text-slate-500">
                <tr>
                  <th className="px-6 py-3">Ticker</th>
                  <th className="px-6 py-3">Asset Name</th>
                  <th className="px-6 py-3">Sector</th>
                  <th className="px-6 py-3 text-right">Allocation %</th>
                  <th className="px-6 py-3 text-right">Market Value</th>
                  <th className="px-6 py-3 text-right">Daily Chg %</th>
                  <th className="px-6 py-3 text-right">ESG</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {MOCK_PORTFOLIO.assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{asset.ticker}</td>
                    <td className="px-6 py-4">{asset.name}</td>
                    <td className="px-6 py-4 text-xs">
                        <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">{asset.sector}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white">{asset.allocation.toFixed(2)}%</td>
                    <td className="px-6 py-4 text-right">${(asset.marketValue / 1000000).toFixed(1)}M</td>
                    <td className={`px-6 py-4 text-right font-medium ${asset.dailyChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {asset.dailyChange > 0 ? '+' : ''}{asset.dailyChange}%
                    </td>
                    <td className="px-6 py-4 text-right">
                       {asset.esgScore > 0 ? <span className="text-emerald-400 font-medium">{asset.esgScore}</span> : <span className="text-slate-600">-</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;