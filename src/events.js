// Manipulação de eventos
/**
 * Adiciona ouvinte(s) de evento.
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function on(el, event, handler, options) {
  const elems = Array.isArray(el) ? el : [el];
  event.split(/\s+/).forEach(evt => {
    elems.forEach(e => e.addEventListener(evt, handler, options));
  });
}

/**
 * Remove ouvinte(s) de evento.
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function off(el, event, handler, options) {
  const elems = Array.isArray(el) ? el : [el];
  event.split(/\s+/).forEach(evt => {
    elems.forEach(e => e.removeEventListener(evt, handler, options));
  });
}

/**
 * Delegação de eventos.
 * @param {Element|Array<Element>} el
 * @param {string} selector
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function delegate(el, selector, event, handler, options) {
  const elems = Array.isArray(el) ? el : [el];
  function delegated(e) {
    let target = e.target;
    while (target && target !== e.currentTarget) {
      if (target.matches && target.matches(selector)) {
        handler.call(target, e);
        break;
      }
      target = target.parentNode;
    }
  }
  on(elems, event, delegated, options);
  // Retorna a função para possível remoção
  return delegated;
}

/**
 * Adiciona ouvinte de evento que dispara apenas uma vez.
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function once(el, event, handler, options) {
  const elems = Array.isArray(el) ? el : [el];
  event.split(/\s+/).forEach(evt => {
    elems.forEach(e => {
      const fn = function(ev) {
        handler.call(this, ev);
        e.removeEventListener(evt, fn, options);
      };
      e.addEventListener(evt, fn, options);
    });
  });
}

/**
 * Dispara um evento nativo ou customizado.
 * @param {Element|Array<Element>} el
 * @param {string} eventType
 * @param {Object} [detail]
 */
export function trigger(el, eventType, detail) {
  const elems = Array.isArray(el) ? el : [el];
  const evt = (typeof CustomEvent === 'function')
    ? new CustomEvent(eventType, { bubbles: true, cancelable: true, detail })
    : document.createEvent('CustomEvent');
  if (evt.initCustomEvent) evt.initCustomEvent(eventType, true, true, detail);
  elems.forEach(e => e.dispatchEvent(evt));
}

/**
 * Executa função quando o DOM estiver pronto.
 * @param {Function} fn
 */
export function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

/**
 * Chama preventDefault e stopPropagation.
 * @param {Event} event
 */
export function stop(event) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Chama preventDefault.
 * @param {Event} event
 */
export function prevent(event) {
  event.preventDefault();
}

/**
 * Chama stopPropagation.
 * @param {Event} event
 */
export function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Chama stopImmediatePropagation.
 * @param {Event} event
 */
export function stopImmediatePropagation(event) {
  event.stopImmediatePropagation();
}

/**
 * Atalho para eventos de teclado por tecla.
 * @param {Element|Array<Element>} el
 * @param {string} key
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function onKey(el, key, handler, options) {
  on(el, 'keydown', function(e) {
    if (e.key === key) handler.call(this, e);
  }, options);
}

/**
 * Retorna o alvo do evento (compatível cross-browser).
 * @param {Event} event
 * @returns {Element|null}
 */
export function getEventTarget(event) {
  return event.target || event.srcElement || null;
}

/**
 * Retorna o relatedTarget do evento (compatível cross-browser).
 * @param {Event} event
 * @returns {Element|null}
 */
export function getEventRelatedTarget(event) {
  if ('relatedTarget' in event) return event.relatedTarget;
  if (event.type === 'mouseover') return event.fromElement;
  if (event.type === 'mouseout') return event.toElement;
  return null;
}

/**
 * Dispara um evento nativo simples (atalho para trigger).
 * @param {Element|Array<Element>} el
 * @param {string} eventType
 * @param {Object} [props]
 */
export function fire(el, eventType, props) {
  const elems = Array.isArray(el) ? el : [el];
  const evt = document.createEvent('Event');
  evt.initEvent(eventType, true, true);
  if (props) Object.assign(evt, props);
  elems.forEach(e => e.dispatchEvent(evt));
}

/**
 * Atalhos para mouseenter/mouseleave.
 * @param {Element|Array<Element>} el
 * @param {Function} enterHandler
 * @param {Function} leaveHandler
 * @param {Object|boolean} [options]
 */
export function hover(el, enterHandler, leaveHandler, options) {
  on(el, 'mouseenter', enterHandler, options);
  on(el, 'mouseleave', leaveHandler, options);
}

/**
 * Remove o foco do elemento ao pressionar Esc.
 * @param {Element|Array<Element>} el
 */
export function blurOnEscape(el) {
  on(el, 'keydown', function(e) {
    if (e.key === 'Escape') this.blur();
  });
}

/**
 * Retorna o caminho de propagação do evento (event.composedPath fallback).
 * @param {Event} event
 * @returns {Array<Element>}
 */
export function eventPath(event) {
  if (event.composedPath) return event.composedPath();
  const path = [];
  let node = event.target;
  while (node) {
    path.push(node);
    node = node.parentNode;
  }
  return path;
}

/**
 * Adiciona ouvinte de evento com debounce.
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {number} wait
 * @param {Object|boolean} [options]
 */
export function onDebounce(el, event, handler, wait, options) {
  let timeout;
  on(el, event, function(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => handler.call(this, e), wait);
  }, options);
}

/**
 * Adiciona ouvinte de evento com throttle.
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {number} wait
 * @param {Object|boolean} [options]
 */
export function onThrottle(el, event, handler, wait, options) {
  let last = 0;
  on(el, event, function(e) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      handler.call(this, e);
    }
  }, options);
}

/**
 * Delegação de evento que dispara só uma vez.
 * @param {Element|Array<Element>} el
 * @param {string} selector
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export const onceDelegate = (el, selector, event, handler, options) => {
  if (!el || !selector || !event || typeof handler !== 'function') return;
  let fn = delegate(el, selector, event, function(e) {
    handler.call(this, e);
    off(el, event, fn, options);
  }, options);
  return fn;
};

/**
 * Adiciona ouvinte de evento que dispara apenas uma vez (atalho para once).
 * @param {Element|Array<Element>} el
 * @param {string} event
 * @param {Function} handler
 * @param {Object|boolean} [options]
 */
export function one(el, event, handler, options) {
  return once(el, event, handler, options);
}
