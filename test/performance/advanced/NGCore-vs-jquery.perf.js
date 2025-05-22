// Teste de performance avançado: NGateCore vs jQuery (DOM)
// Executar com: node test/performance/advanced/dom-vs-jquery.perf.js

require('jsdom-global')();
const $NG = require('../../../dist/ngatecore.umd.js');
const $ = require('jquery');

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
  var jqueryTimes = [];
  console.log = function(...args) {
    origLog.apply(console, args);
    const line = args.join(' ');
    if (line.startsWith('NGateCore')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) ngatecoreTimes.push(parseFloat(match[1]));
    }
    if (line.startsWith('jQuery')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) jqueryTimes.push(parseFloat(match[1]));
    }
  };
  process.on('exit', () => {
    const ngTotal = ngatecoreTimes.reduce((a, b) => a + b, 0);
    const jqTotal = jqueryTimes.reduce((a, b) => a + b, 0);
    origLog('\n--- Tempo total de execução ---');
    origLog(`NGateCore: ${ngTotal.toFixed(2)} ms (${(ngTotal/1000).toFixed(2)} s)`);
    origLog(`jQuery: ${jqTotal.toFixed(2)} ms (${(jqTotal/1000).toFixed(2)} s)`);
  });
}

console.log('--- Teste de criação de elementos ---');

measure('NGateCore', () => {
  for (let i = 0; i < N; i++) {
    // Criação e inserção manual, sem API encadeável
    const el = document.createElement('div');
    el.className = 'test';
    document.body.appendChild(el);
    document.body.removeChild(el);
  }
});

measure('jQuery', () => {
  for (let i = 0; i < N; i++) {
    $('<div class="test"></div>').appendTo(document.body).remove();
  }
});

console.log('--- Teste de seleção de elementos ---');
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}

measure('NGateCore', () => {
  $NG('span');
});
measure('jQuery', () => {
  $('span');
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
measure('jQuery addClass', () => {
  $('span').addClass('foo');
});

measure('NGateCore removeClass', () => {
  $NG('span').removeClass('foo');
});
measure('jQuery removeClass', () => {
  $('span').removeClass('foo');
});

measure('NGateCore toggleClass', () => {
  $NG('span').toggleClass('foo');
});
measure('jQuery toggleClass', () => {
  $('span').toggleClass('foo');
});

console.log('--- Teste de leitura e escrita de atributos ---');
measure('NGateCore attr set', () => {
  $NG('span').attr('data-x', '123');
});
measure('jQuery attr set', () => {
  $('span').attr('data-x', '123');
});

measure('NGateCore attr get', () => {
  $NG('span').attr('data-x');
});
measure('jQuery attr get', () => {
  $('span').attr('data-x');
});

console.log('--- Teste de manipulação de conteúdo (html/text) ---');
measure('NGateCore html', () => {
  $NG('span').html('<b>abc</b>');
});
measure('jQuery html', () => {
  $('span').html('<b>abc</b>');
});

measure('NGateCore text', () => {
  $NG('span').text('xyz');
});
measure('jQuery text', () => {
  $('span').text('xyz');
});

console.log('--- Teste de remoção em lote ---');
measure('NGateCore remove', () => {
  $NG('span').remove();
});
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}
measure('jQuery remove', () => {
  $('span').remove();
});

console.log('--- Teste de encadeamento de métodos ---');
for (let i = 0; i < N; i++) {
  document.body.appendChild(document.createElement('span'));
}
measure('NGateCore chain', () => {
  $NG('span').addClass('a').attr('data-c','1').css('color','red').removeClass('a');
});
measure('jQuery chain', () => {
  $('span').addClass('a').attr('data-c','1').css('color','red').removeClass('a');
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
measure('jQuery by id', () => {
  $('#myid');
});
measure('NGateCore by class', () => {
  $NG('.myclass');
});
measure('jQuery by class', () => {
  $('.myclass');
});
measure('NGateCore by tag', () => {
  $NG('div');
});
measure('jQuery by tag', () => {
  $('div');
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
measure('jQuery clone', () => {
  for (let i = 0; i < N; i++) {
    $('.to-clone').clone().appendTo(document.body).remove();
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
measure('jQuery detach', () => {
  $('div').detach();
});
for (const el of detachEls) document.body.appendChild(el);

console.log('--- Teste de alteração de estilos (css) ---');
measure('NGateCore css', () => {
  $NG('div').css('background','blue');
});
measure('jQuery css', () => {
  $('div').css('background','blue');
});

console.log('--- Teste de manipulação de datasets (data-*) ---');
measure('NGateCore data set', () => {
  $NG('div').attr('data-ng','ok');
});
measure('jQuery data set', () => {
  $('div').attr('data-ng','ok');
});
measure('NGateCore data get', () => {
  $NG('div').attr('data-ng');
});
measure('jQuery data get', () => {
  $('div').attr('data-ng');
});

// Limpeza final
document.body.innerHTML = '';

// --- Resumo dos tempos ---
// Captura os tempos de execução do console
const fs = require('fs');
const path = require('path');

// Função para extrair tempos do console.log
function extractTimes() {
  const logs = fs.readFileSync(__filename.replace(/.js$/, '.log'), 'utf8');
  const ngatecoreTimes = [];
  const jqueryTimes = [];
  logs.split('\n').forEach(line => {
    if (line.startsWith('NGateCore')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) ngatecoreTimes.push(parseFloat(match[1]));
    }
    if (line.startsWith('jQuery')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) jqueryTimes.push(parseFloat(match[1]));
    }
  });
  return {
    ngatecore: ngatecoreTimes.reduce((a, b) => a + b, 0),
    jquery: jqueryTimes.reduce((a, b) => a + b, 0)
  };
}

// Se rodando diretamente, tenta extrair do console atual
if (require.main === module) {
  // Não há log, então intercepta o console.log
  const origLog = console.log;
  const ngatecoreTimes = [];
  const jqueryTimes = [];
  console.log = function(...args) {
    origLog.apply(console, args);
    const line = args.join(' ');
    if (line.startsWith('NGateCore')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) ngatecoreTimes.push(parseFloat(match[1]));
    }
    if (line.startsWith('jQuery')) {
      const match = line.match(/: ([\d.]+) ms/);
      if (match) jqueryTimes.push(parseFloat(match[1]));
    }
  };
  process.on('exit', () => {
    const ngTotal = ngatecoreTimes.reduce((a, b) => a + b, 0);
    const jqTotal = jqueryTimes.reduce((a, b) => a + b, 0);
    origLog('\n--- Tempo total de execução ---');
    origLog(`NGateCore: ${ngTotal.toFixed(2)} ms (${(ngTotal/1000).toFixed(2)} s)`);
    origLog(`jQuery: ${jqTotal.toFixed(2)} ms (${(jqTotal/1000).toFixed(2)} s)`);
  });
}
