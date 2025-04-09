// entrypoints/popup/App.tsx
import React, { useState } from "react";
import QuestionsList from "./QuestionsList";
import InputField from "./components/InputField";
import { getQuestions } from "./questions";
import "./App.scss";

function App() {
  const [code, setCode] = useState("");
  const [questions, setQuestions] = useState<string[]>(getQuestions());
  // 새 질문 입력 상태 추가
  const [newQuestion, setNewQuestion] = useState<string>("");

  // 질문 추가 처리 (문자열을 인자로 받음)
  const handleAddQuestion = (q: string) => {
    if (q.trim() !== "") {
      setQuestions([...questions, q.trim()]);
    }
  };

  // 질문 삭제 처리
  const handleDeleteQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  // 질문을 한 칸 위로 이동
  const handleMoveUpQuestion = (index: number) => {
    if (index === 0) return; // 첫 번째 항목은 이동 불가
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      [newQuestions[index - 1], newQuestions[index]] = [
        newQuestions[index],
        newQuestions[index - 1],
      ];
      return newQuestions;
    });
  };

  // 질문을 한 칸 아래로 이동
  const handleMoveDownQuestion = (index: number) => {
    if (index === questions.length - 1) return; // 마지막 항목은 이동 불가
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      return newQuestions;
    });
  };

  const handleStartReview = async () => {
    console.log("리뷰 시작:", code);
    console.log("질문 목록:", questions);

    try {
      await browser.runtime.sendMessage({
        action: "startReview",
        code,
        questions,
      });
      console.log("리뷰 요청 전송됨");
    } catch (e) {
      console.error("메시지 전송 오류:", e);
    }
  };

  return (
    <div className="code-review-container">
      <h2>코드 리뷰 시작</h2>
      <textarea
        id="codeInput"
        placeholder="코드를 여기에 붙여넣으세요..."
        rows={10}
        cols={30}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* QuestionsList는 질문 목록 관리 기능을 그대로 사용 */}
      <QuestionsList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onMoveUp={handleMoveUpQuestion}
        onMoveDown={handleMoveDownQuestion}
      />

      {/* InputField는 부모에서 관리하는 상태 newQuestion을 사용하여 onAdd 호출 */}
      <InputField
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        onAdd={() => {
          handleAddQuestion(newQuestion);
          setNewQuestion("");
        }}
        placeholder="새 질문 입력..."
        buttonLabel="추가"
      />

      <button id="startReview" onClick={handleStartReview}>
        리뷰 시작
      </button>
    </div>
  );
}

export default App;
