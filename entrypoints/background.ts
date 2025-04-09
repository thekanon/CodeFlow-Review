// background.ts
export default defineBackground({
  main() {
    browser.runtime.onMessage.addListener(
      async (
        message: { action: string; code: string; questions: string[] },
        sender
      ) => {
        if (message.action === "startReview") {
          const tabs = await browser.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (!tabs || !tabs[0]?.id) return;

          // Content Script에 메시지 전달
          await browser.tabs.sendMessage(tabs[0].id, {
            action: "executeReview",
            code: message.code,
            questions: message.questions,
          });
        }
      }
    );
  },
});
