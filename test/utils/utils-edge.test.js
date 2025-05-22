// Testes de utilitários com entradas inesperadas
const $NG = require('../../dist/ngatecore.umd.js');

describe('Utils - entradas inesperadas', () => {
  test('isArray com null/undefined/obj', () => {
    expect($NG.utils.isArray(null)).toBe(false);
    expect($NG.utils.isArray(undefined)).toBe(false);
    expect($NG.utils.isArray({})).toBe(false);
  });

  test('isObject com null/array/number', () => {
    expect($NG.utils.isObject(null)).toBe(false);
    expect($NG.utils.isObject([])).toBe(false);
    expect($NG.utils.isObject(123)).toBe(false);
  });

  test('isString com number/obj/undefined', () => {
    expect($NG.utils.isString(123)).toBe(false);
    expect($NG.utils.isString({})).toBe(false);
    expect($NG.utils.isString(undefined)).toBe(false);
  });

  test('isNumber com string/NaN/undefined', () => {
    expect($NG.utils.isNumber('abc')).toBe(false);
    expect($NG.utils.isNumber(NaN)).toBe(false);
    expect($NG.utils.isNumber(undefined)).toBe(false);
  });

  test('unique com null/undefined/obj', () => {
    expect($NG.utils.unique(null)).toEqual([]);
    expect($NG.utils.unique(undefined)).toEqual([]);
    expect($NG.utils.unique({})).toEqual([]);
  });

  test('extend com null/undefined', () => {
    expect($NG.utils.extend(null, {a:1})).toEqual({a:1});
    expect($NG.utils.extend(undefined, {a:1})).toEqual({a:1});
    expect($NG.utils.extend({}, null)).toEqual({});
  });

  test('escapeHTML/unescapeHTML com null/number', () => {
    expect($NG.utils.escapeHTML(null)).toBe('');
    expect($NG.utils.escapeHTML(123)).toBe('');
    expect($NG.utils.unescapeHTML(null)).toBe('');
    expect($NG.utils.unescapeHTML(123)).toBe('');
  });

  test('guid sempre retorna string', () => {
    expect(typeof $NG.utils.guid()).toBe('string');
  });
});
