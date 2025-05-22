// Teste de performance avançado: NGateCore vs @olton/dom (DOM)
// Executar com: node test/performance/advanced/NGCore-vs-@olton_dom.perf.js

require('jsdom-global')();
const $NG = require('../../../dist/ngatecore.umd.js');
const DOM = require('@olton/dom');
const $DOM = DOM.$;

function measure(label, fn) {
  const start = process.hrtime.bigint();
  fn();
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1e6;
  console.log(`${label}: ${ms.toFixed(2)} ms`);
}

const N = 10000;

// --- Captura de tempos para resumo ---
if (require.main === module && !global.__ngatecore_perf_hooked) {
  global.__ngatecore_perf_hooked = true;
  const origLog = console.log;
  var ngatecoreTimes = [];
  var domTimes = [];
  console.log = function(...args) {
    origLog.apply(console, args);
    const line = args.join(' ');
    if (line.startsWith('NGateCore')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) ngatecoreTimes.push(parseFloat(match[1]));
    }
    if (line.startsWith('@olton/dom')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) domTimes.push(parseFloat(match[1]));
    }
  };
  process.on('exit', () => {
    const ngTotal = ngatecoreTimes.reduce((a, b) => a + b, 0);
    const domTotal = domTimes.reduce((a, b) => a + b, 0);
    origLog('\n--- Tempo total de execução ---');
    origLog(`NGateCore: ${ngTotal.toFixed(2)} ms (${(ngTotal/1000).toFixed(2)} s)`);
    origLog(`@olton/dom: ${domTotal.toFixed(2)} ms (${(domTotal/1000).toFixed(2)} s)`);
  });
}

console.log('--- Teste de criação de elementos ---');
measure('NGateCore', () => {
  for (let i = 0; i < N; i++) {
    const el = document.createElement('div');
    el.className = 'test';
    document.body.appendChild(el);
    document.body.removeChild(el);
  }
});
measure('@olton/dom', () => {
  for (let i = 0; i < N; i++) {
    $DOM('<div class="test"></div>').appendTo(document.body).remove();
  }
});

console.log('--- Teste de seleção de elementos ---');
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}
measure('NGateCore', () => {
  $NG('span');
});
measure('@olton/dom', () => {
  $DOM('span');
});

console.log('--- Teste de manipulação em lote: addClass/removeClass/toggleClass ---');
const spans = [];
for (let i = 0; i < N; i++) {
  const el = document.createElement('span');
  document.body.appendChild(el);
  spans.push(el);
}
measure('NGateCore addClass', () => {
  $NG('span').addClass('foo');
});
measure('@olton/dom addClass', () => {
  $DOM('span').addClass('foo');
});
measure('NGateCore removeClass', () => {
  $NG('span').removeClass('foo');
});
measure('@olton/dom removeClass', () => {
  $DOM('span').removeClass('foo');
});
measure('NGateCore toggleClass', () => {
  $NG('span').toggleClass('foo');
});
measure('@olton/dom toggleClass', () => {
  $DOM('span').toggleClass('foo');
});

console.log('--- Teste de leitura e escrita de atributos ---');
measure('NGateCore attr set', () => {
  $NG('span').attr('data-x', '123');
});
measure('@olton/dom attr set', () => {
  $DOM('span').attr('data-x', '123');
});
measure('NGateCore attr get', () => {
  $NG('span').attr('data-x');
});
measure('@olton/dom attr get', () => {
  $DOM('span').attr('data-x');
});

console.log('--- Teste de manipulação de conteúdo (html/text) ---');
measure('NGateCore html', () => {
  $NG('span').html('<b>abc</b>');
});
measure('@olton/dom html', () => {
  $DOM('span').html('<b>abc</b>');
});
measure('NGateCore text', () => {
  $NG('span').text('xyz');
});
measure('@olton/dom text', () => {
  $DOM('span').text('xyz');
});

console.log('--- Teste de remoção em lote ---');
measure('NGateCore remove', () => {
  $NG('span').remove();
});
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}
measure('@olton/dom remove', () => {
  $DOM('span').remove();
});

console.log('--- Teste de encadeamento de métodos ---');
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}
measure('NGateCore chain', () => {
  $NG('span').addClass('a').attr('data-c','1').css('color','red').removeClass('a');
});
measure('@olton/dom chain', () => {
  $DOM('span').addClass('a').attr('data-c','1').css('color','red').removeClass('a');
});

console.log('--- Teste de seleção por ID, classe e tag ---');
const idEl = document.createElement('div');
idEl.id = 'myid';
document.body.appendChild(idEl);
const classEls = [];
for (let i = 0; i < N; i++) {
  const el = document.createElement('div');
  el.className = 'myclass';
  document.body.appendChild(el);
  classEls.push(el);
}
measure('NGateCore by id', () => {
  $NG('#myid');
});
measure('@olton/dom by id', () => {
  $DOM('#myid');
});
measure('NGateCore by class', () => {
  $NG('.myclass');
});
measure('@olton/dom by class', () => {
  $DOM('.myclass');
});
measure('NGateCore by tag', () => {
  $NG('div');
});
measure('@olton/dom by tag', () => {
  $DOM('div');
});

console.log('--- Teste de clone e inserção ---');
const cloneSrc = document.createElement('div');
cloneSrc.className = 'to-clone';
document.body.appendChild(cloneSrc);
measure('NGateCore clone', () => {
  for (let i = 0; i < N; i++) {
    $NG('.to-clone').clone().appendTo(document.body).remove();
  }
});
measure('@olton/dom clone', () => {
  for (let i = 0; i < N; i++) {
    $DOM('.to-clone').clone().appendTo(document.body).remove();
  }
});

console.log('--- Teste de detach/reattach ---');
const detachEls = [];
for (let i = 0; i < N; i++) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  detachEls.push(el);
}
measure('NGateCore detach', () => {
  $NG('div').detach();
});
for (const el of detachEls) document.body.appendChild(el);
// Substitui detach por remove para @olton/dom
measure('@olton/dom detach (remove)', () => {
  $DOM('div').remove();
});
for (const el of detachEls) document.body.appendChild(el);

console.log('--- Teste de alteração de estilos (css) ---');
measure('NGateCore css', () => {
  $NG('div').css('background','blue');
});
measure('@olton/dom css', () => {
  $DOM('div').css('background','blue');
});

console.log('--- Teste de manipulação de datasets (data-*) ---');
measure('NGateCore data set', () => {
  $NG('div').attr('data-ng','ok');
});
measure('@olton/dom data set', () => {
  $DOM('div').attr('data-ng','ok');
});
measure('NGateCore data get', () => {
  $NG('div').attr('data-ng');
});
measure('@olton/dom data get', () => {
  $DOM('div').attr('data-ng');
});

// Limpeza final
document.body.innerHTML = '';
