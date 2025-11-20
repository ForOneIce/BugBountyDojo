
import React, { useState, useEffect, useRef } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ui } from '../data/uiTranslations';

const GeminiTutor: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Reset history when language changes? Optional. keeping it simple for now.
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: language === 'zh' ? "你好，猎人。我是 Sensei。关于漏洞有什么想问的吗？" : "Greetings, hunter. I am Sensei. Ask me anything about these vulnerabilities." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newHistory = [...history, userMsg];
    
    setHistory(newHistory);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(newHistory, input, language);
    
    setHistory([...newHistory, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900 rounded-t-xl">
        <Bot className="text-emerald-500 w-6 h-6" />
        <div>
            <h3 className="font-bold text-slate-100">{t(ui.aiName)}</h3>
            <p className="text-xs text-slate-400">{t(ui.aiSubtitle)}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30' 
                : 'bg-emerald-900/20 text-emerald-100 border border-emerald-500/30'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
             </div>
             <div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-400 flex items-center gap-1">
                {t(ui.aiThinking)}<span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800 rounded-b-xl">
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
            placeholder={t(ui.aiPlaceholder)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiTutor;
