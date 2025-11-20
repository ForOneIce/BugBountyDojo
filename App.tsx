
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SQLiDemo from './components/SQLiDemo';
import XSSDemo from './components/XSSDemo';
import IDORDemo from './components/IDORDemo';
import CommandInjectionDemo from './components/CommandInjectionDemo';
import CSRFDemo from './components/CSRFDemo';
import GeminiTutor from './components/GeminiTutor';
import Quiz from './components/Quiz';
import { modules } from './data/modules';
import { ui } from './data/uiTranslations';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { BookOpen, Code, ArrowRight, Lock, Database, Terminal, Globe } from 'lucide-react';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  
  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];

  const renderDemo = () => {
    switch(activeModule.interactiveType) {
        case 'sqli': return <SQLiDemo />;
        case 'xss': return <XSSDemo />;
        case 'idor': return <IDORDemo />;
        case 'command_injection': return <CommandInjectionDemo />;
        case 'csrf': return <CSRFDemo />;
        default: return <div className="p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">Simulation Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
          {/* Left Sidebar: Curriculum */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t(ui.operations)}</h2>
            <div className="space-y-2">
                {modules.map((mod) => (
                    <button 
                        key={mod.id}
                        onClick={() => setActiveModuleId(mod.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                            activeModuleId === mod.id 
                            ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        <div className={`p-2 rounded-md ${activeModuleId === mod.id ? 'bg-emerald-900/50' : 'bg-slate-800'}`}>
                            {mod.icon === 'Database' && <Database className="w-4 h-4" />}
                            {mod.icon === 'Code' && <Code className="w-4 h-4" />}
                            {mod.icon === 'Lock' && <Lock className="w-4 h-4" />}
                            {mod.icon === 'Terminal' && <Terminal className="w-4 h-4" />}
                            {mod.icon === 'Globe' && <Globe className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm truncate">{t(mod.title)}</div>
                            <div className="text-xs opacity-70 truncate">{mod.difficulty}</div>
                        </div>
                        {activeModuleId === mod.id && <ArrowRight className="w-4 h-4" />}
                    </button>
                ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-slate-700/50">
                <h3 className="font-bold text-slate-200 mb-2">{t(ui.proTipTitle)}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                    {t(ui.proTipContent)}
                </p>
            </div>
          </div>

          {/* Center: Content & Demo */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header */}
            <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase">
                        {t(activeModule.category)}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> 5 {t(ui.readTime)}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{t(activeModule.title)}</h1>
                <p className="text-slate-400 text-lg">{t(activeModule.shortDescription)}</p>
            </div>

            {/* Educational Content */}
            <div className="prose prose-invert prose-emerald max-w-none text-slate-300">
                {t(activeModule.content).split('\n').map((line, i) => {
                    if (line.startsWith('###')) return <h3 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('###', '')}</h3>;
                    if (line.startsWith('`')) return <pre key={i} className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800 text-blue-300">{line.replace(/`/g, '')}</pre>;
                    if (line.startsWith('-')) return <li key={i} className="ml-4 list-disc">{line.replace('-', '')}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i}>{line}</p>;
                })}
            </div>

            {/* Interactive Demo */}
            <div className="mt-8">
                {renderDemo()}
            </div>

            {/* Quiz Section */}
            <div className="mt-12 pt-8 border-t border-slate-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-blue-500" /> {t(ui.knowledgeCheck)}
                </h2>
                <Quiz key={activeModuleId} questions={activeModule.quiz} />
            </div>
          </div>

          {/* Right Sidebar: AI Assistant */}
          <div className="lg:col-span-3">
             <div className="sticky top-24">
                <GeminiTutor />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
