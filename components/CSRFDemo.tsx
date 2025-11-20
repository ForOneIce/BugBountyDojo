
import React, { useState } from 'react';
import { Globe, MousePointer, RefreshCw, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CSRFDemo: React.FC = () => {
  const { t } = useLanguage();
  const [balance, setBalance] = useState(1000);
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);
  const [showMaliciousSite, setShowMaliciousSite] = useState(false);

  const handleLegitTransfer = () => {
    setBalance(prev => prev - 100);
    setLastTransaction(t({en: "-$100 sent to Mom", zh: "向妈妈转账 -100元"}));
  };

  const handleMaliciousClick = () => {
    // Simulate CSRF
    // The browser sends the request to the bank endpoint automatically including cookies
    setBalance(prev => prev - 1000);
    setLastTransaction(t({en: "-$1000 sent to Attacker (CSRF)", zh: "向攻击者转账 -1000元 (CSRF)"}));
    setShowMaliciousSite(false);
    alert(t({en: "You won... nothing! Check your bank balance.", zh: "你什么也没中！快去检查你的银行余额。"}));
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5" /> 
        {t({en: "Live Simulation: CSRF", zh: "实战演练：CSRF 跨站请求伪造"})}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        
        {/* Victim's Bank (Site A) */}
        <div className="bg-white rounded-lg overflow-hidden border-4 border-blue-500 shadow-lg">
            <div className="bg-blue-600 p-3 text-white flex justify-between items-center">
                <span className="font-bold">Secure Bank Ltd.</span>
                <span className="text-xs bg-blue-800 px-2 py-1 rounded">{t({en: "Logged In", zh: "已登录"})}</span>
            </div>
            <div className="p-6 text-slate-800">
                <div className="text-3xl font-bold mb-2">${balance}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-6">{t({en: "Current Balance", zh: "当前余额"})}</div>
                
                <div className="border-t pt-4">
                    <h5 className="font-bold mb-2">{t({en: "Quick Transfer", zh: "快速转账"})}</h5>
                    <button 
                        onClick={handleLegitTransfer}
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full text-sm hover:bg-blue-700 transition"
                    >
                        {t({en: "Send $100 to Mom", zh: "转账 $100 给妈妈"})}
                    </button>
                </div>

                {lastTransaction && (
                    <div className="mt-4 p-2 bg-slate-100 rounded text-xs text-center animate-pulse">
                        {t({en: "Latest:", zh: "最新记录:"})} {lastTransaction}
                    </div>
                )}
            </div>
        </div>

        {/* Malicious Site (Site B) */}
        <div className="bg-slate-800 rounded-lg overflow-hidden border-4 border-red-500 shadow-lg flex flex-col relative">
            <div className="bg-red-600 p-3 text-white font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                {t({en: "Evil Website", zh: "恶意网站"})}
            </div>
            <div className="p-6 flex flex-col items-center justify-center flex-1 text-center">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">
                    {t({en: "CONGRATULATIONS!", zh: "恭喜中奖！"})}
                </h4>
                <p className="text-slate-300 text-sm mb-6">
                    {t({en: "You are the 1,000,000th visitor. Click below to claim your iPhone 15 Pro!", zh: "你是第 1,000,000 位访客。点击下方领取 iPhone 15 Pro！"})}
                </p>
                
                <button 
                    onClick={handleMaliciousClick}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full animate-bounce shadow-lg transform transition hover:scale-105"
                >
                    {t({en: "CLAIM PRIZE NOW", zh: "立即领取大奖"})}
                </button>
            </div>
            
            {/* Hidden Frame Visualization */}
            <div className="absolute bottom-2 right-2 opacity-50">
                <div className="bg-black/80 text-red-400 text-[10px] p-1 rounded font-mono">
                    &lt;img src="bank.com/transfer..." /&gt;
                </div>
            </div>
        </div>

      </div>
      
      <div className="mt-6 text-slate-400 text-sm border-t border-slate-800 pt-4">
         <p>
            {t({en: "Notice how clicking the button on the 'Evil Website' caused the balance on 'Secure Bank' to drop.", zh: "注意：点击“恶意网站”上的按钮会导致“安全银行”的余额减少。"})}
         </p>
         <p className="mt-1">
            {t({en: "Because your browser automatically sends the bank's cookies with the request, the bank thinks YOU made the transfer.", zh: "因为您的浏览器会在发送请求时自动附带银行的 Cookie，银行误以为是您本人发起的转账。"})}
         </p>
      </div>
    </div>
  );
};

export default CSRFDemo;
