
import React, { useState, useEffect } from 'react';
import { Search, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SQLiDemo: React.FC = () => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [query, setQuery] = useState('');
  const [isVulnerable, setIsVulnerable] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  useEffect(() => {
    const builtQuery = `SELECT * FROM users WHERE username = '${username}'`;
    setQuery(builtQuery);

    if (username.includes("'") && (username.toLowerCase().includes("or") || username.includes("||"))) {
        if (builtQuery.includes("' OR '1'='1") || builtQuery.includes("' or '1'='1")) {
             setIsVulnerable(true);
             setFeedback(t({
                 en: "ACCESS GRANTED! Authentication bypassed via tautology.",
                 zh: "访问成功！通过逻辑恒等式绕过了身份验证。"
             }));
             return;
        }
    }
    
    if (username === 'admin') {
        setIsVulnerable(false);
        setFeedback(t({
            en: "Standard admin lookup. No vulnerability triggered.",
            zh: "标准的管理员查询。未触发漏洞。"
        }));
    } else {
        setIsVulnerable(false);
        setFeedback(t({
            en: "Searching for user... Try to inject SQL.",
            zh: "正在搜索用户... 尝试注入 SQL 语句。"
        }));
    }
  }, [username, t]);

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Database className="w-5 h-5" /> 
        {t({en: "Live Simulation: Login Bypass", zh: "实战演练：登录绕过"})}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Interface Side */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg text-slate-900">
            <h4 className="font-bold mb-4 text-lg border-b pb-2">{t({en: "Vulnerable Login Portal", zh: "存在漏洞的登录入口"})}</h4>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t({en: "Username", zh: "用户名"})}</label>
            <div className="relative">
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 pl-8 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
                    {t({en: "Login", zh: "登录"})}
                </button>
            </div>
          </div>
          
          <div className="text-sm text-slate-400">
            <p>{t({en: "Mission: Log in as anyone without knowing the password.", zh: "任务：在不知道密码的情况下登录系统。" })}</p>
            <p className="mt-1">
                {t({en: "Hint: Try closing the quote", zh: "提示：尝试闭合引号"})} <code>'</code> {t({en: "and adding logic", zh: "并添加逻辑"})} <code>OR '1'='1</code>
            </p>
          </div>
        </div>

        {/* Backend Visualizer Side */}
        <div className="space-y-4">
           <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
             <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400 flex justify-between">
                <span>{t({en: "Backend Database Query Log", zh: "后端数据库查询日志"})}</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Live</span>
             </div>
             <div className="p-4 font-mono text-sm break-all">
                <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users <span className="text-purple-400">WHERE</span> username = 
                <span className="text-yellow-300"> '</span>
                <span className={isVulnerable ? "text-red-400 font-bold" : "text-white"}>{username}</span>
                <span className="text-yellow-300">'</span>
             </div>
           </div>

           {/* Result Feedback */}
           <div className={`p-4 rounded-lg border ${isVulnerable ? 'bg-red-900/30 border-red-500/50' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
              <div className="flex items-start gap-3">
                {isVulnerable ? <AlertTriangle className="text-red-500 w-6 h-6 shrink-0" /> : <CheckCircle className="text-emerald-500 w-6 h-6 shrink-0" />}
                <div>
                    <h5 className={`font-bold ${isVulnerable ? 'text-red-400' : 'text-emerald-400'}`}>
                        {isVulnerable ? t({en: 'VULNERABILITY EXPLOITED', zh: '漏洞利用成功'}) : t({en: 'System Status', zh: '系统状态'})}
                    </h5>
                    <p className="text-slate-300 text-sm mt-1">{feedback}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SQLiDemo;
