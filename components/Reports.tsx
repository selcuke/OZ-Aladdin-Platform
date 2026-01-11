import React from 'react';
import { COMPLIANCE_RULES } from '../constants';
import { FileText, CheckCircle, AlertTriangle, XCircle, Download } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-semibold text-white">Compliance & Reporting</h1>
           <p className="text-slate-400 text-sm mt-1">Monitor portfolio mandates and generate investor reports.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium flex items-center">
           <Download className="w-4 h-4 mr-2" />
           Download EOD Pack
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Compliance Rules Table */}
         <div className="lg:col-span-2 bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
               <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Active Mandate Rules</h3>
            </div>
            <table className="w-full text-left text-sm text-slate-400">
               <thead className="bg-slate-900/50 text-xs uppercase font-medium text-slate-500">
                  <tr>
                     <th className="px-6 py-3">Rule Name</th>
                     <th className="px-6 py-3">Status</th>
                     <th className="px-6 py-3">Limit</th>
                     <th className="px-6 py-3">Current</th>
                     <th className="px-6 py-3">Severity</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-700">
                  {COMPLIANCE_RULES.map((rule) => (
                     <tr key={rule.id} className="hover:bg-slate-700/30">
                        <td className="px-6 py-4 font-medium text-slate-200">{rule.ruleName}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center">
                              {rule.status === 'Passed' && <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />}
                              {rule.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />}
                              {rule.status === 'Failed' && <XCircle className="w-4 h-4 text-red-500 mr-2" />}
                              <span className={
                                 rule.status === 'Passed' ? 'text-emerald-400' : 
                                 rule.status === 'Warning' ? 'text-amber-400' : 'text-red-400'
                              }>{rule.status}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">{rule.limit}</td>
                        <td className="px-6 py-4">{rule.currentValue}</td>
                        <td className="px-6 py-4">
                           <span className={`text-xs px-2 py-1 rounded border ${
                              rule.severity === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                              rule.severity === 'Medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                              'bg-slate-700 border-slate-600 text-slate-300'
                           }`}>
                              {rule.severity}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Generated Reports */}
         <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Recent Reports</h3>
            <div className="space-y-3">
               {[
                  { name: 'Daily Risk Pack', date: 'Today, 08:00 AM', size: '2.4 MB' },
                  { name: 'Monthly Performance Attribution', date: 'Oct 31, 2023', size: '5.1 MB' },
                  { name: 'ESG Impact Statement', date: 'Oct 15, 2023', size: '1.8 MB' },
                  { name: 'Tax Efficiency Report', date: 'Sep 30, 2023', size: '3.2 MB' },
               ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded bg-slate-900/50 border border-slate-800 hover:border-slate-600 cursor-pointer transition-colors group">
                     <div className="flex items-center">
                        <div className="p-2 bg-slate-800 rounded text-blue-400 mr-3">
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{report.name}</div>
                           <div className="text-xs text-slate-500">{report.date}</div>
                        </div>
                     </div>
                     <div className="text-xs text-slate-600">{report.size}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;