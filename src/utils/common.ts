type AnyFunction = (...args: any[]) => any;

export function debounce<F extends AnyFunction>(
  func: F,
  wait: number,
  immediate = false,
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null;

  return function debounced(
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
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

export function partiallyHideEmail(email: string): string {
  if (!email) return email;

  const emailParts = email.split("@");
  const emailFirstPart = emailParts[0]?.split("");
  if (!emailFirstPart) return email;

  for (let i = emailFirstPart?.length - 1; i > 2; i--) {
    emailFirstPart[i] = "*";
  }

  emailParts[0] = emailFirstPart.join("");

  return emailParts.join("@");
}
