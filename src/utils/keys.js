const keys = (key = 0) => {
  return {
    clearKey: () => {
      key = 0;
    },
    getKey: () => `inner_key_${key++}`,
  };
};

const innerKeyHelpers = keys();

export default innerKeyHelpers;
