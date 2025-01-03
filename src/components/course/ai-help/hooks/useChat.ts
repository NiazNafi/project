import { useState } from "react";
import { Message } from "../types";

import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export function useChat() {
  const SystemMessage = "You are a helpful learning bot 'Edubot'.";
  const [messageHistory, setMessageHistory] = useState<
    { role: string; content: string }[]
  >([{ role: "system", content: SystemMessage }]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
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

    // Update message history
    const updatedHistory = [
      ...messageHistory,
      {
        role: "system",
        content: `You are a learning assistant bot called 'Edubot', designed to help users understand and master concepts in the course they are enrolled in. The user will provide questions or topics they want to explore, and class notes will be shared as context for your responses. Your tasks are: 1. Provide clear and concise explanations based on the provided course details. 2. Offer examples, analogies, or step-by-step breakdowns if the user asks for detailed understanding. 3. Answer in a friendly, engaging tone that encourages learning. 4. Suggest additional topics or concepts to explore if relevant. 5. Clarify any confusion by breaking down complex topics into simpler parts. Context: ${courseChapterText}`,
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
      console.error("Error invoking AI model:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I encountered an error while processing your query.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    setMessages
  };
}
