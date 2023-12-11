/* eslint-disable @typescript-eslint/no-explicit-any */

function debounce(func: (...args: any[]) => any, delay: number = 500): (...args: any[]) => void {
  let timer: number | null = null;

  return function debounced(...args: any): void {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
}

export default debounce
