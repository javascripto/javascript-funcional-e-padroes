const topics = new Map();

export const EventEmitter = {
  on(topic, listener) {
    if (!topics.has(topic)) topics.set(topic, []);
    topics.get(topic).push(listener);
  },
  emit(topic, data) {
    if (!topics.has(topic)) return;
    topics.get(topic).forEach((listener) => listener(data));
  },
};
