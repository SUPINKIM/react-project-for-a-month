/**
 * virtual DOM을 가지고 실제 DOM에 렌더링하기
 * 부모 노드에서 시작해서 자식 노드에 도달했다가 return 하면서 appendChild를 한다.
 *
 */

import Diff from '@/utils/diff';
import Event from '@/utils/event';

const { setVDOM, getVDOM } = Diff;

const { addEventHandler } = Event;

/** 이벤트 핸들러는 `on${eventName}?Capture`으로 이루어짐 */
export const getEventName = (eventName) =>
  eventName.split('on').pop().split('Capture')[0].toLowerCase();

export const handleAttribute = (key) => {
  switch (key) {
    case 'className':
      return 'class';
    default:
      return key;
  }
};

export const handleEventListeners = (target, key, fn) => {
  const eventName = getEventName(key);

  const isCapture = key.endsWith('Capture');

  addEventHandler(target.__innerKey, eventName, fn, isCapture);
};

export const handleProps = (target, props) => {
  Object.entries(props).forEach(([key, value]) => {
    try {
      switch (typeof value) {
        case 'function':
          handleEventListeners(target, key, value);
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

export const injectInnerKey = (target, innerKey) => {
  target.__innerKey = innerKey;
};

/**
 *
 * @param params: VDOM
 * @returns Node
 *
 */
export const createDOM = ({ type, props, __innerKey, children }) => {
  const container = getContainer(type);

  /** fragment 아닐 때만 props 속성 처리 */
  if (props && container.setAttribute) {
    injectInnerKey(container, __innerKey);
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

export const updateDOM = (
  { type, props, isDirty, isUpdateEvent, __innerKey, children },
  target,
) => {
  if (isDirty) {
    const newChildren = createDOM({ type, props, __innerKey, children });
    target && target.replaceWith(newChildren);
  } else {
    if (isUpdateEvent) {
      handleProps(target, props);
    }

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

  // key / tag / props가 다르면
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
    currentDom.isUpdateEvent = true;
  }

  if (currentDom?.children?.length !== prevDom?.children?.length) {
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
  } else {
    updateDOM(component, target);
  }
};
