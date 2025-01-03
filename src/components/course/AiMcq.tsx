"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "./ai-help/hooks/useChat";
import { MCQ } from "./ai-help/types";
import { McqPopup } from "./McqPopup";

export default function AiMcq({ chapterText }: { chapterText: string }) {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showSubmit, setShowSubmit] = useState(true);
  const { generateMCQs, generateFeedback } = useChat();

  const loadMcqs = async () => {
    setLoading(true);
    try {
      const questions = await generateMCQs(chapterText);
      setMcqs(questions);
      setAnswers({});
      setScore(null);
      setShowSubmit(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMcqs();
  }, [chapterText]);

  const handleAnswerChange = (questionId: number, selectedAnswer: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    const totalQuestions = mcqs.length;
    const correctAnswers = mcqs.reduce(
      (acc, mcq) => (answers[mcq.id] === mcq.correctAnswer ? acc + 1 : acc),
      0
    );
    const scoreValue = (correctAnswers / totalQuestions) * 100;
    setScore(scoreValue);

    const aiFeedback = await generateFeedback(mcqs, answers, scoreValue);
    setFeedback(aiFeedback);
    setShowPopup(true);
    setShowSubmit(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  if (loading) return <div>Loading MCQs...</div>;

  return (
    <div className="space-y-4 p-4">
      {mcqs.map((mcq) => (
        <div key={mcq.id} className="border rounded p-4">
          <p className="font-medium">{mcq.question}</p>
          <div className="mt-2 space-y-2">
            {mcq.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${mcq.id}`}
                  value={index}
                  checked={answers[mcq.id] === index}
                  onChange={() => handleAnswerChange(mcq.id, index)}
                  className="mr-2"
                />
                <span
                  className={
                    score !== null
                      ? `${
                          mcq.correctAnswer === index
                            ? "text-green-600 font-medium"
                            : answers[mcq.id] === index
                            ? "text-red-600"
                            : ""
                        }`
                      : ""
                  }
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showSubmit ? (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Object.keys(answers).length !== mcqs.length}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={loadMcqs}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retake Exam
        </button>
      )}

      {showPopup && (
        <McqPopup
          mcqs={mcqs}
          answers={answers}
          score={score ?? 0}
          feedback={feedback}
          isOpen={showPopup}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
}
