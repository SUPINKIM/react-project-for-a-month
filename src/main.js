import './style.css';

import { Button } from './button.jsx';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World!</h1>
  </div>
`;

//document.querySelector('#app').appendChild(Button());
console.log(JSON.stringify(Button(), null, '\t'));
