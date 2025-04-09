import { useState } from "react";

function App() {
  const [code, setCode] = useState("");

  const handleStartReview = async () => {
    console.log("리뷰 시작:", code);

    try {
      // wxt의 메시지 전달 방식 사용
      await browser.runtime.sendMessage({
        action: "startReview",
        code,
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
      <button id="startReview" onClick={handleStartReview}>
        리뷰 시작
      </button>
    </div>
  );
}

export default App;
