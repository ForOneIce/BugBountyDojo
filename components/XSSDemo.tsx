
import React, { useState } from 'react';
import { Code, Globe, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const XSSDemo: React.FC = () => {
  const { t } = useLanguage();
  const [comment, setComment] = useState('Hello world!');
  const [posts, setPosts] = useState<string[]>([]);
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);

  const handlePost = () => {
    if (comment.toLowerCase().includes('<script>')) {
      const match = comment.match(/alert\(['"](.+?)['"]\)/);
      if (match) {
        setSimulatedAlert(match[1]);
      } else if (comment.includes('alert(')) {
         setSimulatedAlert('XSS');
      }
    }
    setPosts([comment, ...posts]);
    setComment('');
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" /> 
        {t({en: "Live Simulation: Reflected XSS", zh: "实战演练：反射型 XSS"})}
      </h3>
      
      {simulatedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white text-black p-6 rounded shadow-2xl max-w-xs w-full text-center transform scale-110 transition-transform">
                <h4 className="text-lg font-bold mb-2">browser.exe {t({en: "says", zh: "显示"})}</h4>
                <p className="mb-4">{simulatedAlert}</p>
                <button 
                    onClick={() => setSimulatedAlert(null)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                    OK
                </button>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden text-slate-800 min-h-[300px]">
                <div className="bg-slate-100 border-b px-4 py-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <div className="bg-white px-3 py-1 rounded border text-xs w-full text-slate-500 truncate">
                        http://vulnerable-social.com/feed
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    {/* Post Input */}
                    <div className="flex gap-2">
                        <input 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 text-sm"
                            placeholder={t({en: "Write a comment...", zh: "写下评论..."})}
                        />
                        <button 
                            onClick={handlePost}
                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded font-bold"
                        >
                            {t({en: "Post", zh: "发布"})}
                        </button>
                    </div>
                    
                    {/* Feed */}
                    <div className="space-y-2">
                        {posts.length === 0 && <p className="text-slate-400 text-sm italic">{t({en: "No comments yet.", zh: "暂无评论。" })}</p>}
                        {posts.map((p, i) => (
                            <div key={i} className="border-b pb-2">
                                <div className="font-bold text-xs text-blue-600">{t({en: "Anonymous User", zh: "匿名用户"})}</div>
                                <div className="text-sm mt-1">
                                    {p.includes('<script>') ? (
                                        <span className="font-mono text-red-600 bg-red-100 px-1 rounded text-xs">
                                            {p}
                                        </span>
                                    ) : p}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-sm text-slate-400">
                <p>{t({en: "Try to inject JavaScript. The site doesn't sanitize input!", zh: "尝试注入 JavaScript。该网站没有过滤输入！" })}</p>
                <code className="block bg-slate-800 p-2 mt-2 rounded text-emerald-400 text-xs">
                    &lt;script&gt;alert('Hacked')&lt;/script&gt;
                </code>
            </div>
        </div>

        <div className="space-y-4">
             <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden h-full">
                <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-400">
                    DOM Inspector (Source Code)
                </div>
                <div className="p-4 font-mono text-xs text-slate-300 space-y-1">
                    <div className="text-slate-500">&lt;!-- {t({en: "The server simply dumps the input here", zh: "服务器直接将输入输出在这里" })} --&gt;</div>
                    <div>&lt;div class="comments"&gt;</div>
                    {posts.map((p, i) => (
                        <div key={i} className="pl-4">
                            &lt;div&gt;
                            {p.includes('<script>') ? <span className="text-yellow-400 animate-pulse">{p}</span> : p}
                            &lt;/div&gt;
                        </div>
                    ))}
                    <div>&lt;/div&gt;</div>
                </div>
             </div>
             {posts.some(p => p.includes('<script>')) && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2 text-red-300 text-sm">
                    <AlertOctagon className="w-4 h-4" />
                    {t({en: "Code Injection Detected: The browser executed the script tag!", zh: "检测到代码注入：浏览器执行了脚本标签！"})}
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default XSSDemo;
