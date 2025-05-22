// Teste de performance: Utils
// Executar com: node test/performance/utils.perf.js
const $NG = require('../../dist/ngatecore.umd.js');

const N = 100000;
console.log('--- Performance Utils ---');

// unique
const arr = [];
for (let i = 0; i < N; i++) arr.push(i % 1000);
console.time('unique');
$NG.utils.unique(arr);
console.timeEnd('unique');

// extend
const obj1 = { a: 1 };
const obj2 = { b: 2 };
console.time('extend');
for (let i = 0; i < N; i++) {
  $NG.utils.extend({}, obj1, obj2);
}
console.timeEnd('extend');

// guid
console.time('guid');
for (let i = 0; i < N; i++) {
  $NG.utils.guid();
}
console.timeEnd('guid');
