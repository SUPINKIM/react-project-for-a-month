import App from 'src/App';
import { render } from './render';

export default (function () {
  let index = 0;
  const state = [];

  const forceUpdate = () => {
    // 다시 VDOM을 그려서 render 를 호출해야 한다.
    index = 0;

    const root = document.querySelector('#app');

    root.remove();

    const body = document.querySelector('body');

    const newRoot = document.createElement('div');
    newRoot.setAttribute('id', 'app');

    render(App(), newRoot);

    body.appendChild(newRoot);
  };

  const useState = (initialSate) => {
    let _index = index; // 현재 useState에서 사용하는 index를 저장
    index++;

    const setState = (newState) => {
      state[_index] = newState;
      forceUpdate();
    };

    if (!!state[_index]) {
      return [state[_index], setState];
    }

    state[_index] = initialSate;

    return [state[_index], setState];
  };

  return { useState };
})();
