// Biblioteca utilitária principal
// src/index.js

import { select, find, addClass, removeClass, css, attr, remove, append, prepend, html, text, hasClass, toggleClass, parent, children, closest, empty, replace, wrap, unwrap, clone, next, prev, index, is, fragment, setStyleImportant, replaceWith, insertAfter, insertBefore, outerHtml, scrollTo, getRect, cssVar, focus, blur, toggleAttr, parents, siblings, detach as detachFn, replaceAll, scrollTop, scrollLeft, offset, data, removeAttr } from './dom';
import { on, off, delegate, once, one, trigger, ready, stop, prevent, stopPropagation, stopImmediatePropagation, onKey, getEventTarget, getEventRelatedTarget, fire, hover, blurOnEscape, eventPath, onDebounce, onThrottle, onceDelegate } from './events';
import { animate, fxQueue, fadeIn, fadeOut, fadeToggle, slideDown, slideUp, slideToggle, show, hide, toggle, stop as stopAnimation, isAnimated, setTransition, removeTransition, animateScroll, pulse, shake } from './animation';
import * as utils from './utils';
import { ajax, get, post, getJSON } from './ajax';

/**
 * Função principal de entrada para seleção e manipulação de elementos DOM.
 * @param {string|Element|NodeList|Array<Element>} selector
 * @returns {Object} API encadeável
 */
function NGCore(selector) {
  const elements = select(selector);
  // API encadeável
  const api = {
    elements,
    each(fn) { elements.forEach((el, i) => fn.call(el, el, i)); return api; },
    find(sel) { return NGCore(find(elements, sel)); },
    addClass(cls) { addClass(elements, cls); return api; },
    removeClass(cls) { removeClass(elements, cls); return api; },
    toggleClass(cls) { elements.forEach(el => el.classList && el.classList.toggle(cls)); return api; },
    hasClass(cls) { return elements.some(el => el.classList && el.classList.contains(cls)); },
    css(prop, val) {
      if (typeof prop === 'string' && typeof val === 'undefined') return css(elements, prop);
      css(elements, prop); return api;
    },
    attr(name, val) {
      if (typeof val === 'undefined') return attr(elements, name);
      attr(elements, name, val); return api;
    },
    append(...children) { append(elements, ...children); return api; },
    prepend(...children) { prepend(elements, ...children); return api; },
    /**
     * Adiciona os elementos atuais ao(s) destino(s) informado(s).
     * @param {Element|Array<Element>|string} target
     * @returns {Object} Instância encadeável NGCore
     */
    appendTo(target) {
      const dests = typeof target === 'string' ? select(target) : (Array.isArray(target) ? target : [target]);
      for (let i = 0, l = dests.length; i < l; i++) {
        for (let j = 0, m = elements.length; j < m; j++) {
          dests[i].appendChild(j === 0 ? elements[j] : elements[j].cloneNode(true));
        }
      }
      return api;
    },
    /**
     * Remove os elementos atuais do DOM e retorna a instância para encadeamento.
     * @returns {Object} Instância encadeável NGCore
     */
    remove() { remove(elements); return api; },
    /**
     * Destaca (detach) os elementos do DOM preservando dados/eventos, retorna a instância para encadeamento.
     * @returns {Object} Instância encadeável NGCore
     */
    detach() { detachFn(elements); return api; },
    html(htmlString) {
      if (typeof htmlString === 'undefined') return html(elements);
      html(elements, htmlString); return api;
    },
    text(textString) {
      if (typeof textString === 'undefined') return text(elements);
      text(elements, textString); return api; },
    on(evt, handler, options) { on(elements, evt, handler, options); return api; },
    off(evt, handler, options) { off(elements, evt, handler, options); return api; },
    once(evt, handler, options) { once(elements, evt, handler, options); return api; },
    delegate(sel, evt, handler, options) { delegate(elements, sel, evt, handler, options); return api; },
    animate(props, duration, cb, easing) { animate(elements, props, duration, cb, easing); return api; },
    fadeIn(duration, cb) { fadeIn(elements, duration, cb); return api; },
    fadeOut(duration, cb) { fadeOut(elements, duration, cb); return api; },
    fadeToggle(duration, cb) { fadeToggle(elements, duration, cb); return api; },
    slideDown(duration, cb) { slideDown(elements, duration, cb); return api; },
    slideUp(duration, cb) { slideUp(elements, duration, cb); return api; },
    slideToggle(duration, cb) { slideToggle(elements, duration, cb); return api; },
    show(duration, cb) { show(elements, duration, cb); return api; },
    hide(duration, cb) { hide(elements, duration, cb); return api; },
    toggle(duration, cb) { toggle(elements, duration, cb); return api; },
    parent() { return NGCore(parent(elements)); },
    children() { return NGCore(children(elements)); },
    closest(sel) { return NGCore(closest(elements[0], sel)); },
    empty() { empty(elements); return api; },
    replace(...newChildren) { replace(elements, ...newChildren); return api; },
    wrap(wrapper) { wrap(elements, wrapper); return api; },
    unwrap() { unwrap(elements); return api; },
    /**
     * Clona o(s) elemento(s) e retorna uma nova instância encadeável.
     * @param {boolean} [deep=true]
     * @returns {Object} Instância encadeável NGCore
     */
    clone(deep) {
      return NGCore(clone(elements, deep));
    },
    next() { return NGCore(next(elements[0])); },
    prev() { return NGCore(prev(elements[0])); },
    // Eventos
    trigger(evt, detail) { trigger(elements, evt, detail); return api; },
    ready(fn) { ready(fn); return api; },
    onKey(key, handler, options) { onKey(elements, key, handler, options); return api; },
    // Animação extra
    stop(clearQueue, jumpToEnd) { stop(elements, clearQueue, jumpToEnd); return api; },
    pulse(duration, cb) { pulse(elements, duration, cb); return api; },
    shake(duration, cb) { shake(elements, duration, cb); return api; },
    // Utilitários
    toArray() { return elements.slice(); },
    get(i) { return typeof i === 'undefined' ? elements[0] : elements[i]; }
  };
  return api;
}

// Atribui métodos utilitários estáticos à função NGCore
Object.assign(NGCore, {
  select, find, addClass, removeClass, css, attr, remove, append, prepend, html, text, hasClass, toggleClass, parent, children, closest, empty, replace, wrap, unwrap, clone, next, prev, index, is, fragment, setStyleImportant, replaceWith, insertAfter, insertBefore, outerHtml, scrollTo, getRect, cssVar, focus, blur, toggleAttr, parents, siblings, detach: detachFn, replaceAll, scrollTop, scrollLeft, offset, data, removeAttr,
  on, off, delegate, once, one, trigger, ready, stop, prevent, stopPropagation, stopImmediatePropagation, onKey, getEventTarget, getEventRelatedTarget, fire, hover, blurOnEscape, eventPath, onDebounce, onThrottle, onceDelegate,
  animate, fxQueue, fadeIn, fadeOut, fadeToggle, slideDown, slideUp, slideToggle, show, hide, toggle, stopAnimation, isAnimated, setTransition, removeTransition, animateScroll, pulse, shake,
  ajax, get, post, getJSON,
  utils
});

// Adiciona atalho para one (once) na API principal
NGCore.one = one;

// Instancia global
if (typeof window !== 'undefined') {
  window.$NG = NGCore;
  window.$NG.utils = utils;
}

// Remover exportações duplicadas e garantir que cada símbolo seja exportado apenas uma vez.
export {
  NGCore as lib,
  select, find, addClass, removeClass, css, attr,
  on, off, delegate, once, one, trigger, ready, stop, prevent, stopPropagation, stopImmediatePropagation, onKey, getEventTarget, getEventRelatedTarget, fire, hover, blurOnEscape, eventPath, onDebounce, onThrottle, onceDelegate,
  animate, fxQueue, fadeIn, fadeOut, fadeToggle, slideDown, slideUp, slideToggle, show, hide, toggle, stopAnimation, isAnimated, setTransition, removeTransition, animateScroll, pulse, shake,
  ajax, get, post, getJSON,
  utils
};
export default NGCore;
// Compatibilidade CommonJS para testes (Jest)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = NGCore;
}
