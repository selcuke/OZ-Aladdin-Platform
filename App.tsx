import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PortfolioView from './components/PortfolioView';
import RiskAnalysis from './components/RiskAnalysis';
import AladdinAI from './components/AladdinAI';
import Markets from './components/Markets';
import Reports from './components/Reports';
import { Search, Bell, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
        <Sidebar />
        
        <div className="lg:pl-64 flex flex-col min-h-screen">
          {/* Top Navigation Bar */}
          <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 flex items-center justify-between px-6">
            <div className="flex-1 max-w-xl">
               <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Search tickers, portfolios, or risk reports..." 
                    className="w-full bg-slate-800 border border-transparent focus:border-blue-500/50 rounded-md py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-slate-500"
                 />
               </div>
            </div>
            
            <div className="flex items-center gap-4 ml-4">
              <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
              </button>
              <div className="h-6 w-px bg-slate-700"></div>
              <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                 <UserCircle className="w-8 h-8 text-slate-500" />
                 <span className="hidden md:block">J. Doe (PM)</span>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/portfolio" element={<PortfolioView />} />
                <Route path="/risk" element={<RiskAnalysis />} />
                <Route path="/ai" element={<AladdinAI />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;