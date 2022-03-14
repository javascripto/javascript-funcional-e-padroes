// @ts-check
import { Maybe } from '../utils/maybe.js';
import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotes = (notesM) =>
  notesM.map((notes) => notes.$flatMap((nota) => nota.itens));

const filterItemsByCode = (code, itemsM) =>
  itemsM.map((items) => items.filter((item) => item.codigo === code));

const sumItemsValues = (itemsM) =>
  itemsM.map((items) => items.reduce((total, item) => total + item.valor, 0));

const sumItems = (code) =>
  pipe(getItemsFromNotes, partialize(filterItemsByCode, code), sumItemsValues);

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .then((notas) => Maybe.of(notas));
  },
  sumItems(code) {
    return this.listAll()
      .then(sumItems(code))
      .then((totalM) => totalM.getOrElse(0));
  },
};
