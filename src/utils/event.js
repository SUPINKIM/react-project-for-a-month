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

        name === 'submit' && e.preventDefault();

        pushEvent(target, name, e);
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
    const targetEventMap = !eventElements.has(targetKey)
      ? new Map()
      : eventElements.get(targetKey);

    targetEventMap.set(name, fn);

    eventElements.set(targetKey, targetEventMap);

    addEventListenerOnRoot(name, capture);
  };

  const pushEvent = (target, name, e) => {
    queue.set(target, { event: e, name });
  };

  // Q. 어느 시점에 dispatchEvent를 호출해야 할까?
  const dispatchEvent = () => {
    for (const [target, { event, name }] of queue) {
      const fn = eventElements.get(target).get(name);
      fn && fn(event);
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
