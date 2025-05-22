# NGateCore

Uma biblioteca JavaScript utilitária, rápida, pequena e rica em recursos para manipulação de DOM, eventos, animação e AJAX, com API encadeável e compatibilidade cross-browser (incluindo IE11).

## Instalação

```sh
npm install ngatecore
```

## Importação

- **ESM/TypeScript:**
  ```js
  import $NG, { utils, ajax, get, post, getJSON } from 'ngatecore';
  ```
- **UMD/Browser:**
  ```html
  <script src="ngatecore.umd.js"></script>
  <script>
    $NG('.item').addClass('ativo');
    $NG.utils.camelCase('foo-bar');
  </script>
  ```

## Uso Básico

```js
import $NG, { utils } from 'ngatecore';

// Manipulação encadeável de DOM
$NG('.item')
  .addClass('ativo')
  .css({ color: 'red', fontWeight: 'bold' })
  .on('click', e => alert('Clicou!'));

// Utilitários disponíveis
utils.camelCase('minha-string'); // 'minhaString'
utils.unique([1,2,2,3]); // [1,2,3]
utils.escapeHTML('<b>oi</b>'); // '&lt;b&gt;oi&lt;/b&gt;'
```

## Principais Recursos

- **DOM:**
  - Seleção: `$NG('div'), $NG(element), $NG('.cls')`
  - Manipulação: `.addClass()`, `.removeClass()`, `.toggleClass()`, `.css()`, `.attr()`, `.html()`, `.text()`, `.append()`, `.prepend()`, `.remove()`, `.replace()`, `.wrap()`, `.unwrap()`, `.clone()`, `.parent()`, `.children()`, `.next()`, `.prev()`, `.closest()`, `.empty()`, `.replaceWith()`, `.fragment()`, `.data()`, `.removeAttr()`, `.toggleAttr()`, `.focus()`, `.blur()`, `.scrollTo()`, `.getRect()`, `.offset()`, `.siblings()`, `.parents()`, `.toArray()`, `.get(i)`

- **Eventos:**
  - `.on()`, `.off()`, `.once()`, `.delegate()`, `.onceDelegate()`, `.trigger()`, `.ready()`, `.onKey()`, `.hover()`, `.blurOnEscape()`, `.stop()`, `.prevent()`, `.stopPropagation()`, `.stopImmediatePropagation()`, `.onDebounce()`, `.onThrottle()`

- **Animação:**
  - `.animate()`, `.fadeIn()`, `.fadeOut()`, `.fadeToggle()`, `.slideDown()`, `.slideUp()`, `.slideToggle()`, `.show()`, `.hide()`, `.toggle()`, `.pulse()`, `.shake()`, `.stop()`, `.isAnimated()`, `.setTransition()`, `.removeTransition()`, `.animateScroll()`

- **AJAX:**
  - `ajax()`, `get()`, `post()`, `put()`, `deleteReq()`, `getJSON()`, `param()`, `serialize()`, `getScript()`, `abort()`, `setCSRF()`, `clearCSRF()`, `ajaxSetup()`, `ajaxPrefilter()`, `jsonp()`, `upload()`, `download()`, `isXHR()`

- **Utils:**
  - `isArray()`, `isObject()`, `isFunction()`, `toArray()`, `unique()`, `camelCase()`, `kebabCase()`, `escapeHTML()`, `unescapeHTML()`, `debounce()`, `throttle()`, `isElement()`, `matches()`, `closestPolyfill()`, `noop()`, `guid()`, `extend()`

## API Encadeável

A maioria dos métodos retorna a própria instância, permitindo chamadas em cadeia:

```js
$NG('#el')
  .addClass('foo')
  .css('color', 'blue')
  .on('mouseenter', e => ...)
  .fadeIn(300);
```

## Exemplos
Veja a pasta [`examples/`](./examples/) para exemplos completos de uso, incluindo manipulação de DOM, animações, AJAX e integração com formulários.

## Documentação
Consulte a documentação detalhada da API em [`docs/`](./docs/) ou acesse exemplos comentados no repositório.

## Testes

```sh
npm test
```

## Compatibilidade
- Browsers modernos (Chrome, Firefox, Edge, Safari)
- IE11 (com polyfills inclusos)
- ESM, UMD, CommonJS

## Licença
MIT
