// entrypoints/popup/components/GenericList.tsx
import React, { FC } from "react";
import "./GenericList.scss";

export interface GenericListProps<T> {
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  className?: string;
  // 삭제 기능: 항목 삭제 요청 시 index 전달
  onDelete?: (index: number) => void;
  // 위로 이동: 항목을 한 칸 위로 옮길 때 index 전달 (첫 항목은 비활성화)
  onMoveUp?: (index: number) => void;
  // 아래로 이동: 항목을 한 칸 아래로 옮길 때 index 전달 (마지막 항목은 비활성화)
  onMoveDown?: (index: number) => void;
}

const GenericList = <T,>({
  items,
  renderItem,
  className = "",
  onDelete,
  onMoveUp,
  onMoveDown,
}: GenericListProps<T>) => {
  return (
    <ul className={`generic-list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="generic-list-item">
          <div className="item-content">
            {renderItem ? renderItem(item, index) : String(item)}
          </div>
          <div className="item-actions">
            {onMoveUp && (
              <button
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
                title="위로 이동"
              >
                ↑
              </button>
            )}
            {onMoveDown && (
              <button
                onClick={() => onMoveDown(index)}
                disabled={index === items.length - 1}
                title="아래로 이동"
              >
                ↓
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(index)} title="삭제">
                ✖
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GenericList;
