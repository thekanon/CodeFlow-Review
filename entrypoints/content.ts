import { injectedStartReviewProcess } from "./popup/injected";

export default defineContentScript({
  matches: ["https://chatgpt.com/*"],
  main(ctx) {
    console.log("Code Review Helper content script loaded");

    browser.runtime.onMessage.addListener((message) => {
      if (message.action === "executeReview") {
        console.log("리뷰 프로세스 실행:", message.code);
        injectedStartReviewProcess(message.code, message.questions);
        return Promise.resolve({ success: true });
      }
    });
  },
});
