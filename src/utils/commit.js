import App from 'src/App';
import { render } from './render';

export const createRoot = () => {
  const root = document.querySelector('#app');

  const len = root.children.length;
  for (let i = 0; i < len; i++) {
    root.removeChild(root.children[0]);
  }

  render(App(), root);
};
