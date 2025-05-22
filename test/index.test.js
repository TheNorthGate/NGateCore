// Testes básicos usando Jest
// test/index.test.js

const lib = require('../src/index');

describe('NGateCore', () => {
  test('deve selecionar elementos DOM', () => {
    document.body.innerHTML = '<div class="x"></div>';
    const el = lib('.x');
    expect(el).toBeDefined();
  });
});

// Importa e executa todos os testes unitários segregados
require('./dom.test');
require('./ajax.test');
require('./events.test');
require('./animation.test');
require('./utils.test');

