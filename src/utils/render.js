/**
 * virtual DOM을 가지고 실제 DOM에 렌더링하기
 * 부모 노드에서 시작해서 자식 노드에 도달했다가 return 하면서 appendChild를 한다.
 *
 */

import { diffing } from './diff';

const { setVDOM, getVDOM } = diffing();

/** 이벤트 핸들러는 `on${eventName}`으로 이루어짐 */
export const getEventName = (eventName) =>
  eventName.split('on').pop().toLowerCase();

export const handleAttribute = (key) => {
  switch (key) {
    case 'className':
      return 'class';
    default:
      return key;
  }
};

export const handleProps = (target, props) => {
  Object.entries(props).forEach(([key, value]) => {
    try {
      switch (typeof value) {
        case 'function':
          target.addEventListener(getEventName(key), value);
          break;
        case 'undefined':
          break;
        default:
          if (typeof value === 'boolean' && !value) break;
          target.setAttribute(handleAttribute(key), value);
      }
    } catch {
      console.error('올바른 HTML 태그 속성이 아닙니다. 속성을 확인해주세요.');
    }
  });
};

export const createFragment = () => document.createDocumentFragment();

/**
 * @params type: 'Fragment' | string
 */
export const getContainer = (type) => {
  switch (type) {
    case 'Fragment':
      return createFragment();
    default:
      return document.createElement(type);
  }
};

/**
 * interface VDOM {
 *   type: string;
 *   props: { [key: string]: string | function };
 *   children: Array<Node>;
 * }
 *
 */

/**
 * @param children: Array<VDom> | VDOM
 * @returns Array<VDom>
 *
 */
export const getChildren = (children) => {
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
};

export const isPrimitiveType = (value) => {
  if (typeof value === 'boolean') return false; // boolean 처리를 리액트에서 어떻게 하는지 확인 필요
  return typeof value !== 'object';
};

/**
 *
 * @param params: VDOM
 * @returns Node
 *
 */
export const createDOM = ({ type, props, children }) => {
  const container = getContainer(type);

  /** fragment 아닐 때만 props 속성 처리 */
  if (props && container.setAttribute) {
    handleProps(container, props);
  }

  if (!children) return container;

  const [firstChild] = getChildren(children);

  if (isPrimitiveType(firstChild) && children.length === 1) {
    container.appendChild(document.createTextNode(firstChild));
    return container;
  }

  getChildren(children).forEach((child) => {
    container.appendChild(createDOM(child));
  });

  return container;
};

const findChildNode = (target, index = 0) => {
  return target.childNodes[index];
};

export const updateDOM = ({ type, props, isDirty, key, children }, target) => {
  //console.log(type, props, target, isDirty, children);
  if (isDirty) {
    const newChildren = createDOM({ type, props, children });

    target.replaceWith(newChildren);
  } else {
    if (!children || (children.length === 1 && isPrimitiveType(children[0]))) {
      return;
    }

    children?.forEach((child, idx) => {
      updateDOM(child, findChildNode(target, idx));
    });
  }
};

const compareNode = (prevDom, currentDom) => {
  if (prevDom === undefined || prevDom === null) {
    currentDom.isDirty = true;
    return;
  }

  if (!Array.isArray(currentDom) && typeof currentDom !== 'object') {
    return { isDiff: JSON.stringify(prevDom) !== JSON.stringify(currentDom) };
  }

  // key가 다르거나 tag 타입이 다르거나 props가 다르면
  if (
    prevDom.key !== currentDom.key ||
    prevDom.type !== currentDom.type ||
    JSON.stringify(prevDom.props) !== JSON.stringify(currentDom.props)
  ) {
    currentDom.isDirty = true;
  }

  /** 문제1 이벤트 핸들러를 재등록해주지 않으면
   * 내부 상태가 바뀌어도 맨 처음 함수가 호출될 때의 값으로 캡쳐되어(클로저)
   * 이 부분을 어떻게 해결하면 좋을지 고민이 필요함  */
  if (Object.keys(currentDom.props).some((key) => key.startsWith('on'))) {
    currentDom.isDirty = true;
  }

  currentDom?.children?.forEach((child, index) => {
    const result = compareNode(prevDom?.children?.[index], child);

    if (result?.isDiff) {
      currentDom.isDirty = true;
    }
  });
};

/**
 *
 * @param component: VDOM
 * @param target: HTMLElement
 */
export const render = (component, target) => {
  const prevComponent = getVDOM();
  setVDOM(component);

  compareNode(prevComponent, component);

  if (component?.isDirty) {
    const container = createFragment();
    container.appendChild(createDOM(component));

    target.replaceChildren();
    target.appendChild(container);
    return;
  }

  updateDOM(component, target);
};
