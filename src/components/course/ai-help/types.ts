export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export type ChatRole = "system" | "user" | "assistant";

export type ChatHistory = {
  role: ChatRole;
  content: string;
}[];

export type MCQ = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type Question = {
  id: number;
  question: string;
}