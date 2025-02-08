import './style.css';

import { Button } from './components/button.jsx';
import App from './App';
import { serializeVirtualDom } from './utils/serialize';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World!</h1>
  </div>
`;

//document.querySelector('#app').appendChild(Button());

console.log(serializeVirtualDom(Button()));
console.log(serializeVirtualDom(App()));
