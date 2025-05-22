// Teste de performance: AJAX
// Executar com: node test/performance/ajax.perf.js
const $NG = require('../../dist/ngatecore.umd.js');

const N = 50;
console.log('--- Performance AJAX ---');

let completed = 0;
console.time('AJAX GET em lote');
for (let i = 0; i < N; i++) {
  $NG.get('https://jsonplaceholder.typicode.com/todos/' + ((i % 10) + 1), function(data) {
    completed++;
    if (completed === N) {
      console.timeEnd('AJAX GET em lote');
    }
  });
}
