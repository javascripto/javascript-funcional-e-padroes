// @ts-check
import {
  compose,
  takeUntil,
  partialize,
  debounceTime,
} from './utils/operators.js';
import './utils/array-helpers.js';
import { EventEmitter } from './utils/event-emitter.js';
import { notasService as service } from './nota/service.js';
import { retry, delay, timeoutPromise } from './utils/promise-helpers.js';

const operations = compose(
  partialize(debounceTime, 500),
  partialize(takeUntil, 3)
);

const action = operations(() =>
  retry(3, 1000, () => timeoutPromise(200, service.sumItems('2143')))
    .then(delay(1000))
    .then((total) => EventEmitter.emit('itensTotalizados', total))
    .catch(console.log)
);

document.querySelector('#myButton').addEventListener('click', action);
