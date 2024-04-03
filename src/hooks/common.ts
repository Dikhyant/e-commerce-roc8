import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";

export const usePreventInitialEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns; //void | (() => void | undefined) = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
};

type AnyFunction = (...args: any[]) => any;

export function useDebounce<F extends AnyFunction>(
  func: F,
  wait: number,
  dependencies: DependencyList,
  immediate = false,
): (...args: Parameters<F>) => void {
  const timeout = useRef<NodeJS.Timeout | null>();

  return useCallback(
    function debounced(this: ThisParameterType<F>, ...args: Parameters<F>) {
      const context = this;

      const later = () => {
        timeout.current = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    },
    [...dependencies],
  );
}
