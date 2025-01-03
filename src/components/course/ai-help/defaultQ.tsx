import React, { useEffect, useState } from "react";
import { useChat } from "./hooks/useChat";
import { Question } from "./types";

interface DefaultQProps {
  chapterText: string;
  onQuestionClick: (question: string) => void;
}

export default function DefaultQ({
  chapterText,
  onQuestionClick,
}: DefaultQProps) {
  const { defaultQuestions } = useChat();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsFetched, setQuestionsFetched] = useState(false);

  useEffect(() => {
    if (!questionsFetched) {
      const fetchQuestions = async () => {
        const fetchedQuestions = await defaultQuestions(chapterText);
        setQuestions(fetchedQuestions);
        setQuestionsFetched(true); // Set flag to avoid fetching again
      };
      fetchQuestions();
    }
  }, [chapterText, defaultQuestions, questionsFetched]);

  return (
    <div className="p-4 border-b">
      <p>Here are three example questions you can ask about the PDF file:</p>
      <div className="space-y-2 mt-2">
        {questions.map((question, index) => (
          <div key={index} className="flex items-center">
            <span className="text-purple-600 mr-2">▶</span>
            <button
              onClick={() => onQuestionClick(question.question)}
              className="text-blue-600 hover:text-blue-800 underline text-left"
            >
              {question.question}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
