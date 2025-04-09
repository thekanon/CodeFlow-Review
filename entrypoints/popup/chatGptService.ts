// chatGptService.ts
import {
  SUBMIT_BUTTON_SELECTOR_PRIMARY,
  SUBMIT_BUTTON_SELECTOR_FALLBACK,
} from "./constants";
import { waitForAnyElement, waitForElement } from "./domHelpers";

export async function sendToChatGPT(
  textarea: HTMLElement,
  question: string,
  codeToSend: string
): Promise<void> {
  // textarea에 질문과 코드를 설정합니다.
  textarea.textContent = `${question}\n\`\`\`\n${codeToSend}\n\`\`\``;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));

  // 제출 버튼을 선택하고 클릭합니다.
  const submitButton = await waitForAnyElement([
    SUBMIT_BUTTON_SELECTOR_PRIMARY,
    SUBMIT_BUTTON_SELECTOR_FALLBACK,
  ]);

  setTimeout(() => {
    (submitButton as HTMLElement).click();
  }, 500);
}

export async function waitForResponseComplete(): Promise<void> {
  // 기본 제출 버튼을 기다려서 응답이 완료되었음을 간주합니다.
  await waitForElement(SUBMIT_BUTTON_SELECTOR_FALLBACK);
}
