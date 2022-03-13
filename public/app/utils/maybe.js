// @ts-check

import { pipe } from './operators.js';

export class Maybe {
  #value = undefined;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  static empty() {
    return new Maybe(null);
  }

  isNothing() {
    return this.#value === null || this.#value === undefined;
  }

  map(fn) {
    if (this.isNothing()) return Maybe.empty();
    return Maybe.of(fn(this.#value));
  }

  get() {
    return this.#value;
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.#value;
  }
}

// Maybe é uma monada
// Monada = functor para um tipo
// O método map do maybe nunca dá erro se o valor for nulo e não quebra a cadeira de composição de funções

function monadExample() {
  const maybe1 = Maybe.of(10)
    .map((v) => v + 2)
    .map((v) => v + 5)
    .getOrElse(0);

  const maybe2 = Maybe.of(null)
    .map((v) => v + 2)
    .map((v) => v + 5)
    .getOrElse(0);

  console.log({ maybe1, maybe2 });

  const textToArray = (textM) => textM.map((text) => Array.from(text));
  const arrayToText = (arrayM) => arrayM.map((array) => array.join(''));

  const transform = pipe(textToArray, arrayToText); // pipe com funções que trabalham com monadas
  console.log(transform(Maybe.of('example')).getOrElse('não funcionou'));
  console.log(transform(Maybe.empty()).getOrElse('não funcionou'));
}

// monadExample();
