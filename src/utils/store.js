export default (function () {
  let prevVDom;

  const setVDom = (vDom) => {
    prevVDom = vDom;
  };

  const getVDom = () => prevVDom;

  return {
    setVDom,
    getVDom,
  };
})();
