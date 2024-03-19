type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(
  func: F,
  wait: number,
  immediate = false
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;

  return function debounced(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
