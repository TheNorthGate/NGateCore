// Teste de performance: DOM
// Executar com: node test/performance/dom.perf.js
const $NG = require('../../dist/ngatecore.umd.js');

const N = 10000;
console.log('--- Performance DOM ---');

// Criação massiva de elementos
console.time('criar elementos');
for (let i = 0; i < N; i++) {
  const div = document.createElement('div');
  div.className = 'item';
  div.textContent = 'Item ' + i;
  document.body.appendChild(div);
}
console.timeEnd('criar elementos');

// Seleção em massa
console.time('selecionar .item');
const items = $NG('.item');
console.timeEnd('selecionar .item');

// Manipulação em lote
console.time('addClass em lote');
items.addClass('ativo');
console.timeEnd('addClass em lote');

console.time('html em lote');
items.html('Teste');
console.timeEnd('html em lote');

// Remoção em lote
console.time('remover em lote');
items.remove();
console.timeEnd('remover em lote');
