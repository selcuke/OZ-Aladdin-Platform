import React, { useState } from 'react';
import { RISK_SCENARIOS, MOCK_PORTFOLIO } from '../constants';
import { generateAladdinInsight } from '../services/geminiService';
import { AlertOctagon, RefreshCw, ChevronRight, Zap } from 'lucide-react';

const RiskAnalysis: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(RISK_SCENARIOS[0]);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    setAnalysisResult("");
    
    // Simulate API delay
    const context = `Portfolio: ${MOCK_PORTFOLIO.name}. Asset Allocation: Equity 65%, Fixed Income 25%. Scenario: ${selectedScenario.name} (${selectedScenario.description}). Est Impact: ${selectedScenario.impactEstimate}%.`;
    
    try {
        const result = await generateAladdinInsight(
            `Perform a stress test analysis for this portfolio under the selected scenario. Explain why the portfolio reacts this way and suggest hedging strategies.`,
            context
        );
        setAnalysisResult(result);
    } catch (e) {
        setAnalysisResult("Simulation failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-semibold text-white">Risk & Scenario Analysis</h1>
          <p className="text-slate-400 text-sm mt-1">Stress test portfolios against historical and hypothetical market events.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Scenario Selector */}
         <div className="lg:col-span-4 space-y-4">
           <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Select Scenario</h2>
           <div className="space-y-2">
             {RISK_SCENARIOS.map((scenario) => (
               <button
                 key={scenario.id}
                 onClick={() => {
                    setSelectedScenario(scenario);
                    setAnalysisResult(""); // Clear previous result
                 }}
                 className={`w-full text-left p-4 rounded-lg border transition-all ${
                   selectedScenario.id === scenario.id
                     ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/50'
                     : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                 }`}
               >
                 <div className="flex justify-between items-start">
                   <div>
                     <div className={`font-medium ${selectedScenario.id === scenario.id ? 'text-blue-400' : 'text-slate-200'}`}>
                       {scenario.name}
                     </div>
                     <div className="text-xs text-slate-500 mt-1">{scenario.description}</div>
                   </div>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                     scenario.probability === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                     scenario.probability === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                     'bg-slate-700 text-slate-300 border-slate-600'
                   }`}>
                     {scenario.probability} Prob
                   </span>
                 </div>
               </button>
             ))}
           </div>
         </div>

         {/* Simulation View */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Impact Projection</h3>
                  <button 
                    onClick={runSimulation}
                    disabled={loading}
                    className={`flex items-center px-4 py-2 rounded font-medium text-sm transition-all ${
                        loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                    }`}
                  >
                    {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                    {loading ? 'Simulating...' : 'Run Simulation'}
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-slate-900/50 rounded p-4 text-center border border-slate-800">
                     <div className="text-slate-500 text-xs uppercase font-medium">projected P&L</div>
                     <div className={`text-3xl font-bold mt-2 ${selectedScenario.impactEstimate < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {selectedScenario.impactEstimate}%
                     </div>
                     <div className="text-slate-400 text-xs mt-1">Estimated Value Change</div>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4 text-center border border-slate-800">
                     <div className="text-slate-500 text-xs uppercase font-medium">VaR Increase</div>
                     <div className="text-3xl font-bold mt-2 text-amber-500">
                        +12.5%
                     </div>
                     <div className="text-slate-400 text-xs mt-1">Value at Risk (95% Conf.)</div>
                  </div>
               </div>

               {/* AI Insight Box */}
               <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                     <AlertOctagon className="w-5 h-5 text-blue-400" />
                     <h4 className="font-medium text-slate-200">Aladdin Analysis</h4>
                  </div>
                  
                  {analysisResult ? (
                     <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed animate-in fade-in duration-500">
                         {analysisResult.split('\n').map((line, i) => (
                             <p key={i} className="mb-2">{line}</p>
                         ))}
                     </div>
                  ) : (
                     <div className="text-slate-500 text-sm italic py-4">
                        Run the simulation to generate a detailed AI risk report analyzing portfolio sensitivities and hedging opportunities.
                     </div>
                  )}
               </div>
            </div>

            <div className="flex justify-end">
               <button className="text-blue-400 text-sm flex items-center hover:text-blue-300 transition-colors">
                  View Full Stress Test Details <ChevronRight className="w-4 h-4 ml-1" />
               </button>
            </div>
         </div>
       </div>
    </div>
  );
};

export default RiskAnalysis;