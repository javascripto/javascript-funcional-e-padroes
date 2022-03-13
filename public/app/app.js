// @ts-check
import { takeUntil, debounceTime } from './utils/operators.js';
import { notasService as service } from './nota/service.js';
import './utils/array-helpers.js';

const action = debounceTime(
  500,
  takeUntil(3, () =>
    service
      .sumItems('2143')
      .then((total) => ({ total }))
      .then(console.log)
      .catch(console.log)
  )
);

document.querySelector('#myButton').onclick = action;
