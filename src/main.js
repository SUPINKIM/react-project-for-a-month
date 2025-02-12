import Button from './components/button.jsx';
import App from './App.jsx';
import { render } from './utils/render.js';

//console.log(serializeVirtualDom(App()));

render(App(), document.querySelector('#app'));
render(Button(), document.querySelector('#app'));
