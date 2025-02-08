export const serializeVirtualDom = (component) => {
  return JSON.stringify(
    component,
    function (key, val) {
      if (typeof val === 'function') {
        return val.toString(); // implicitly `toString` it
      }
      return val;
    },
    '\t',
  );
};
