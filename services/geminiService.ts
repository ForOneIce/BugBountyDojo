
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const getGeminiResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentPrompt: string,
  language: 'en' | 'zh' = 'en'
): Promise<string> => {
  if (!ai) {
    return language === 'zh' 
        ? "错误：未配置 API 密钥。请检查环境变量。"
        : "Error: API Key not configured. Please check your environment variables.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const langInstruction = language === 'zh' 
        ? "请用中文回答。你是'Sensei'，一个充满智慧和鼓励的网络安全导师。你的目标是用通俗易懂的类比解释漏洞（SQL注入、XSS、CSRF等）。保持回答简洁（100字以内，除非用户要求更多）。使用黑客术语但保持对新手友好。"
        : "You are 'Sensei', a wise and encouraging cybersecurity mentor for a Bug Bounty training app. Your goal is to explain vulnerabilities (SQLi, XSS, IDOR, etc) simply, using analogies. Keep answers concise (under 100 words unless asked for more). Use hacker terminology but remain beginner-friendly.";

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: langInstruction,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: currentPrompt });
    return result.text || (language === 'zh' ? "Sensei 正在冥想... (无响应)" : "Sensei is meditating... (No response generated)");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh' 
        ? "Sensei 遇到了连接防火墙。请稍后再试。" 
        : "Sensei encountered a connection firewall. Please try again later.";
  }
};
