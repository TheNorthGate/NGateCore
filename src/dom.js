// Manipulação de DOM
/**
 * Seleciona elementos DOM por seletor CSS ou retorna o próprio elemento.
 * @param {string|Element|NodeList|Array<Element>} selector
 * @returns {Array<Element>}
 */
export function select(selector) {
  if (!selector) return [];
  if (typeof selector === 'string') {
    // Otimização: seletores simples
    if (selector[0] === '#') {
      const el = document.getElementById(selector.slice(1));
      return el ? [el] : [];
    }
    if (selector[0] === '.') {
      // Classe
      const col = document.getElementsByClassName(selector.slice(1));
      // Só converte para array se necessário
      return col.length === 0 ? [] : Array.prototype.slice.call(col);
    }
    if (/^[a-z]+$/i.test(selector)) {
      // Tag
      const col = document.getElementsByTagName(selector);
      return col.length === 0 ? [] : Array.prototype.slice.call(col);
    }
    // Seletor complexo
    const nodeList = document.querySelectorAll(selector);
    return nodeList.length === 0 ? [] : Array.prototype.slice.call(nodeList);
  }
  if (selector instanceof Element) {
    return [selector];
  }
  if (selector instanceof NodeList || selector instanceof HTMLCollection) {
    return selector.length === 0 ? [] : Array.prototype.slice.call(selector);
  }
  if (Array.isArray(selector)) {
    return selector;
  }
  return [];
}

/**
 * Busca descendentes de um elemento usando seletor CSS.
 * @param {Element|Array<Element>} el
 * @param {string} selector
 * @returns {Array<Element>}
 */
export function find(el, selector) {
  const base = Array.isArray(el) ? el : [el];
  return base.reduce((acc, node) => {
    acc.push(...node.querySelectorAll(selector));
    return acc;
  }, []);
}

/**
 * Adiciona uma classe a um ou mais elementos.
 * @param {Element|Array<Element>} el
 * @param {string} className
 */
export function addClass(el, className) {
  if (!el) return;
  if (Array.isArray(el)) {
    for (let i = 0, l = el.length; i < l; i++) {
      const e = el[i];
      if (e && e.classList) e.classList.add(className);
    }
  } else if (el.classList) {
    el.classList.add(className);
  }
}

/**
 * Remove uma classe de um ou mais elementos.
 * @param {Element|Array<Element>} el
 * @param {string} className
 */
export function removeClass(el, className) {
  if (!el) return;
  if (Array.isArray(el)) {
    for (let i = 0, l = el.length; i < l; i++) {
      const e = el[i];
      if (e && e.classList) e.classList.remove(className);
    }
  } else if (el.classList) {
    el.classList.remove(className);
  }
}

/**
 * Define ou obtém estilos CSS.
 * @param {Element|Array<Element>} el
 * @param {Object|string} styles
 * @returns {Object|undefined}
 */
export function css(el, styles) {
  if (!el) return;
  const elems = Array.isArray(el) ? el : [el];
  if (typeof styles === 'string') {
    // Retorna o valor do primeiro elemento
    return elems[0] ? getComputedStyle(elems[0])[styles] : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    for (const prop in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, prop)) {
        e.style[prop] = styles[prop];
      }
    }
  }
}

/**
 * Define ou obtém atributos.
 * @param {Element|Array<Element>} el
 * @param {string} name
 * @param {string} [value]
 * @returns {string|undefined}
 */
export function attr(el, name, value) {
  if (!el) return;
  const elems = Array.isArray(el) ? el : [el];
  if (typeof value === 'undefined') {
    return elems[0] ? elems[0].getAttribute(name) : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].setAttribute(name, value);
  }
}

/**
 * Remove elementos do DOM.
 * @param {Element|Array<Element>} el
 */
export function remove(el) {
  if (!el) return;
  if (Array.isArray(el)) {
    for (let i = 0, l = el.length; i < l; i++) {
      const e = el[i];
      if (e && e.parentNode) e.parentNode.removeChild(e);
    }
  } else if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * Adiciona um ou mais elementos filhos ao final do elemento pai.
 * @param {Element|Array<Element>} parent
 * @param {...Element|Array<Element>} children
 */
export function append(parent, ...children) {
  const parents = Array.isArray(parent) ? parent : [parent];
  // Achata arrays aninhados de filhos
  const flatChildren = children.flat(Infinity);
  parents.forEach(p => flatChildren.forEach(c => p.appendChild(c)));
}

/**
 * Adiciona um ou mais elementos filhos ao início do elemento pai.
 * @param {Element|Array<Element>} parent
 * @param {...Element|Array<Element>} children
 */
export function prepend(parent, ...children) {
  const parents = Array.isArray(parent) ? parent : [parent];
  const flatChildren = children.flat(Infinity);
  parents.forEach(p => flatChildren.forEach(c => p.insertBefore(c, p.firstChild)));
}

/**
 * Define ou obtém o conteúdo HTML interno.
 * @param {Element|Array<Element>} el
 * @param {string} [htmlString]
 * @returns {string|undefined}
 */
export function html(el, htmlString) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof htmlString === 'undefined') {
    return elems[0] ? elems[0].innerHTML : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].innerHTML = htmlString;
  }
}

/**
 * Define ou obtém o texto interno.
 * @param {Element|Array<Element>} el
 * @param {string} [textString]
 * @returns {string|undefined}
 */
export function text(el, textString) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof textString === 'undefined') {
    return elems[0] ? elems[0].textContent : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].textContent = textString;
  }
}

/**
 * Verifica se o elemento possui uma classe.
 * @param {Element} el
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : false;
}

/**
 * Alterna a presença de uma classe.
 * @param {Element|Array<Element>} el
 * @param {string} className
 */
export function toggleClass(el, className) {
  if (!el) return;
  if (Array.isArray(el)) {
    for (let i = 0, l = el.length; i < l; i++) {
      const e = el[i];
      if (e && e.classList) e.classList.toggle(className);
    }
  } else if (el.classList) {
    el.classList.toggle(className);
  }
}

/**
 * Retorna o elemento pai.
 * @param {Element} el
 * @returns {Element|null}
 */
export function parent(el) {
  return el.parentNode || null;
}

/**
 * Retorna os filhos diretos.
 * @param {Element} el
 * @returns {Array<Element>}
 */
export function children(el) {
  return el.children ? Array.from(el.children) : [];
}

/**
 * Retorna o ancestral mais próximo que corresponde ao seletor.
 * @param {Element} el
 * @param {string} selector
 * @returns {Element|null}
 */
export function closest(el, selector) {
  if (el.closest) return el.closest(selector);
  let node = el;
  while (node && node.nodeType === 1) {
    if (node.matches && node.matches(selector)) return node;
    node = node.parentNode;
  }
  return null;
}

/**
 * Remove todos os filhos do elemento.
 * @param {Element|Array<Element>} el
 */
export function empty(el) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    let e = elems[i];
    while (e && e.firstChild) e.removeChild(e.firstChild);
  }
}

/**
 * Substitui todos os filhos do elemento pai por novos elementos.
 * @param {Element|Array<Element>} parent
 * @param {...Element|Array<Element>} newChildren
 */
export function replace(parent, ...newChildren) {
  const parents = Array.isArray(parent) ? parent : [parent];
  const flatChildren = newChildren.flat(Infinity);
  for (let i = 0, l = parents.length; i < l; i++) {
    let p = parents[i];
    while (p.firstChild) p.removeChild(p.firstChild);
    for (let j = 0, m = flatChildren.length; j < m; j++) {
      p.appendChild(flatChildren[j]);
    }
  }
}

/**
 * Envolve o(s) elemento(s) em um novo elemento wrapper.
 * @param {Element|Array<Element>} el
 * @param {Element} wrapper
 */
export function wrap(el, wrapper) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    const clone = wrapper.cloneNode(true);
    if (e.parentNode) e.parentNode.insertBefore(clone, e);
    clone.appendChild(e);
  }
}

/**
 * Remove o elemento pai, mantendo os filhos no DOM.
 * @param {Element|Array<Element>} el
 */
export function unwrap(el) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    const parent = e.parentNode;
    if (!parent) continue;
    while (e.firstChild) parent.insertBefore(e.firstChild, e);
    parent.removeChild(e);
  }
}

/**
 * Clona o(s) elemento(s).
 * @param {Element|Array<Element>} el
 * @param {boolean} [deep=true]
 * @returns {Array<Element>}
 */
export function clone(el, deep = true) {
  const elems = Array.isArray(el) ? el : [el];
  const out = new Array(elems.length);
  for (let i = 0, l = elems.length; i < l; i++) {
    out[i] = elems[i].cloneNode(deep);
  }
  return out;
}

/**
 * Retorna o índice do elemento entre seus irmãos.
 * @param {Element} el
 * @returns {number}
 */
export function index(el) {
  return el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : -1;
}

/**
 * Retorna o próximo irmão elemento.
 * @param {Element} el
 * @returns {Element|null}
 */
export function next(el) {
  let n = el.nextSibling;
  while (n && n.nodeType !== 1) n = n.nextSibling;
  return n || null;
}

/**
 * Retorna o irmão elemento anterior.
 * @param {Element} el
 * @returns {Element|null}
 */
export function prev(el) {
  let n = el.previousSibling;
  while (n && n.nodeType !== 1) n = n.previousSibling;
  return n || null;
}

/**
 * Verifica se o elemento corresponde ao seletor.
 * @param {Element} el
 * @param {string} selector
 * @returns {boolean}
 */
export function is(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  return el.matches ? el.matches(selector) : false;
}

/**
 * Cria um DocumentFragment a partir de uma string HTML.
 * @param {string} htmlString
 * @returns {DocumentFragment}
 */
export function fragment(htmlString) {
  const tpl = document.createElement('template');
  tpl.innerHTML = htmlString.trim();
  return tpl.content;
}

/**
 * Define uma propriedade CSS com !important.
 * @param {Element|Array<Element>} el
 * @param {string} prop
 * @param {string} value
 */
export function setStyleImportant(el, prop, value) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].style.setProperty(prop, value, 'important');
  }
}

/**
 * Substitui o(s) elemento(s) alvo por outros elementos ou nós.
 * @param {Element|Array<Element>} target
 * @param {...Element|Array<Element>} nodes
 */
export function replaceWith(target, ...nodes) {
  const targets = Array.isArray(target) ? target : [target];
  const flatNodes = nodes.flat(Infinity);
  for (let i = 0, l = targets.length; i < l; i++) {
    const t = targets[i];
    for (let j = 0, m = flatNodes.length; j < m; j++) {
      if (t.parentNode) t.parentNode.insertBefore(flatNodes[j], t);
    }
    if (t.parentNode) t.parentNode.removeChild(t);
  }
}

/**
 * Insere elementos após o elemento de referência.
 * @param {Element} ref
 * @param {...Element|Array<Element>} nodes
 */
export function insertAfter(ref, ...nodes) {
  const flatNodes = nodes.flat(Infinity);
  let parent = ref.parentNode;
  if (!parent) return;
  for (let i = 0, l = flatNodes.length; i < l; i++) {
    parent.insertBefore(flatNodes[i], ref.nextSibling);
  }
}

/**
 * Insere elementos antes do elemento de referência.
 * @param {Element} ref
 * @param {...Element|Array<Element>} nodes
 */
export function insertBefore(ref, ...nodes) {
  const flatNodes = nodes.flat(Infinity);
  let parent = ref.parentNode;
  if (!parent) return;
  for (let i = 0, l = flatNodes.length; i < l; i++) {
    parent.insertBefore(flatNodes[i], ref);
  }
}

/**
 * Obtém ou define o outerHTML do elemento.
 * @param {Element|Array<Element>} el
 * @param {string} [htmlString]
 * @returns {string|undefined}
 */
export function outerHtml(el, htmlString) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof htmlString === 'undefined') {
    return elems[0] ? elems[0].outerHTML : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    const frag = fragment(htmlString);
    if (e.parentNode) e.parentNode.replaceChild(frag, e);
  }
}

/**
 * Faz scroll suave até o elemento.
 * @param {Element|Array<Element>} el
 * @param {ScrollIntoViewOptions} [options]
 */
export function scrollTo(el, options) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    if (e.scrollIntoView) e.scrollIntoView(options || { behavior: 'smooth' });
  }
}

/**
 * Retorna o boundingClientRect do elemento.
 * @param {Element} el
 * @returns {DOMRect|null}
 */
export function getRect(el) {
  return el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
}

/**
 * Lê ou define variáveis CSS customizadas.
 * @param {Element|Array<Element>} el
 * @param {string} name
 * @param {string} [value]
 * @returns {string|undefined}
 */
export function cssVar(el, name, value) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof value === 'undefined') {
    return elems[0] ? getComputedStyle(elems[0]).getPropertyValue(name) : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].style.setProperty(name, value);
  }
}

/**
 * Dá foco ao(s) elemento(s).
 * @param {Element|Array<Element>} el
 */
export function focus(el) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    if (elems[i].focus) elems[i].focus();
  }
}

/**
 * Remove o foco do(s) elemento(s).
 * @param {Element|Array<Element>} el
 */
export function blur(el) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    if (elems[i].blur) elems[i].blur();
  }
}

/**
 * Alterna um atributo booleano.
 * @param {Element|Array<Element>} el
 * @param {string} name
 * @param {boolean} [force]
 */
export function toggleAttr(el, name, force) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    if (typeof force === 'undefined') {
      e.toggleAttribute ? e.toggleAttribute(name) : e.hasAttribute(name) ? e.removeAttribute(name) : e.setAttribute(name, '');
    } else {
      force ? e.setAttribute(name, '') : e.removeAttribute(name);
    }
  }
}

/**
 * Retorna todos os ancestrais do elemento, opcionalmente filtrando por seletor.
 * @param {Element} el
 * @param {string} [selector]
 * @returns {Array<Element>}
 */
export const parents = (el, selector) => {
  if (!el || el.nodeType !== 1) return [];
  const result = [];
  let node = el.parentNode;
  while (node && node.nodeType === 1) {
    if (!selector || (node.matches && node.matches(selector))) {
      result.push(node);
    }
    node = node.parentNode;
  }
  return result;
}

/**
 * Retorna todos os irmãos do elemento.
 * @param {Element} el
 * @returns {Array<Element>}
 */
export function siblings(el) {
  if (!el.parentNode) return [];
  return Array.from(el.parentNode.children).filter(e => e !== el);
}

/**
 * Remove o(s) elemento(s) do DOM, mas mantém referência (detach).
 * @param {Element|Array<Element>} el
 */
export function detach(el) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    if (e.parentNode) e.parentNode.removeChild(e);
  }
}

/**
 * Substitui múltiplos elementos por outros.
 * @param {Element|Array<Element>} targets
 * @param {...Element|Array<Element>} nodes
 */
export function replaceAll(targets, ...nodes) {
  const tgts = Array.isArray(targets) ? targets : [targets];
  const flatNodes = nodes.flat(Infinity);
  for (let i = 0, l = tgts.length; i < l; i++) {
    const t = tgts[i];
    for (let j = 0, m = flatNodes.length; j < m; j++) {
      if (t.parentNode) t.parentNode.insertBefore(flatNodes[j], t);
    }
    if (t.parentNode) t.parentNode.removeChild(t);
  }
}

/**
 * Obtém ou define o scrollTop do elemento.
 * @param {Element|Array<Element>} el
 * @param {number} [value]
 * @returns {number|undefined}
 */
export function scrollTop(el, value) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof value === 'undefined') {
    return elems[0] ? elems[0].scrollTop : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].scrollTop = value;
  }
}

/**
 * Obtém ou define o scrollLeft do elemento.
 * @param {Element|Array<Element>} el
 * @param {number} [value]
 * @returns {number|undefined}
 */
export function scrollLeft(el, value) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof value === 'undefined') {
    return elems[0] ? elems[0].scrollLeft : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].scrollLeft = value;
  }
}

/**
 * Retorna as coordenadas absolutas do elemento na página.
 * @param {Element} el
 * @returns {{top: number, left: number}}
 */
export function offset(el) {
  if (!el) return { top: 0, left: 0 };
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

/**
 * Lê ou define atributos data-* de forma simplificada.
 * @param {Element|Array<Element>} el
 * @param {string} key
 * @param {string} [value]
 * @returns {string|undefined}
 */
export function data(el, key, value) {
  const elems = Array.isArray(el) ? el : [el];
  if (typeof value === 'undefined') {
    return elems[0] ? elems[0].dataset ? elems[0].dataset[key] : elems[0].getAttribute('data-' + key) : undefined;
  }
  for (let i = 0, l = elems.length; i < l; i++) {
    const e = elems[i];
    if (e.dataset) e.dataset[key] = value;
    else e.setAttribute('data-' + key, value);
  }
}

/**
 * Remove um atributo específico.
 * @param {Element|Array<Element>} el
 * @param {string} name
 */
export function removeAttr(el, name) {
  const elems = Array.isArray(el) ? el : [el];
  for (let i = 0, l = elems.length; i < l; i++) {
    elems[i].removeAttribute(name);
  }
}
