// Teste de performance: Animação
// Executar com: node test/performance/animation.perf.js

// Setup jsdom-global para ambiente Node.js se document não estiver definido
if (typeof document === 'undefined') {
  require('jsdom-global')();
  // Polyfill para performance.now() se não existir após jsdom-global
  if (typeof performance === 'undefined' || typeof performance.now === 'undefined') {
    global.performance = { now: () => Date.now() }; // Fallback simples
  }
}

const $NG = require('../../dist/ngatecore.umd.js');

// Polyfill para requestAnimationFrame/cancelAnimationFrame no Node.js/jsdom
// (jsdom-global pode fornecer rAF, mas este é um fallback/override)
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
  console.log('Limpeza fadeOut concluída.');
}, 200); // Cleanup for fadeOut test

// Shake animation test - scheduled to run after fadeOut test and its cleanup
setTimeout(() => {
  console.log('\n--- Shake Animation Test ---');
  const shakeElements = [];
  const numShakeElements = 500;

  for (let i = 0; i < numShakeElements; i++) {
    const div = document.createElement('div');
    div.style.width = '10px';
    div.style.height = '10px';
    div.style.background = 'blue'; // Different color for clarity
    div.style.display = 'inline-block';
    div.style.margin = '1px';
    document.body.appendChild(div);
    shakeElements.push(div);
  }

  const startTimeShake = performance.now();
  console.time('shake em lote (batch completion)'); 

  let completedShakeAnimations = 0;
  const totalShakeAnimations = shakeElements.length;

  $NG(shakeElements).shake(200, function() { // Duration: 200ms
    completedShakeAnimations++;
    if (completedShakeAnimations === totalShakeAnimations) {
      const endTimeShake = performance.now();
      console.timeEnd('shake em lote (batch completion)');
      console.log(`Shake animation batch (all ${totalShakeAnimations} elements, measured in last callback) completed in: ${(endTimeShake - startTimeShake).toFixed(2)} ms`);
      
      // Cleanup for shake elements
      $NG(shakeElements).remove();
      console.log('Shake elements cleaned up.');
      console.log('--- Performance Animação Concluído ---');
    }
  });
}, 500); // Delay to ensure fadeOut test + cleanup is done
