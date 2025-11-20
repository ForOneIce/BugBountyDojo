
import React from 'react';
import { Shield, Terminal, Trophy, Globe2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ui } from '../data/uiTranslations';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-slate-100 tracking-tight">
              BugBounty<span className="text-emerald-500">Dojo</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
              <Terminal className="w-4 h-4" />
              <span>{t(ui.systemOnline)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-bold">0 XP</span>
            </div>

            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition bg-slate-800 p-2 rounded-lg border border-slate-700"
                title="Switch Language"
            >
                <Globe2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase w-6 text-center">{language}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
