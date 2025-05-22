// Teste de vazamento de memória: DOM + Eventos
// Executar com: node -r jsdom-global/register test/performance/leak/dom-leak.test.js
const $NG = require('../../dist/ngatecore.umd.js');

const N = 20000;
console.log('--- Leak Test: DOM + Eventos ---');

function createAndRemove() {
  const elements = [];
  for (let i = 0; i < N; i++) {
    const div = document.createElement('div');
    div.className = 'leak-item';
    document.body.appendChild(div);
    elements.push(div);
  }
  // Adiciona eventos
  $NG(elements).on('click', function(){});
  // Remove eventos e elementos
  $NG(elements).off('click');
  $NG(elements).remove();
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function logMemory(label) {
  const mem = process.memoryUsage();
  console.log(`${label} | heapUsed: ${formatMB(mem.heapUsed)} | rss: ${formatMB(mem.rss)}`);
}

logMemory('Memória inicial');
console.time('ciclos de criação+remoção');
for (let i = 0; i < 10; i++) {
  createAndRemove();
  if ((i+1) % 2 === 0) {
    global.gc && global.gc(); // força GC se rodar com --expose-gc
    logMemory(`Após ciclo ${i+1}`);
  }
}
console.timeEnd('ciclos de criação+remoção');
logMemory('Memória final');

console.log('Se heapUsed continuar subindo a cada ciclo, pode haver vazamento.');
