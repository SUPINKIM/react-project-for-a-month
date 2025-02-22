/**
 * @link https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js
 * 
 * type DispatchListener = {
    instance: null | Fiber,
    listener: Function,
    currentTarget: EventTarget,
  };

  type DispatchEntry = {
    event: ReactSyntheticEvent,
    listeners: Array<DispatchListener>,
  };
 *  

  function extractEvents(
    dispatchQueue: DispatchQueue,
    domEventName: DOMEventName,
    targetInst: null | Fiber,
    nativeEvent: AnyNativeEvent,
    nativeEventTarget: null | EventTarget,
    eventSystemFlags: EventSystemFlags,
    targetContainer: EventTarget,
  ) {}
 * 
 */

import { createRoot } from './commit';

export default (function () {
  const queue = new Map();

  const eventElements = new Map();

  const root = document.querySelector('#app');

  const addEventListenerOnRoot = (name, capture = false) => {
    root.addEventListener(
      name,
      (e) => {
        const target = e.target.__innerKey;

        const targetEventMap = eventElements.get(target);

        if (!targetEventMap) return;

        const fn = targetEventMap.get(name);

        // submit event는 div 엘리먼트에 이벤트 리스너를 달 수 없어서 다른 방법으로 우회해야 함(native event)
        fn && pushEvent(target, () => fn(e));
      },
      capture,
    );
  };

  /**
   *
   * @param targetKey: inner_key_${key}
   * @param name: string // click, change, input, ...
   * @param fn: callback function
   */
  const addEventHandler = (targetKey, name, fn, capture = false) => {
    // 정확히 어떤 element에서 이벤트가 발생했는지 알아야 한다.
    // Q. eventTarget은 Element인데 어떻게 이걸 키로 사용할 수 있을까?
    // 가상 돔과 실제 돔을 매핑하는 방법은 무엇일까?

    const targetEventMap = !eventElements.has(targetKey)
      ? new Map()
      : eventElements.get(targetKey);

    targetEventMap.set(name, fn);

    eventElements.set(targetKey, targetEventMap);

    addEventListenerOnRoot(name, capture);
  };

  const pushEvent = (target, fn) => {
    queue.set(target, fn);
  };

  // Q. 어느 시점에 dispatchEvent를 호출해야 할까?
  const dispatchEvent = () => {
    for (const [_, fn] of queue) {
      fn();
    }

    queue.clear();
  };

  setInterval(dispatchEvent, 16);

  return {
    pushEvent,
    dispatchEvent,
    addEventHandler,
  };
})();
