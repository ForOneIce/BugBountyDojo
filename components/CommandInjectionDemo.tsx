
import React, { useState } from 'react';
import { Terminal, AlertTriangle, CheckCircle, Server } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CommandInjectionDemo: React.FC = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState('8.8.8.8');
  const [output, setOutput] = useState<string[]>([]);
  const [isVulnerable, setIsVulnerable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const executeCommand = () => {
    setIsLoading(true);
    setOutput([]); // Clear previous
    setIsVulnerable(false);

    setTimeout(() => {
        const lines = [];
        // Base logic
        if (input.includes('8.8.8.8')) {
            lines.push(`PING 8.8.8.8 (8.8.8.8): 56 data bytes`);
            lines.push(`64 bytes from 8.8.8.8: icmp_seq=0 ttl=115 time=12.4 ms`);
        } else if (input.trim() !== '') {
             lines.push(`PING ${input.split(';')[0].trim()} ... host not found`);
        }

        // Injection logic
        if (input.includes(';') || input.includes('|')) {
            const injected = input.split(/[;|]/)[1]?.trim();
            if (injected) {
                setIsVulnerable(true);
                lines.push(`--- CMD EXECUTION DETECTED ---`);
                if (injected === 'whoami') {
                    lines.push(`root`);
                } else if (injected === 'ls') {
                    lines.push(`index.php`);
                    lines.push(`config.php`);
                    lines.push(`passwords.txt`);
                } else if (injected === 'cat passwords.txt') {
                    lines.push(`admin: supersecret123`);
                    lines.push(`user: password`);
                } else {
                    lines.push(`bash: ${injected}: command not found`);
                }
            }
        }
        
        setOutput(lines);
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Terminal className="w-5 h-5" /> 
        {t({en: "Live Simulation: OS Command Injection", zh: "实战演练：OS 命令注入"})}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Side */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg text-slate-900">
            <h4 className="font-bold mb-4 text-lg border-b pb-2 flex items-center gap-2">
                <Server className="w-4 h-4" />
                {t({en: "Network Diagnostic Tool", zh: "网络诊断工具"})}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
                {t({en: "Enter an IP address to ping:", zh: "输入 IP 地址进行 Ping 测试："})}
            </p>
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-slate-300 rounded font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="8.8.8.8"
              />
              <button 
                onClick={executeCommand}
                disabled={isLoading}
                className="bg-slate-800 text-white px-4 py-2 rounded font-bold hover:bg-slate-700 transition disabled:opacity-50"
              >
                Ping
              </button>
            </div>
          </div>
          
          <div className="text-sm text-slate-400">
            <p>{t({en: "Mission: Try to list files on the server.", zh: "任务：尝试列出服务器上的文件。" })}</p>
            <p className="mt-1 text-slate-500">
                {t({en: "Hint: Use a semicolon", zh: "提示：使用分号"})} <code>;</code> {t({en: "to separate commands.", zh: "来分隔命令。"})} <br/>
                {t({en: "Try:", zh: "试试："})} <code className="text-emerald-400">8.8.8.8; ls</code> {t({en: "or", zh: "或"})} <code className="text-emerald-400">8.8.8.8; whoami</code>
            </p>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="space-y-4">
           <div className="bg-black rounded-lg border border-slate-800 overflow-hidden min-h-[250px] font-mono text-xs p-4 text-green-400 shadow-inner">
             <div className="mb-2 opacity-50">user@vulnerable-server:~$ ./ping_tool.sh</div>
             {isLoading && <div className="animate-pulse">Executing...</div>}
             {!isLoading && output.map((line, i) => (
                 <div key={i} className={line.includes('root') || line.includes('passwords') ? "text-red-400 font-bold" : ""}>{line}</div>
             ))}
             {!isLoading && output.length === 0 && <div className="text-slate-600">Waiting for input...</div>}
             {!isLoading && <div className="mt-2 animate-pulse">_</div>}
           </div>

           {/* Result Feedback */}
           <div className={`p-4 rounded-lg border ${isVulnerable ? 'bg-red-900/30 border-red-500/50' : 'bg-slate-800/50 border-slate-700'}`}>
              <div className="flex items-center gap-3">
                {isVulnerable ? <AlertTriangle className="text-red-500 w-6 h-6" /> : <CheckCircle className="text-slate-500 w-6 h-6" />}
                <div>
                    <h5 className={`font-bold ${isVulnerable ? 'text-red-400' : 'text-slate-300'}`}>
                        {isVulnerable 
                            ? t({en: "RCE SUCCESSFUL", zh: "远程代码执行成功"}) 
                            : t({en: "Normal Operation", zh: "正常运行"})}
                    </h5>
                    {isVulnerable && <p className="text-slate-400 text-xs mt-1">
                        {t({en: "You chained a second system command using ';'.", zh: "你使用分号 ';' 成功拼接了第二条系统命令。"})}
                    </p>}
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommandInjectionDemo;
