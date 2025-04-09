// entrypoints/popup/QuestionsList.tsx
import React, { useState } from "react";
import { getQuestions } from "../questions";

const QuestionsList: React.FC = () => {
  // 기본 질문 목록을 가져옵니다.
  const defaultQuestions = getQuestions();
  const [questions, setQuestions] = useState<string[]>(defaultQuestions);
  const [newQuestion, setNewQuestion] = useState<string>("");

  // 새 질문을 추가하는 함수
  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  return (
    <div className="questions-list-container" style={{ marginTop: "1rem" }}>
      <h3>코드 리뷰 질문 목록</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
      <div className="add-question" style={{ marginTop: "0.5rem" }}>
        <input
          type="text"
          placeholder="새 질문 입력..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={{ width: "80%" }}
        />
        <button onClick={handleAddQuestion} style={{ marginLeft: "0.5rem" }}>
          추가
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
