/**
 * virtual DOM을 가지고 실제 DOM에 렌더링하기
 * 부모 노드에서 시작해서 자식 노드에 도달했다가 return 하면서 appendChild를 한다.
 *
 */

import { EVENT_TYPE } from 'src/constants/events';

export const handleEventListener = () => {};

export const handleEvent = (target, key, fn) => {
  try {
    target.addEventListener(EVENT_TYPE[key], fn);
  } catch {
    console.error(
      `해당 이벤트는 아직 이벤트 타입에 정의되지 않았습니다. 이벤트 타입을 확인해주세요.`,
    );
  }
};

export const handleProps = (target, props) => {
  Object.entries(props).forEach(([key, value]) => {
    switch (typeof value) {
      case 'function':
        handleEvent(target, key, value);
        break;
      default:
        target.setAttribute(key, value);
        break;
    }
  });
};

export const createRootElement = () => {
  // 가장 상위에 있는 가상 노드
  return document.createDocumentFragment();
};

/**
 * interface CreateDomParams {
 *   type: string;
 *   props: { [key: string]: string | function };
 *   children: Array<Node>;
 * }
 *
 */

/**
 *
 * @param params: CreateDomParams
 * @returns Node
 *
 */
export const createDom = ({ type, props, children }) => {
  const container = document.createElement(type); // type이 string인 경우

  /**
   * TODO
   * 1. 속성 처리를 어떻게 할 것인지
   * 2. 이벤트 핸들러 처리는 어떻게 할 것인지
   */

  if (props) {
    handleProps(container, props);
  }

  const [firstChild] = children;

  if (typeof firstChild === 'string' && children.length === 1) {
    container.appendChild(document.createTextNode(firstChild));
    return container;
  }

  for (const child of children) {
    container.appendChild(createDom(child));
  }

  return container;
};

export const render = (params) => {
  const container = createRootElement();

  container.appendChild(createDom(params));

  return container;
};
