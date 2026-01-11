import React, { useState, useRef, useEffect } from 'react';
import { generateAladdinInsight } from '../services/geminiService';
import { MOCK_PORTFOLIO } from '../constants';
import { Send, User, BrainCircuit } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AladdinAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I am Aladdin. I can assist with portfolio optimization, risk queries, and market data analysis. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Construct dynamic context from current portfolio state
      const p = MOCK_PORTFOLIO;
      const holdingsList = p.assets.map(a => `${a.ticker} (${a.allocation}%, ESG: ${a.esgScore})`).join(', ');
      
      const contextData = `
        Portfolio Name: ${p.name} (ID: ${p.id})
        Manager: ${p.manager}
        Total AUM: ${(p.totalAum / 1000000000).toFixed(2)}B ${p.currency}
        Risk Level: ${p.riskLevel}
        YTD Return: ${p.ytdReturn}%
        Sharpe Ratio: ${p.sharpeRatio}
        Holdings: ${holdingsList}
      `.trim();

      const response = await generateAladdinInsight(userMsg, contextData);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I am currently unable to process that request due to a connection issue." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center gap-3">
        <div className="p-2 bg-blue-600/20 rounded-lg">
           <BrainCircuit className="w-6 h-6 text-blue-400" />
        </div>
        <div>
           <h2 className="font-semibold text-white">Aladdin Assistant</h2>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs text-slate-400">GenAI Online</span>
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-900'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <span className="text-xs font-bold text-blue-300">A</span>}
              </div>
              <div className={`p-4 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}>
                {msg.content.split('\n').map((line, i) => (
                    <div key={i} className={`${i > 0 ? 'mt-2' : ''}`}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-300">A</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg rounded-tl-none">
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/30">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Aladdin about portfolio risk, market correlations, or asset queries..."
            className="w-full bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 p-1.5 text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest">BlackRock Confidential | Internal Use Only</span>
        </div>
      </div>
    </div>
  );
};

export default AladdinAI;