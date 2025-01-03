import React from "react";
import ReactMarkdown from "react-markdown";
import { MCQ } from "./ai-help/types";

interface McqPopupProps {
  mcqs: MCQ[];
  answers: Record<number, number>;
  score: number;
  feedback: string;
  isOpen: boolean;
  onClose: () => void;
}

export const McqPopup = ({
  mcqs,
  answers,
  score,
  feedback,
  isOpen,
  onClose,
}: McqPopupProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">MCQ Results</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-4 max-h-[calc(90vh-8rem)]">
          <div className="mb-6">
            <div
              className={`text-lg font-medium mb-2 ${
                score >= 70 ? "text-green-600" : "text-red-600"
              }`}
            >
              Score: {score.toFixed(1)}%
            </div>
            <div className="bg-gray-50 p-4 rounded-lg prose prose-sm max-w-none">
              <h3 className="font-medium mb-2">AI Feedback</h3>
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-2">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-bold mb-2">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-md font-bold mb-2">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 mb-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 mb-2">{children}</ol>
                  ),
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-200 pl-4 italic">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {feedback}
              </ReactMarkdown>
            </div>
          </div>

          <div className="space-y-6">
            {mcqs.map((mcq) => (
              <div key={mcq.id} className="border rounded-lg p-4">
                <p className="font-medium mb-3">{mcq.question}</p>
                <div className="space-y-2">
                  {mcq.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${
                        mcq.correctAnswer === index
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : answers[mcq.id] === index
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-gray-50"
                      }`}
                    >
                      {option}
                      {mcq.correctAnswer === index && " ✓"}
                      {answers[mcq.id] === index &&
                        mcq.correctAnswer !== index &&
                        " ✗"}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Print Results
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
