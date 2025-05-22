// Teste de performance: Animação
// Executar com: node test/performance/animation.perf.js
const $NG = require('../../dist/ngatecore.umd.js');

// Polyfill para requestAnimationFrame/cancelAnimationFrame no Node.js/jsdom
if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function(cb) {
    return setTimeout(() => cb(Date.now()), 16);
  };
  global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

const N = 500;
console.log('--- Performance Animação ---');

// Criação de elementos
const divs = [];
for (let i = 0; i < N; i++) {
  const div = document.createElement('div');
  div.style.width = '10px';
  div.style.height = '10px';
  div.style.background = '#ccc';
  div.style.display = 'inline-block';
  document.body.appendChild(div);
  divs.push(div);
}

// Animação em lote (fadeOut)
console.time('fadeOut em lote');
$NG(divs).fadeOut(100, function() {
  // callback vazio
});
console.timeEnd('fadeOut em lote');

// Limpeza após animação
setTimeout(() => {
  $NG(divs).remove();
  console.log('Limpeza concluída.');
}, 200);
