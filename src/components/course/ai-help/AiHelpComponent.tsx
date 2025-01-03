import { useState } from "react";

import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import ReactMarkdown from "react-markdown";
import { Message } from "./types";
import DefaultQ from "./defaultQ";

export default function AiHelp({
  courseChapterText,
  messages,
  isTyping,
  sendMessage,
}: {
  courseChapterText: string;
  messages: Message[];
  isTyping: Boolean;
  sendMessage: (content: string, courseChapterText: string) => Promise<void>;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue, courseChapterText);
      setInputValue("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-[600px]">
      <ChatHeader />
      <DefaultQ
        chapterText={courseChapterText}
        onQuestionClick={handleQuestionClick}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white font-normal text-sm"
                  : "bg-gray-100 text-gray-900 font-normal text-sm"
              }`}
            >
              <ReactMarkdown
                className="prose"
                components={{
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-800 text-white px-1 rounded">
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 text-sm font-medium tracking-wide">
              Typing...
            </div>
          </div>
        )}
      </div>
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        disabled={isTyping as boolean}
      />
    </div>
  );
}
