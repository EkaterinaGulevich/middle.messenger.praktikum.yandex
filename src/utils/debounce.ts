export const debounce = <FArgs extends Array<unknown>, R, T extends (..._args: FArgs) => R>(
  func: T,
  delay: number
): ((..._args: FArgs) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: FArgs) => {
    const delayedFunction = () => {
      timeout = null;
      func.apply(this, args);
    };

    clearTimeout(timeout || undefined);
    timeout = setTimeout(delayedFunction, delay);
  };
};
