import App from 'src/App';
import { render } from './render';
import keys from './keys';

export const createRoot = () => {
  const root = document.querySelector('#app');

  keys.clearKey();
  render(App(), root);
};
