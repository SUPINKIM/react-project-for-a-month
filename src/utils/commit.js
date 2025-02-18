import App from 'src/App';
import { render } from './render';

export const createRoot = () => {
  const root = document.querySelector('#app');

  render(App(), root);
};
