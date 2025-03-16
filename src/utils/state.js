import { createRoot } from './commit';

export default (function () {
  let index = 0;
  const state = [];

  let prevDepsIndex = 0;
  const prevDeps = [];
  const clears = [];

  const forceUpdate = async () => {
    index = 0; // index 초기화
    createRoot();
  };

  const useState = (initialSate) => {
    let _index = index; // 현재 useState에서 사용하는 index를 저장
    index++;

    const setState = (newState) => {
      let prev = state[_index];

      if (typeof newState === 'function') {
        state[_index] = newState(state[_index]);
      } else {
        state[_index] = newState;
      }

      if (JSON.stringify(prev) !== JSON.stringify(state[_index])) {
        forceUpdate();
      }
    };

    if (state[_index] !== undefined) {
      return [state[_index], setState];
    }

    state[_index] = initialSate;

    return [state[_index], setState];
  };

  const useEffect = (callback, deps) => {
    const _index = prevDepsIndex;

    clears.forEach((clear, idx) => {
      if (prevDeps[idx].length === 0) {
        clear?.(); // 빈 배열 의존성인 경우 unMounted 될 때만 실행되어야 함
      }
    });

    try {
      if (!Array.isArray(deps)) throw new Error('의존성은 배열이어야 합니다.');

      if (
        prevDeps[_index] &&
        deps &&
        prevDeps[_index].length === 0 &&
        deps.length === 0
      )
        return; // 빈 배열 의존성인 경우 onMounted 시에 1번만 실행

      const isDiff =
        deps.some((dep, idx) => dep !== prevDeps[idx]) || deps.length === 0;

      if (!isDiff) return;

      prevDeps[_index] = deps; // 의존성 배열 업데이트
      const clear = callback();
      clears[_index] = clear;

      if (_index === prevDeps.length - 1) {
        prevDepsIndex = 0;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { useState, useEffect };
})();
