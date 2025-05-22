/**
 * Verifica se é array.
 * @param {any} val
 * @returns {boolean}
 */
export const isArray = val => Array.isArray(val);

/**
 * Verifica se é objeto.
 * @param {any} val
 * @returns {boolean}
 */
export const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

/**
 * Verifica se é função.
 * @param {any} val
 * @returns {boolean}
 */
export const isFunction = val => typeof val === 'function';

/**
 * Converte NodeList, arguments, etc. para array.
 * @param {any} val
 * @returns {Array}
 */
export const toArray = val => {
  if (!val) return [];
  try {
    return Array.from(val);
  } catch {
    return [];
  }
};

/**
 * Remove duplicatas de um array.
 * @param {Array} arr
 * @returns {Array}
 */
export const unique = arr => isArray(arr) ? Array.from(new Set(arr)) : [];

/**
 * Converte string para camelCase.
 * @param {string} str
 * @returns {string}
 */
export const camelCase = str =>
  typeof str === 'string' ? str.replace(/-([a-z])/g, (_, g) => g.toUpperCase()) : '';

/**
 * Converte string para kebab-case.
 * @param {string} str
 * @returns {string}
 */
export const kebabCase = str =>
  typeof str === 'string' ? str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : '';

/**
 * Escapa caracteres HTML (ampliado).
 * @param {string} str
 * @returns {string}
 */
export const escapeHTML = str => {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"`]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  })[c]);
};

/**
 * Desescapa caracteres HTML (ampliado).
 * @param {string} str
 * @returns {string}
 */
export const unescapeHTML = str => {
  if (typeof str !== 'string') return '';
  return str.replace(/&(amp|lt|gt|quot|#39|#96);/g, (m) => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  })[m] || m);
};

/**
 * Debounce para funções.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (fn, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
};

/**
 * Throttle para funções.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
export const throttle = (fn, wait) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
};

/**
 * Verifica se é um elemento DOM.
 * @param {any} obj
 * @returns {boolean}
 */
export const isElement = obj => obj && obj.nodeType === 1;

/**
 * Cross-browser matchesSelector.
 * @param {Element} el
 * @param {string} selector
 * @returns {boolean}
 */
export const matches = (el, selector) => {
  if (!el || !selector) return false;
  const fn = el.matches || el.msMatchesSelector || el.webkitMatchesSelector;
  return fn ? fn.call(el, selector) : false;
};

/**
 * Polyfill para closest.
 * @param {Element} el
 * @param {string} selector
 * @returns {Element|null}
 */
export const closestPolyfill = (el, selector) => {
  while (el && el.nodeType === 1) {
    if (matches(el, selector)) return el;
    el = el.parentNode;
  }
  return null;
};

/**
 * Função vazia.
 */
export const noop = () => {};

/**
 * Gera um identificador único.
 * @returns {string}
 */
export const guid = () => 'ngc-' + Math.random().toString(36).substr(2, 9);

/**
 * Faz merge de objetos (shallow).
 * @param {Object} target
 * @param {...Object} sources
 * @returns {Object}
 */
export const extend = (target, ...sources) => {
  if (!isObject(target)) target = {};
  sources.forEach(src => {
    if (!isObject(src)) return;
    for (const k in src) {
      if (Object.prototype.hasOwnProperty.call(src, k)) {
        target[k] = src[k];
      }
    }
  });
  return target;
};

/**
 * Verifica se é string.
 * @param {any} val
 * @returns {boolean}
 */
export const isString = val => typeof val === 'string';

/**
 * Verifica se é número.
 * @param {any} val
 * @returns {boolean}
 */
export const isNumber = val => typeof val === 'number' && !isNaN(val);

// Adiciona utilitários AJAX esperados em utils para facilitar os testes e uso global
import * as ajaxUtils from './ajax';

export const param = ajaxUtils.param;
export const serialize = ajaxUtils.serialize;
export const isXHR = ajaxUtils.isXHR;