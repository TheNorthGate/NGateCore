// AJAX
/**
 * Função AJAX principal (GET, POST, etc).
 * @param {Object} options
 *   - url: string
 *   - method: string (GET, POST, ...)
 *   - data: object|string|FormData
 *   - headers: object
 *   - responseType: string
 *   - timeout: number
 *   - success: function
 *   - error: function
 *   - async: boolean
 */
function _baseAjax(options) {
  const xhr = new XMLHttpRequest();
  const method = (options.method || 'GET').toUpperCase();
  let url = options.url;
  let data = options.data || null;
  let async = options.async !== false;
  if (data && typeof data === 'object' && !(data instanceof FormData)) {
    data = param(data);
  }
  if (method === 'GET' && data) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + data;
    data = null;
  }
  xhr.open(method, url, async);
  if (options.headers) {
    for (const k in options.headers) {
      xhr.setRequestHeader(k, options.headers[k]);
    }
  }
  if (options.responseType) xhr.responseType = options.responseType;
  xhr.timeout = options.timeout || 0;
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      if (options.success) options.success(xhr.response || xhr.responseText, xhr);
    } else if (options.error) {
      options.error(xhr);
    }
  };
  xhr.onerror = function() { if (options.error) options.error(xhr); };
  xhr.ontimeout = function() { if (options.error) options.error(xhr); };
  if (!(data instanceof FormData) && method !== 'GET' && typeof data === 'string') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(data);
  return xhr;
}

/**
 * Atalho para GET.
 * @param {string} url
 * @param {Function} success
 * @param {Object} [options]
 */
export function get(url, success, options = {}) {
  return ajax({ ...options, url, method: 'GET', success });
}

/**
 * Atalho para POST.
 * @param {string} url
 * @param {Object|string|FormData} data
 * @param {Function} success
 * @param {Object} [options]
 */
export function post(url, data, success, options = {}) {
  return ajax({ ...options, url, method: 'POST', data, success });
}

/**
 * Atalho para GET que retorna JSON.
 * @param {string} url
 * @param {Function} success
 * @param {Object} [options]
 */
export function getJSON(url, success, options = {}) {
  return ajax({
    ...options,
    url,
    method: 'GET',
    success: (resp, xhr) => {
      let json;
      try { json = typeof resp === 'string' ? JSON.parse(resp) : resp; }
      catch (e) { json = null; }
      success && success(json, xhr);
    }
  });
}

/**
 * Serializa um objeto para query string.
 * @param {Object} obj
 * @returns {string}
 */
export function param(obj) {
  if (!obj) return '';
  return Object.keys(obj).map(k =>
    encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  ).join('&');
}

/**
 * Serializa um formulário para query string.
 * @param {HTMLFormElement} form
 * @returns {string}
 */
export function serialize(form) {
  const arr = [];
  Array.from(form.elements).forEach(el => {
    if (!el.name || el.disabled) return;
    if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
    arr.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value));
  });
  return arr.join('&');
}

/**
 * Carrega e executa um script remoto.
 * @param {string} url
 * @param {Function} [success]
 */
export function getScript(url, success) {
  const s = document.createElement('script');
  s.src = url;
  s.onload = () => { if (success) success(); };
  document.head.appendChild(s);
}

/**
 * Aborta uma requisição AJAX em andamento.
 * @param {XMLHttpRequest} request
 */
export function abort(request) {
  if (request && typeof request.abort === 'function') request.abort();
}

/**
 * Define um token CSRF para ser enviado em todas as requisições.
 * @param {string} token
 */
let _csrfToken = null;
export function setCSRF(token) {
  _csrfToken = token;
}

/**
 * Define opções globais para todas as requisições AJAX.
 * @param {Object} options
 */
let _ajaxDefaults = {};
export function ajaxSetup(options) {
  _ajaxDefaults = { ..._ajaxDefaults, ...options };
}

/**
 * Permite interceptar/modificar opções antes de cada requisição AJAX.
 * @param {Function} fn
 */
let _ajaxPrefilter = null;
export function ajaxPrefilter(fn) {
  _ajaxPrefilter = fn;
}

// Modifica ajax para aplicar ajaxSetup e ajaxPrefilter
export function ajax(options) {
  options = { ..._ajaxDefaults, ...options };
  if (_ajaxPrefilter) {
    const result = _ajaxPrefilter(options);
    if (result === false) return null;
    if (result && typeof result === 'object') options = result;
  }
  if (_csrfToken) {
    options.headers = options.headers || {};
    options.headers['X-CSRF-Token'] = _csrfToken;
  }
  return _baseAjax(options);
}

/**
 * Remove o token CSRF global.
 */
export const clearCSRF = () => { _csrfToken = null; };

/**
 * Verifica se um objeto é uma instância de XMLHttpRequest.
 * @param {any} obj
 * @returns {boolean}
 */
export const isXHR = obj => obj && typeof obj === 'object' && (obj instanceof XMLHttpRequest);

/**
 * Atalho para PUT.
 * @param {string} url
 * @param {Object|string|FormData} data
 * @param {Function} success
 * @param {Object} [options]
 */
export const put = (url, data, success, options = {}) =>
  ajax({ ...options, url, method: 'PUT', data, success });

/**
 * Atalho para DELETE.
 * @param {string} url
 * @param {Object|string|FormData} data
 * @param {Function} success
 * @param {Object} [options]
 */
export const deleteReq = (url, data, success, options = {}) =>
  ajax({ ...options, url, method: 'DELETE', data, success });

/**
 * Suporte a requisições JSONP.
 * @param {string} url
 * @param {string} callbackName
 * @param {Function} success
 * @param {Function} [error]
 */
export function jsonp(url, callbackName, success, error) {
  const cb = 'jsonp_cb_' + Math.random().toString(36).substr(2, 8);
  window[cb] = function(data) {
    success && success(data);
    delete window[cb];
    script.parentNode && script.parentNode.removeChild(script);
  };
  const script = document.createElement('script');
  script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + callbackName + '=' + cb;
  script.onerror = function() {
    error && error();
    delete window[cb];
    script.parentNode && script.parentNode.removeChild(script);
  };
  document.head.appendChild(script);
}

/**
 * Upload de arquivos via AJAX.
 * @param {string} url
 * @param {File|Blob} file
 * @param {Function} success
 * @param {Object} [options]
 */
export function upload(url, file, success, options = {}) {
  const formData = new FormData();
  formData.append('file', file);
  return ajax({ ...options, url, method: 'POST', data: formData, success });
}

/**
 * Download de arquivos via AJAX.
 * @param {string} url
 * @param {Function} success
 * @param {Object} [options]
 */
export function download(url, success, options = {}) {
  return ajax({
    ...options,
    url,
    method: 'GET',
    responseType: 'blob',
    success: (blob, xhr) => {
      if (success) success(blob, xhr);
    }
  });
}
