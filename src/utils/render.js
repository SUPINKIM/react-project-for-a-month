/**
 * virtual DOM을 가지고 실제 DOM에 렌더링하기
 * 부모 노드에서 시작해서 자식 노드에 도달했다가 return 하면서 appendChild를 한다.
 *
 */

/** 이벤트 핸들러는 `on${eventName}`으로 이루어짐 */
import { DIFF_TYPE, diffing } from './diff';

const { setVDOM, getVDOM, compareDiff } = diffing();

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
export const createDOM = ({ type, props, children, key }, target) => {
  // diff 알고리즘을 통해서 달라진 경우만 새 노드를 만든다.
  const { isDiff, type: diffType, prevNode } = compareDiff(type, key);
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
    const newNodes = createDOM(child, container);
    if (!getVDOM() || !prevNode) {
      target.appendChild(newNodes);
    } else if (isDiff && diffType === DIFF_TYPE.ELEMENT) {
      target.replaceChildren(prevNode, newNodes);
    }
  });

  return container;
};

/**
 *
 * @param component: VDOM
 * @param target: HTMLElement
 */
export const render = (component, target) => {
  createDOM(component, target);
  setVDOM(component);
};
