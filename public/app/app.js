import { handleStatus } from './utils/promise-helpers.js';

document.querySelector('#myButton').onclick = () => {
  fetch('/notas')
    .then(handleStatus)
    .then((notas) => console.log(notas))
    .catch(console.log);
};
