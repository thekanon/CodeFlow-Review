// domHelpers.ts
export function findLastCodeElement(selector: string): Element | null {
  const elements = document.querySelectorAll(selector);
  return elements.length ? elements[elements.length - 1] : null;
}

export function extractRefactoredCode(
  i: number,
  jsSelector: string,
  textSelector: string,
  maxQuestions: number
): string | null {
  const selector = i < maxQuestions ? jsSelector : textSelector;
  const element = findLastCodeElement(selector);
  return element?.textContent?.trim() || null;
}

export function waitForElement(selector: string): Promise<Element> {
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

export function waitForAnyElement(selectors: string[]): Promise<Element> {
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
