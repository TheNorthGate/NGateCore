// Teste de performance: Eventos
// Executar com: node test/performance/events.perf.js
const $NG = require('../../dist/ngatecore.umd.js');

const N = 10000;
console.log('--- Performance Eventos ---');

// Criação de elementos
const btns = [];
for (let i = 0; i < N; i++) {
  const btn = document.createElement('button');
  btn.textContent = 'Btn ' + i;
  document.body.appendChild(btn);
  btns.push(btn);
}

// Adição de listeners em massa
console.time('on em massa');
$NG(btns).on('click', function(){});
console.timeEnd('on em massa');

// Disparo de eventos em massa
console.time('trigger em massa');
btns.forEach(btn => btn.click());
console.timeEnd('trigger em massa');

// Remoção de listeners em massa
console.time('off em massa');
$NG(btns).off('click');
console.timeEnd('off em massa');

// Limpeza
$NG(btns).remove();
