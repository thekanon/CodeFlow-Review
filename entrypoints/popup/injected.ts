// injected.ts
import { getQuestions } from "./questions";
import {
  JS_CODE_SELECTOR,
  TEXT_CODE_SELECTOR,
  CHATGPT_TEXTAREA_SELECTOR,
  MAX_CODE_QUESTIONS,
} from "./constants";
import { extractRefactoredCode } from "./domHelpers";
import { sendToChatGPT, waitForResponseComplete } from "./chatGptService";

export function injectedStartReviewProcess(originalCode: string) {
  console.log("리뷰 프로세스 시작됨");

  const questions = getQuestions();
  let currentCode = originalCode;

  const textarea = document.querySelector(CHATGPT_TEXTAREA_SELECTOR);
  if (!textarea) {
    alert("ChatGPT 입력창을 찾지 못했습니다.");
    return;
  }

  async function askAllQuestions() {
    for (let i = 0; i < questions.length; i++) {
      console.log(`💬 질문 ${i + 1}/${questions.length}: ${questions[i]}`);
      await sendToChatGPT(textarea as HTMLElement, questions[i], currentCode);
      await waitForResponseComplete();

      const updatedCode = extractRefactoredCode(
        i,
        JS_CODE_SELECTOR,
        TEXT_CODE_SELECTOR,
        MAX_CODE_QUESTIONS
      );
      if (updatedCode) {
        currentCode = updatedCode;
        console.log(`✅ 코드 갱신됨:\n${currentCode}`);
      } else {
        console.warn("⚠️ 응답에서 코드를 추출하지 못했습니다.");
      }
    }
    alert("🎉 모든 질문이 완료되었습니다!");
  }

  askAllQuestions();
}
