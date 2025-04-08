// content.js
// "코드 리뷰 시작" 버튼 클릭 시 이벤트 리스너 등록
document.getElementById("startReview").addEventListener("click", async () => {
  const code = document.getElementById("codeInput").value;
  console.log("입력된 코드:", code);

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: injectedStartReviewProcess,
      args: [code],
    });
    console.log("스크립트 실행 요청됨");
  } catch (e) {
    console.error("스크립트 실행 오류:", e);
  }
});

// 실제로 탭 내에서 실행되는 코드
function injectedStartReviewProcess(originalCode) {
  // 셀렉터 상수 선언
  const JS_CODE_SELECTOR = "code.whitespace-pre\\!.language-javascript";
  const TEXT_CODE_SELECTOR = "code.language-text";
  const CHATGPT_TEXTAREA_SELECTOR = "#prompt-textarea";
  const SUBMIT_BUTTON_SELECTOR_PRIMARY = 'button[aria-label="프롬프트 보내기"]';
  const SUBMIT_BUTTON_SELECTOR_FALLBACK =
    'button[data-testid="composer-speech-button"]';
  const MAX_CODE_QUESTIONS = 3;

  // ChatGPT에 보낼 질문들
  function getQuestions() {
    return [
      "이 코드에 주석이 적절하게 달렸는지 평가하고, 주석을 추가해서 '리팩토링 된 코드 :' 라는 텍스트 이후 리팩토링 된 코드를 추가해줘",
      "이 코드가 순수 컴포넌트 원칙을 따르고 있는지 확인하고, 가능한 경우 '리팩토링 된 코드 :' 라는 텍스트 이후 리팩토링 된 코드를 추가해줘",
      "이 코드에 그 외에 개선할 수 있는 점이 있다면 설명하고, '리팩토링 된 코드 :' 라는 텍스트 이후 리팩토링 된 코드를 추가해줘",
      "위에서 정리한 내용을 요약, 정리한 내용을 markdown 형식으로 정리해줘.",
    ];
  }

  // 마지막 코드 블럭 요소를 선택하는 함수
  function findLastCodeElement(selector) {
    const elements = document.querySelectorAll(selector);
    return elements.length ? elements[elements.length - 1] : null;
  }

  // 응답에서 리팩토링된 코드 추출
  function extractRefactoredCode(i) {
    const selector =
      i < MAX_CODE_QUESTIONS ? JS_CODE_SELECTOR : TEXT_CODE_SELECTOR;
    const element = findLastCodeElement(selector);
    return element?.textContent.trim() || null;
  }

  // 특정 요소가 나타날 때까지 대기하는 함수
  function waitForElement(selector) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          resolve(element);
        }
      }, 500);
    });
  }

  // 여러 셀렉터 중 하나라도 등장하면 반환
  function waitForAnyElement(selectors) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        for (const selector of selectors) {
          const el = document.querySelector(selector);
          if (el) {
            clearInterval(interval);
            resolve(el);
            return;
          }
        }
      }, 500);
    });
  }

  // 본 실행 로직 시작
  const questions = getQuestions();
  let currentCode = originalCode;

  // ChatGPT 입력창 탐색
  const textarea = document.querySelector(CHATGPT_TEXTAREA_SELECTOR);
  if (!textarea) {
    alert("ChatGPT 입력창을 찾을 수 없습니다.");
    return;
  }

  // ChatGPT에 질문과 코드 전송
  async function sendToChatGPT(question, codeToSend) {
    textarea.textContent = `${question}\n\`\`\`\n${codeToSend}\n\`\`\``;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    const submitButton = await waitForAnyElement([
      SUBMIT_BUTTON_SELECTOR_PRIMARY,
      SUBMIT_BUTTON_SELECTOR_FALLBACK,
    ]);

    setTimeout(() => {
      submitButton.click();
    }, 500);
  }

  // ChatGPT 응답 완료 대기 (버튼이 다시 'Send'로 복귀할 때까지)
  async function waitForResponseComplete() {
    await waitForElement(SUBMIT_BUTTON_SELECTOR_FALLBACK);
  }

  // 모든 질문을 순차적으로 ChatGPT에 전달하는 메인 루프
  async function askAllQuestions() {
    for (let i = 0; i < questions.length; i++) {
      console.log(`💬 질문 ${i + 1}/${questions.length}: ${questions[i]}`);
      await sendToChatGPT(questions[i], currentCode);
      await waitForResponseComplete();

      const updatedCode = extractRefactoredCode(i);
      if (updatedCode) {
        currentCode = updatedCode;
        console.log(`✅ 코드 갱신됨:\n${currentCode}`);
      } else {
        console.warn("⚠️ 응답에서 코드를 추출하지 못했습니다.");
      }
    }

    alert("🎉 모든 질문이 완료되었습니다!");
  }

  // 실행 시작
  askAllQuestions();
}
