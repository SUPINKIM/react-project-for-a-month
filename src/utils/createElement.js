/**
 * createElement 함수 구현
 *
 * - createElement 함수의 역할과 구조를 이해합니다.
 * - type, props, children을 받아 객체를 반환하는 함수를 구현합니다.
 *
 */

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
 * type CreateElement = (type: string | Fragment | Component, props: Props, children: children: Array<CreateElement | number | string | null | undefined>) => Node;
 *
 *  @param (type: string | Fragment | Component, props: Props, children: Array<CreateElement | number | string | null | undefined>)
 *  @returns Node
 *
 */

const isComponent = (type) => typeof type === 'function';

const createChildrenElement = (children) =>
  children.reduce((acc, child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      acc.push(child);
    }

    if (typeof child === 'object') {
      acc.push({ ...child });
    }

    return acc;
  }, []);

export const createElement = (type, props, children) => {
  /**
   * type이 일반 html 태그가 아니라 함수로 들어오는 경우는
   * 함수형 컴포넌트(Component)로 인식하고 처리
   */
  if (isComponent(type)) {
    return type({ ...props, children: children[0] });
  }

  if (children.length === 0) {
    return {
      type,
      props,
    };
  }

  return {
    type,
    props,
    children: createChildrenElement(children),
  };
};
