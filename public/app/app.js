// @ts-check
import {
  compose,
  takeUntil,
  partialize,
  debounceTime,
} from './utils/operators.js';
import './utils/array-helpers.js';
import { notasService as service } from './nota/service.js';

const operations = compose(
  partialize(debounceTime, 500),
  partialize(takeUntil, 3)
);

const action2 = operations(() =>
  service
    .sumItems('2143')
    .then((total) => ({ total }))
    .then(console.log)
    .catch(console.log)
);

document.querySelector('#myButton').onclick = action2;
