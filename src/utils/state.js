import { createRoot } from './commit';

export default (function () {
  let index = 0;
  const state = [];

  const forceUpdate = () => {
    index = 0; // index 초기화
    createRoot();
  };

  const useState = (initialSate) => {
    let _index = index; // 현재 useState에서 사용하는 index를 저장
    index++;

    const setState = (newState) => {
      state[_index] = newState;
      forceUpdate();
    };

    if (state[_index] !== undefined) {
      return [state[_index], setState];
    }

    state[_index] = initialSate;

    return [state[_index], setState];
  };

  return { useState };
})();
