import { useState } from "react";
import { Message, MCQ, ChatHistory, ChatRole, Question } from "../types";
import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0,
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export function useChat() {
  const [messageHistory, setMessageHistory] = useState<ChatHistory>([]);
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string, courseChapterText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const updatedHistory: ChatHistory = [
      ...messageHistory,
      {
        role: "system",
        content: `You are a learning assistant bot called 'Edubot'. Context: ${courseChapterText}`,
      },
      { role: "user", content },
    ];
    setMessageHistory(updatedHistory);

    setIsTyping(true);
    try {
      const aiResponse = await model.invoke(updatedHistory);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.text,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setMessageHistory((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse.text },
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your query.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const defaultQuestions = async (
    courseChapterText: string
  ): Promise<Question[]> => {
    const prompt = `
IMPORTANT: Respond ONLY with a JSON array. No other text.
Format exactly like this example:
[
  {
    "id": 1,
    "question": "What is this chapter will teach me?",
  }
]

Generate 3 default go to questions about this chapter with this text: ${courseChapterText}
Do not include ANY explanatory text - ONLY the JSON array.`;

    try {
      setIsTyping(true);
      const response = await model.invoke([
        { role: "system", content: prompt },
        {
          role: "user",
          content: "Remember: Return ONLY the JSON array, no other text.",
        },
      ]);

      // Clean and parse response
      const text = response.text.trim();
      const jsonStart = text.indexOf("[");
      const jsonEnd = text.lastIndexOf("]") + 1;
      const jsonStr = text.slice(jsonStart, jsonEnd);

      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) throw new Error("Invalid Questions format");

      return parsed;
    } catch (error) {
      console.error("Questions Generation Error:", error);
      return [];
    } finally {
      setIsTyping(false);
    }
  };

  const generateMCQs = async (courseChapterText: string): Promise<MCQ[]> => {
    const prompt = `
IMPORTANT: Respond ONLY with a JSON array. No other text.
Format exactly like this example:
[
  {
    "id": 1,
    "question": "What is X?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 2
  }
]

Generate 10 multiple choice questions about this text: ${courseChapterText}
Each question must have exactly 4 options.
correctAnswer must be 0-3 (index of correct option).
Do not include ANY explanatory text - ONLY the JSON array.`;

    try {
      setIsTyping(true);
      const response = await model.invoke([
        { role: "system", content: prompt },
        {
          role: "user",
          content: "Remember: Return ONLY the JSON array, no other text.",
        },
      ]);

      // Clean and parse response
      const text = response.text.trim();
      const jsonStart = text.indexOf("[");
      const jsonEnd = text.lastIndexOf("]") + 1;
      const jsonStr = text.slice(jsonStart, jsonEnd);

      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) throw new Error("Invalid MCQ format");

      return parsed;
    } catch (error) {
      console.error("MCQ Generation Error:", error);
      return [];
    } finally {
      setIsTyping(false);
    }
  };

  const generateFeedback = async (
    mcqs: MCQ[],
    answers: Record<number, number>,
    score: number
  ): Promise<string> => {
    const prompt = `
    Analyze these MCQ results:
    Score: ${score}%
    Total Questions: ${mcqs.length}
    Correct Answers: ${
      mcqs.filter((mcq) => answers[mcq.id] === mcq.correctAnswer).length
    }
    
    Questions user got wrong:
    ${mcqs
      .filter((mcq) => answers[mcq.id] !== mcq.correctAnswer)
      .map(
        (mcq) =>
          `- ${mcq.question} (User answered: ${
            mcq.options[answers[mcq.id]]
          }, Correct: ${mcq.options[mcq.correctAnswer]})`
      )
      .join("\n")}

    Provide a concise feedback analyzing their performance, areas of strength, and specific suggestions for improvement.`;

    try {
      const response = await model.invoke([
        { role: "system", content: prompt },
      ]);
      return response.text.trim();
    } catch (error) {
      console.error("Feedback Generation Error:", error);
      return "Unable to generate feedback at this time.";
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    generateMCQs,
    generateFeedback,
    // setMessages,
    defaultQuestions,
  };
}
