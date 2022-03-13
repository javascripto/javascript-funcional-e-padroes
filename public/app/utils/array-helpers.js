if (!Array.prototype.$flat) {
  Array.prototype.$flat = function () {
    return this.reduce((a, b) => a.concat(b), []);
  };
}

// O tipo Array é um functor pois implementa o método map, tudo que implementa um map pode ser considerado um functor
// No jargão da programação funcional um Functor é simplesmente algo mapeável, ou seja, que suporta a operação map.

if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (mapFn) {
    return this.map(mapFn).$flat();
  };
}
