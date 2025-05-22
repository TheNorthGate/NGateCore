# NGateCore – Documentação Detalhada

## Utils (`src/utils.js`)

### isArray(val)
Verifica se é array.
- **@param** `any` val
- **@returns** `boolean`

**Exemplo:**
```js
// isArray
$NG.utils.isArray([1,2,3]); // true
```

### isObject(val)
Verifica se é objeto.
- **@param** `any` val
- **@returns** `boolean`

**Exemplo:**
```js
// isObject
$NG.utils.isObject({ a: 1 }); // true
```

### isFunction(val)
Verifica se é função.
- **@param** `any` val
- **@returns** `boolean`

**Exemplo:**
```js
// isFunction
$NG.utils.isFunction(function(){}); // true
```

### toArray(val)
Converte NodeList, arguments, etc. para array.
- **@param** `any` val
- **@returns** `Array`

**Exemplo:**
```js
// toArray
const arr = $NG.utils.toArray(document.querySelectorAll('div'));
```

### unique(arr)
Remove duplicatas de um array.
- **@param** `Array` arr
- **@returns** `Array`

**Exemplo:**
```js
// unique
$NG.utils.unique([1,1,2,3,2]); // [1,2,3]
```

### camelCase(str)
Converte string para camelCase.
- **@param** `string` str
- **@returns** `string`

**Exemplo:**
```js
// camelCase
$NG.utils.camelCase('minha-string-exemplo'); // 'minhaStringExemplo'
```

### kebabCase(str)
Converte string para kebab-case.
- **@param** `string` str
- **@returns** `string`

**Exemplo:**
```js
// kebabCase
$NG.utils.kebabCase('minhaStringExemplo'); // 'minha-string-exemplo'
```

### escapeHTML(str)
Escapa caracteres HTML (ampliado).
- **@param** `string` str
- **@returns** `string`

**Exemplo:**
```js
// escapeHTML
$NG.utils.escapeHTML('<b>Oi!</b>'); // '&lt;b&gt;Oi!&lt;/b&gt;'
```

### unescapeHTML(str)
Desescapa caracteres HTML (ampliado).
- **@param** `string` str
- **@returns** `string`

**Exemplo:**
```js
// unescapeHTML
$NG.utils.unescapeHTML('&lt;b&gt;Oi!&lt;/b&gt;'); // '<b>Oi!</b>'
```

### debounce(fn, wait)
Debounce para funções.
- **@param** `Function` fn
- **@param** `number` wait
- **@returns** `Function`

**Exemplo:**
```js
// debounce
const fn = $NG.utils.debounce(() => console.log('Executou!'), 300);
window.addEventListener('resize', fn);
```

### throttle(fn, wait)
Throttle para funções.
- **@param** `Function` fn
- **@param** `number` wait
- **@returns** `Function`

**Exemplo:**
```js
// throttle
const fn = $NG.utils.throttle(() => console.log('Scroll!'), 200);
window.addEventListener('scroll', fn);
```

### isElement(obj)
Verifica se é um elemento DOM.
- **@param** `any` obj
- **@returns** `boolean`

**Exemplo:**
```js
// isElement
$NG.utils.isElement(document.body); // true
```

### matches(el, selector)
Cross-browser matchesSelector.
- **@param** `Element` el
- **@param** `string` selector
- **@returns** `boolean`

**Exemplo:**
```js
// matches
$NG.utils.matches(document.body, 'body'); // true
```

### closestPolyfill(el, selector)
Polyfill para closest.
- **@param** `Element` el
- **@param** `string` selector
- **@returns** `Element|null`

**Exemplo:**
```js
// closestPolyfill
$NG.utils.closestPolyfill(document.querySelector('span'), 'div');
```

### noop()
Função vazia.

**Exemplo:**
```js
// noop
$NG.utils.noop(); // não faz nada
```

### guid()
Gera um identificador único.
- **@returns** `string`

**Exemplo:**
```js
// guid
const id = $NG.utils.guid();
```

### extend(target, ...sources)
Faz merge de objetos (shallow).
- **@param** `Object` target
- **@param** `...Object` sources
- **@returns** `Object`

**Exemplo:**
```js
// extend
const obj = $NG.utils.extend({}, { a: 1 }, { b: 2 }); // { a: 1, b: 2 }
```
