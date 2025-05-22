// test/events.test.js
// Testes unitários para o módulo de eventos do NGCore

const lib = require('../src/index');

describe('Eventos', () => {
  let el;
  beforeEach(() => {
    document.body.innerHTML = '<button id="btn"></button>';
    el = document.getElementById('btn');
  });

  test('on adiciona listener de evento', () => {
    const handler = jest.fn();
    lib.on(el, 'click', handler);
    el.click();
    expect(handler).toHaveBeenCalled();
  });

  test('off remove listener de evento', () => {
    const handler = jest.fn();
    lib.on(el, 'click', handler);
    lib.off(el, 'click', handler);
    el.click();
    expect(handler).not.toHaveBeenCalled();
  });

  test('one adiciona listener de evento único', () => {
    const handler = jest.fn();
    lib.one(el, 'click', handler);
    el.click();
    el.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('trigger dispara evento customizado', () => {
    const handler = jest.fn();
    lib.on(el, 'meuEvento', handler);
    lib.trigger(el, 'meuEvento');
    expect(handler).toHaveBeenCalled();
  });
});
