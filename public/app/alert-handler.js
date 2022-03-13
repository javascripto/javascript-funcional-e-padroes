import { EventEmitter } from './utils/event-emitter.js';

EventEmitter.on('itensTotalizados', (total) => {
  alert(`Total: ${total}`);
});
