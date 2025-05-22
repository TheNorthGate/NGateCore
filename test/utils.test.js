// test/utils.test.js
// Testes unitários para o módulo de utilitários do NGCore

const lib = require('../src/index');

describe('Utils', () => {
  test('escapeHTML escapa caracteres especiais', () => {
    expect(lib.utils.escapeHTML('<div>"&</div>')).toBe('&lt;div&gt;&quot;&amp;&lt;/div&gt;');
  });

  test('unescapeHTML desscapa caracteres', () => {
    expect(lib.utils.unescapeHTML('&lt;div&gt;&quot;&amp;&lt;/div&gt;')).toBe('<div>"&</div>');
  });

  test('isArray reconhece arrays', () => {
    expect(lib.utils.isArray([])).toBe(true);
    expect(lib.utils.isArray({})).toBe(false);
  });

  test('isObject reconhece objetos', () => {
    expect(lib.utils.isObject({})).toBe(true);
    expect(lib.utils.isObject([])).toBe(false);
  });

  test('isString reconhece strings', () => {
    expect(lib.utils.isString('x')).toBe(true);
    expect(lib.utils.isString(1)).toBe(false);
  });

  test('isFunction reconhece funções', () => {
    expect(lib.utils.isFunction(() => {})).toBe(true);
    expect(lib.utils.isFunction({})).toBe(false);
  });

  test('isNumber reconhece números', () => {
    expect(lib.utils.isNumber(1)).toBe(true);
    expect(lib.utils.isNumber('1')).toBe(false);
  });

  test('isElement reconhece elementos DOM', () => {
    const el = document.createElement('div');
    expect(lib.utils.isElement(el)).toBe(true);
    expect(lib.utils.isElement({})).toBe(false);
  });

  test('unique remove duplicatas de array', () => {
    expect(lib.utils.unique([1, 1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
});
