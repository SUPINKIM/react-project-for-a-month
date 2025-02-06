/**
 * createElement 함수 구현
 *
 * - createElement 함수의 역할과 구조를 이해합니다.
 * - type, props, children을 받아 객체를 반환하는 함수를 구현합니다.
 *
 */

/**
 * interface Props extends Event {
 *   [key: string]: string | number | boolean | Function | null | undefined;
 * }
 *
 * interface Node {
 *   type: string;
 *   props?: Props;
 *   children?: Array<Node> | string | undefined;
 * }
 *
 * type CreateElement = (type: string | Fragment, props: Props, children: children: Array<CreateElement | number | string | null | undefined>) => Node;
 *
 *  @param (type: string | Fragment, props: Props, children: Array<CreateElement | number | string | null | undefined>)
 *  @returns Node
 *
 */
const createElement = (type, props, ...children) => {
  //console.log(children);
  if (children.length === 0) {
    return {
      type,
      props,
    };
  }

  const arr = [];

  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number') {
      arr.push(child);
    }

    if (typeof child === 'boolean') {
      continue;
    }

    if (typeof child === 'object') {
      arr.push({ ...child });
    }
  }

  return {
    type,
    props: {
      ...props,
      children: arr,
    },
  };
};

console.log(
  `출력 결과 1: `,
  JSON.stringify(
    createElement('div', { className: 'container' }, 'Hello, World!'),
  ),
);

console.log(
  `\n 출력 결과 2: `,
  JSON.stringify(
    createElement(
      'div',
      { className: 'container' },
      'Hello, World!',
      createElement('span', { className: 'child', id: '12' }, 'Welcome, 2025'),
    ),
  ),
);

/**
 * Virtual DOM의 이해
 *
 * - Virtual DOM이 무엇인지, 왜 사용하는지 알아봅시다.
 * - 우리가 구현한 createElement 함수로 생성된 객체가 Virtual DOM임을 이해합니다.
 */

/**
 * 재귀를 통한 트리 구조 생성
 *
 * - 자식 요소들이 중첩된 구조를 가지는 컴포넌트를 만들고, 이를 객체로 표현합니다.
 *
 */
