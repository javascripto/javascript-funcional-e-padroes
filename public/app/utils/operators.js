// // Aplicação parcial
// const ehDivisivel = (divisor, numero) = !(numero % divisor); // função de 2 argumentos
// const ehDivisivelPorDois = ehDivisivel.bind(null, 2); // convertendo para função de 1 argumento pois o primeiro já foi passado
// const ehDivisivelPorDois = (numero) => ehDivisivel(2, numero); // Mesmo que o código de cima

export const partialize = (fn, ...args) => {
  return fn.bind(null, ...args);
};

// Código de cima de outra forma
const partialize2 = (fn, ...fnOriginalArgs) => {
  return (...restArgs) => fn(...fnOriginalArgs, ...restArgs);
};

// point free functions
// funções que em momento nenhum fazem referencia a parâmetros
// ex: compose(toUpperCase, trim) // toUpperCase(trim(string))  // retorna uma função para trabalhar com string mas em momento nenhum isso foi informado
export function compose(...fns) {
  return (firstArgument) =>
    fns.reduceRight((composed, fn) => fn(composed), firstArgument);
}

// Pipe é como o compose porém a order das funções é a ordem de execução tornando o código mais legível
// ex: pipe(trim, upperCase) // s.trim().toUpperCase()
export function pipe(...fns) {
  return (firstArgument) =>
    fns.reduce((composed, fn) => fn(composed), firstArgument);
}

export const takeUntil = (times, fn) => {
  return () => times-- > 0 && fn();
};
