// entrypoints/popup/QuestionsList.tsx
import React from "react";
import GenericList from "./components/GenericList";
import "./QuestionsList.scss";

interface QuestionsListProps {
  questions: string[];
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className="questions-list-container">
      <h3>코드 리뷰 질문 목록</h3>
      <GenericList
        items={questions}
        renderItem={(item) => <span>{item}</span>}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  );
};

export default QuestionsList;
