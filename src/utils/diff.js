export const diffing = () => {
  let prevVDOM;

  const setVDOM = (vDom) => {
    prevVDOM = vDom;
  };

  const getVDOM = () => prevVDOM;

  return {
    setVDOM,
    getVDOM,
  };
};
