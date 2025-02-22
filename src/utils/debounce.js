export const debounce = (fn) => {
  let timer = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, 500);
  };
};
