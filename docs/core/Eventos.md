# NGateCore – Documentação Detalhada

## Eventos (`src/events.js`)

### on(el, event, handler, options)
Adiciona ouvinte(s) de evento.
- **@param** `Element|Array<Element>` el
- **@param** `string` event
- **@param** `Function` handler
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// on
$NG('#btn').on('click', function(e) {
  alert('Botão clicado!');
});
```

### off(el, event, handler, options)
Remove ouvinte(s) de evento.
- **@param** `Element|Array<Element>` el
- **@param** `string` event
- **@param** `Function` handler
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// off
function handler(e) { alert('Nunca será chamado'); }
$NG('#btn').on('click', handler);
$NG('#btn').off('click', handler);
```

### delegate(el, selector, event, handler, options)
Delegação de eventos.
- **@param** `Element|Array<Element>` el
- **@param** `string` selector
- **@param** `string` event
- **@param** `Function` handler
- **@param** `Object|boolean` [options]
- **@returns** `Function` (função delegada para remoção)

**Exemplo:**
```js
// delegate
$NG('ul').delegate('li', 'click', function(e) {
  alert('Item clicado: ' + this.textContent);
});
```

### once(el, event, handler, options)
Adiciona ouvinte de evento que dispara apenas uma vez.
- **@param** `Element|Array<Element>` el
- **@param** `string` event
- **@param** `Function` handler
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// once
$NG('#btnOnce').once('click', function() {
  alert('Só uma vez!');
});
```

### trigger(el, eventType, detail)
Dispara um evento nativo ou customizado.
- **@param** `Element|Array<Element>` el
- **@param** `string` eventType
- **@param** `Object` [detail]

**Exemplo:**
```js
// trigger
$NG('#btn').trigger('click');
```

### ready(fn)
Executa função quando o DOM estiver pronto.
- **@param** `Function` fn

**Exemplo:**
```js
// ready
$NG.ready(function() {
  console.log('DOM pronto!');
});
```

### stop(event)
Chama preventDefault e stopPropagation.
- **@param** `Event` event

**Exemplo:**
```js
// stop
$NG('#link').on('click', function(e) {
  $NG.utils.stop(e); // previne navegação e propagação
});
```

### prevent(event)
Chama preventDefault.
- **@param** `Event` event

**Exemplo:**
```js
// prevent
$NG('#form').on('submit', function(e) {
  $NG.utils.prevent(e); // previne envio
});
```

### stopPropagation(event)
Chama stopPropagation.
- **@param** `Event` event

**Exemplo:**
```js
// stopPropagation
$NG('#child').on('click', function(e) {
  $NG.utils.stopPropagation(e);
});
```

### stopImmediatePropagation(event)
Chama stopImmediatePropagation.
- **@param** `Event` event

**Exemplo:**
```js
// stopImmediatePropagation
$NG('#btn').on('click', function(e) {
  $NG.utils.stopImmediatePropagation(e);
});
```

### onKey(el, key, handler, options)
Atalho para eventos de teclado por tecla.
- **@param** `Element|Array<Element>` el
- **@param** `string` key
- **@param** `Function` handler
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// onKey
$NG('#input').onKey('Enter', function(e) {
  alert('Enter pressionado!');
});
```

### getEventTarget(event)
Retorna o alvo do evento (compatível cross-browser).
- **@param** `Event` event
- **@returns** `Element|null`

**Exemplo:**
```js
// getEventTarget
$NG('#btn').on('click', function(e) {
  const target = $NG.utils.getEventTarget(e);
  console.log(target);
});
```

### getEventRelatedTarget(event)
Retorna o relatedTarget do evento (compatível cross-browser).
- **@param** `Event` event
- **@returns** `Element|null`

**Exemplo:**
```js
// getEventRelatedTarget
$NG('#btn').on('mouseover', function(e) {
  const rel = $NG.utils.getEventRelatedTarget(e);
  console.log(rel);
});
```

### fire(el, eventType, props)
Dispara um evento nativo simples (atalho para trigger).
- **@param** `Element|Array<Element>` el
- **@param** `string` eventType
- **@param** `Object` [props]

**Exemplo:**
```js
// fire
$NG.utils.fire('#btn', 'click');
```

### hover(el, enterHandler, leaveHandler, options)
Atalhos para mouseenter/mouseleave.
- **@param** `Element|Array<Element>` el
- **@param** `Function` enterHandler
- **@param** `Function` leaveHandler
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// hover
$NG('#area').hover(
  function() { this.style.background = 'yellow'; },
  function() { this.style.background = ''; }
);
```

### blurOnEscape(el)
Remove o foco do elemento ao pressionar Esc.
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
// blurOnEscape
$NG('#input').blurOnEscape();
```

### eventPath(event)
Retorna o caminho de propagação do evento (event.composedPath fallback).
- **@param** `Event` event
- **@returns** `Array<Element>`

**Exemplo:**
```js
// eventPath
$NG('#btn').on('click', function(e) {
  const path = $NG.utils.eventPath(e);
  console.log(path);
});
```

### onDebounce(el, event, handler, wait, options)
Adiciona ouvinte de evento com debounce.
- **@param** `Element|Array<Element>` el
- **@param** `string` event
- **@param** `Function` handler
- **@param** `number` wait
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// onDebounce
$NG('#input').onDebounce('input', function(e) {
  console.log('Digitou:', this.value);
}, 300);
```

### onThrottle(el, event, handler, wait, options)
Adiciona ouvinte de evento com throttle.
- **@param** `Element|Array<Element>` el
- **@param** `string` event
- **@param** `Function` handler
- **@param** `number` wait
- **@param** `Object|boolean` [options]

**Exemplo:**
```js
// onThrottle
$NG(window).onThrottle('scroll', function(e) {
  console.log('Scroll throttled!');
}, 500);
```

### onceDelegate(el, selector, event, handler, options)
Delegação de evento que dispara só uma vez.
- **@param** `Element|Array<Element>` el
- **@param** `string` selector
- **@param** `string` event
- **@param** `Function` handler
- **@param** `Object|boolean` [options]
- **@returns** `Function`

**Exemplo:**
```js
// onceDelegate
$NG('ul').onceDelegate('li', 'click', function(e) {
  alert('Primeiro clique em um LI!');
});
```
