const keys = (key = 0) => {
  return {
    clearKey: () => {
      key = 0;
    },
    getKey: () => key++,
  };
};

const innerKeyHelpers = keys();

export default innerKeyHelpers;
