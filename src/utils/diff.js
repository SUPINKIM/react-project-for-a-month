export const DIFF_TYPE = {
  ELEMENT: 'ELEMENT',
  ATTRIBUTE: 'ATTRIBUTE',
};

export const diffing = () => {
  let prevVDOM;

  const setVDOM = (vDom) => {
    prevVDOM = vDom;
  };

  const getVDOM = () => prevVDOM;

  const findNode = (nodes, key) => {
    return Object(nodes).keys((obj) => obj.key === key);
  };

  const isSameAllAttribute = (prevProps, currentProps) => {
    const sortedKeys = Object.keys(prevProps).sort();

    return sortedKeys.every((key) => {
      console.log('속성 이름:', key);
      console.log('속성 : ', prevProps[key], currentProps[key]);

      // 함수나 객체의 경우 메모리 주소가 달라서 매번 false일 것 같음
      return prevProps[key] === currentProps[key];
    });
  };

  const compareDiff = (type, props, key) => {
    if (!prevVDOM) return { isDiff: true, type: DIFF_TYPE.ELEMENT };

    const node = findNode(prevVDOM, key);
    if (!node || node.type !== type)
      return { isDiff: true, type: DIFF_TYPE.ELEMENT };

    // TODO: 이전 노드가 있는 경우 해당 노드도 같이 전달해야 함
    return isSameAllAttribute(node.props, props)
      ? { isDiff: true, type: DIFF_TYPE.ATTRIBUTE }
      : { isDiff: false, type: '' };
  };

  return {
    setVDOM,
    getVDOM,
    compareDiff,
  };
};
