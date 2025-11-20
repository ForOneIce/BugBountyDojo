
export type Language = 'en' | 'zh';

export interface LocalizedContent {
  en: string;
  zh: string;
}

export interface QuizQuestion {
  id: number;
  question: LocalizedContent;
  options: LocalizedContent[];
  correctAnswer: number; // index
  explanation: LocalizedContent;
}

export enum Difficulty {
  NOOB = 'Script Kiddie',
  APPRENTICE = 'Apprentice',
  HUNTER = 'Bounty Hunter',
  ELITE = 'Elite Hacker'
}

export interface Module {
  id: string;
  title: LocalizedContent;
  shortDescription: LocalizedContent;
  fullDescription: LocalizedContent;
  difficulty: Difficulty;
  category: LocalizedContent;
  icon: string;
  content: LocalizedContent; // Markdown-like content
  interactiveType: 'sqli' | 'xss' | 'idor' | 'command_injection' | 'csrf' | 'none';
  quiz: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
