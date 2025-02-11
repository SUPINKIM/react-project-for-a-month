import { Button } from './components/button.jsx';
import App from './App';
import { serializeVirtualDom } from './utils/serialize';
import { render } from './utils/render.js';

//document.querySelector('#app').appendChild(Button());

console.log(serializeVirtualDom(Button()));
//console.log(serializeVirtualDom(App()));

const button = Button();

document.querySelector('#app').appendChild(render(button));
