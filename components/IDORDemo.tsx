
import React, { useState } from 'react';
import { Lock, FileText, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const database = {
    101: { name: "Alice (You)", role: "User", secret: "My pet's name is Fluffy", balance: "$50" },
    102: { name: "Bob (Victim)", role: "User", secret: "I hid the key under the mat", balance: "$5000" },
    103: { name: "Admin", role: "Admin", secret: "Root password is 'password123'", balance: "$99999" }
};

const IDORDemo: React.FC = () => {
    const { t } = useLanguage();
    const [targetId, setTargetId] = useState('101');
    const [fetchedData, setFetchedData] = useState<any>(database[101]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetch = () => {
        setIsLoading(true);
        setTimeout(() => {
            const id = parseInt(targetId);
            const data = database[id as keyof typeof database];
            setFetchedData(data || null);
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" /> 
                {t({en: "Live Simulation: IDOR (Broken Access)", zh: "实战演练：IDOR (越权访问)"})}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <label className="text-xs uppercase font-bold text-slate-500">{t({en: "Intercepted Request URL", zh: "拦截的请求 URL"})}</label>
                        <div className="flex items-center mt-2 bg-slate-950 p-2 rounded border border-slate-600">
                            <span className="text-emerald-500 text-sm font-mono">GET /api/users/</span>
                            <input 
                                type="text" 
                                value={targetId}
                                onChange={(e) => setTargetId(e.target.value)}
                                className="bg-transparent text-white font-mono text-sm outline-none w-12 text-center border-b border-slate-500 focus:border-emerald-500 mx-1"
                            />
                            <span className="text-emerald-500 text-sm font-mono">/profile</span>
                        </div>
                        <button 
                            onClick={handleFetch}
                            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors"
                        >
                            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : t({en: "Send Request", zh: "发送请求"})}
                        </button>
                    </div>

                    <div className="text-sm text-slate-400">
                        <p>{t({en: "You are logged in as User 101. Try changing the ID in the URL to access other users' private data.", zh: "您当前登录身份为用户 101。尝试更改 URL 中的 ID 来访问其他用户的私密数据。" })}</p>
                        <ul className="list-disc list-inside mt-2 text-xs text-slate-500">
                            <li>101: Alice ({t({en: "You", zh: "你自己"})})</li>
                            <li>102: Bob</li>
                            <li>103: Admin</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-lg p-6 text-slate-800 min-h-[200px] relative shadow-inner">
                        <div className="absolute top-0 left-0 w-full bg-slate-200 h-8 border-b flex items-center px-3 gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <span className="ml-2 text-xs text-slate-500">JSON Response Viewer</span>
                        </div>
                        <div className="mt-6 font-mono text-sm">
                            {fetchedData ? (
                                <pre>
{`{
  "status": "success",
  "data": {
    "id": ${targetId},
    "name": "${fetchedData.name}",
    "role": "${fetchedData.role}",
    "secret_note": "${fetchedData.secret}",
    "wallet": "${fetchedData.balance}"
  }
}`}
                                </pre>
                            ) : (
                                <div className="text-red-500 font-bold">
                                    Error 404: User Not Found
                                </div>
                            )}
                        </div>
                        {targetId !== '101' && fetchedData && (
                            <div className="absolute bottom-4 right-4">
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-red-200">
                                    {t({en: "UNAUTHORIZED ACCESS", zh: "未授权访问警告"})}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IDORDemo;
