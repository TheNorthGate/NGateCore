# NGateCore – Documentação Detalhada

## DOM (`src/dom.js`)

### select(selector)
Seleciona elementos DOM por seletor CSS ou retorna o próprio elemento.
- **@param** `string|Element|NodeList|Array<Element>` selector
- **@returns** `Array<Element>`

**Exemplo:**
```js
const items = select('.item');
// ou
const items = select(document.querySelectorAll('.item'));
```

### find(el, selector)
Busca descendentes de um elemento usando seletor CSS.
- **@param** `Element|Array<Element>` el
- **@param** `string` selector
- **@returns** `Array<Element>`

**Exemplo:**
```js
const boxes = find(document.body, '.box');
```

### addClass(el, className)
Adiciona uma classe a um ou mais elementos.
- **@param** `Element|Array<Element>` el
- **@param** `string` className

**Exemplo:**
```js
addClass(document.querySelectorAll('.item'), 'ativo');
```

### removeClass(el, className)
Remove uma classe de um ou mais elementos.
- **@param** `Element|Array<Element>` el
- **@param** `string` className

**Exemplo:**
```js
removeClass(document.querySelector('.item'), 'ativo');
```

### toggleClass(el, className)
Alterna a presença de uma classe.
- **@param** `Element|Array<Element>` el
- **@param** `string` className

**Exemplo:**
```js
toggleClass(document.querySelector('.item'), 'ativo');
```

### hasClass(el, className)
Verifica se o elemento possui uma classe.
- **@param** `Element` el
- **@param** `string` className
- **@returns** `boolean`

**Exemplo:**
```js
if (hasClass(document.querySelector('.item'), 'ativo')) {
  // ...
}
```

### css(el, styles)
Define ou obtém estilos CSS.
- **@param** `Element|Array<Element>` el
- **@param** `Object|string` styles
- **@returns** `Object|undefined`

**Exemplo:**
```js
css(document.querySelector('.item'), { color: 'red', fontWeight: 'bold' });
const color = css(document.querySelector('.item'), 'color');
```

### attr(el, name, value)
Define ou obtém atributos.
- **@param** `Element|Array<Element>` el
- **@param** `string` name
- **@param** `string` [value]
- **@returns** `string|undefined`

**Exemplo:**
```js
attr(document.querySelector('.item'), 'data-id', '123');
const id = attr(document.querySelector('.item'), 'data-id');
```

### append(parent, ...children)
Adiciona um ou mais elementos filhos ao final do elemento pai.
- **@param** `Element|Array<Element>` parent
- **@param** `...Element|Array<Element>` children

**Exemplo:**
```js
const div = document.createElement('div');
append(document.body, div);
```

### prepend(parent, ...children)
Adiciona um ou mais elementos filhos ao início do elemento pai.
- **@param** `Element|Array<Element>` parent
- **@param** `...Element|Array<Element>` children

**Exemplo:**
```js
const span = document.createElement('span');
prepend(document.body, span);
```

### remove(el)
Remove elementos do DOM.
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
remove(document.querySelectorAll('.item'));
```

### html(el, htmlString)
Define ou obtém o conteúdo HTML interno.
- **@param** `Element|Array<Element>` el
- **@param** `string` [htmlString]
- **@returns** `string|undefined`

**Exemplo:**
```js
html(document.querySelector('.item'), '<b>Olá</b>');
const conteudo = html(document.querySelector('.item'));
```

### text(el, textString)
Define ou obtém o texto interno.
- **@param** `Element|Array<Element>` el
- **@param** `string` [textString]
- **@returns** `string|undefined`

**Exemplo:**
```js
text(document.querySelector('.item'), 'Novo texto');
const texto = text(document.querySelector('.item'));
```

### parent(el)
Retorna o elemento pai.
- **@param** `Element` el
- **@returns** `Element|null`

**Exemplo:**
```js
const pai = parent(document.querySelector('.item'));
```

### children(el)
Retorna os filhos diretos.
- **@param** `Element` el
- **@returns** `Array<Element>`

**Exemplo:**
```js
const filhos = children(document.querySelector('ul'));
```

### closest(el, selector)
Retorna o ancestral mais próximo que corresponde ao seletor.
- **@param** `Element` el
- **@param** `string` selector
- **@returns** `Element|null`

**Exemplo:**
```js
const card = closest(document.querySelector('.btn'), '.card');
```

### empty(el)
Remove todos os filhos do elemento.
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
empty(document.querySelector('.container'));
```

### replace(parent, ...newChildren)
Substitui todos os filhos do elemento pai por novos elementos.
- **@param** `Element|Array<Element>` parent
- **@param** `...Element|Array<Element>` newChildren

**Exemplo:**
```js
const novo = document.createElement('div');
replace(document.body, novo);
```

### wrap(el, wrapper)
Envolve o(s) elemento(s) em um novo elemento wrapper.
- **@param** `Element|Array<Element>` el
- **@param** `Element` wrapper

**Exemplo:**
```js
const wrapper = document.createElement('div');
wrap(document.querySelector('.item'), wrapper);
```

### unwrap(el)
Remove o elemento pai, mantendo os filhos no DOM.
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
unwrap(document.querySelector('.item'));
```

### clone(el, deep = true)
Clona o(s) elemento(s).
- **@param** `Element|Array<Element>` el
- **@param** `boolean` [deep=true]
- **@returns** `Array<Element>`

**Exemplo:**
```js
const clones = clone(document.querySelectorAll('.item'));
```

### index(el)
Retorna o índice do elemento entre seus irmãos.
- **@param** `Element` el
- **@returns** `number`

**Exemplo:**
```js
const idx = index(document.querySelector('.item'));
```

### next(el)
Retorna o próximo irmão elemento.
- **@param** `Element` el
- **@returns** `Element|null`

**Exemplo:**
```js
const proximo = next(document.querySelector('.item'));
```

### prev(el)
Retorna o irmão elemento anterior.
- **@param** `Element` el
- **@returns** `Element|null`

**Exemplo:**
```js
const anterior = prev(document.querySelector('.item'));
```

### is(el, selector)
Verifica se o elemento corresponde ao seletor.
- **@param** `Element` el
- **@param** `string` selector
- **@returns** `boolean`

**Exemplo:**
```js
if (is(document.querySelector('.item'), '.ativo')) {
  // ...
}
```

### cssVar(el, name, value)
Lê ou define variáveis CSS customizadas.
- **@param** `Element|Array<Element>` el
- **@param** `string` name
- **@param** `string` [value]
- **@returns** `string|undefined`

**Exemplo:**
```js
cssVar(document.body, '--main-color', 'blue');
const cor = cssVar(document.body, '--main-color');
```

### focus(el)
Dá foco ao(s) elemento(s).
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
focus(document.querySelector('input'));
```

### blur(el)
Remove o foco do(s) elemento(s).
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
blur(document.querySelector('input'));
```

### toggleAttr(el, name, force)
Alterna um atributo booleano.
- **@param** `Element|Array<Element>` el
- **@param** `string` name
- **@param** `boolean` [force]

**Exemplo:**
```js
toggleAttr(document.querySelector('.item'), 'hidden');
```

### parents(el, selector)
Retorna todos os ancestrais do elemento, opcionalmente filtrando por seletor.
- **@param** `Element` el
- **@param** `string` [selector]
- **@returns** `Array<Element>`

**Exemplo:**
```js
const ancestrais = parents(document.querySelector('.item'), '.container');
```

### siblings(el)
Retorna todos os irmãos do elemento.
- **@param** `Element` el
- **@returns** `Array<Element>`

**Exemplo:**
```js
const irmaos = siblings(document.querySelector('.item'));
```

### detach(el)
Remove o(s) elemento(s) do DOM, mas mantém referência (detach).
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
detach(document.querySelector('.item'));
```

### replaceAll(targets, ...nodes)
Substitui múltiplos elementos por outros.
- **@param** `Element|Array<Element>` targets
- **@param** `...Element|Array<Element>` nodes

**Exemplo:**
```js
const novo = document.createElement('div');
replaceAll(document.querySelectorAll('.item'), novo);
```

### scrollTop(el, value)
Obtém ou define o scrollTop do elemento.
- **@param** `Element|Array<Element>` el
- **@param** `number` [value]
- **@returns** `number|undefined`

**Exemplo:**
```js
scrollTop(document.documentElement, 100);
const top = scrollTop(document.documentElement);
```

### scrollLeft(el, value)
Obtém ou define o scrollLeft do elemento.
- **@param** `Element|Array<Element>` el
- **@param** `number` [value]
- **@returns** `number|undefined`

**Exemplo:**
```js
scrollLeft(document.documentElement, 50);
const left = scrollLeft(document.documentElement);
```

### offset(el)
Retorna as coordenadas absolutas do elemento na página.
- **@param** `Element` el
- **@returns** `{top: number, left: number}`

**Exemplo:**
```js
const pos = offset(document.querySelector('.item'));
// pos.top, pos.left
```

### data(el, key, value)
Lê ou define atributos data-* de forma simplificada.
- **@param** `Element|Array<Element>` el
- **@param** `string` key
- **@param** `string` [value]
- **@returns** `string|undefined`

**Exemplo:**
```js
data(document.querySelector('.item'), 'foo', 'bar');
const foo = data(document.querySelector('.item'), 'foo');
```

### removeAttr(el, name)
Remove um atributo específico.
- **@param** `Element|Array<Element>` el
- **@param** `string` name

**Exemplo:**
```js
removeAttr(document.querySelector('.item'), 'data-id');
```

### fragment(htmlString)
Cria um DocumentFragment a partir de uma string HTML.
- **@param** `string` htmlString
- **@returns** `DocumentFragment`

**Exemplo:**
```js
const frag = fragment('<li>Item</li><li>Outro</li>');
document.querySelector('ul').appendChild(frag);
```

### setStyleImportant(el, prop, value)
Define uma propriedade CSS com !important.
- **@param** `Element|Array<Element>` el
- **@param** `string` prop
- **@param** `string` value

**Exemplo:**
```js
setStyleImportant(document.querySelector('.item'), 'color', 'red');
```

### replaceWith(target, ...nodes)
Substitui o(s) elemento(s) alvo por outros elementos ou nós.
- **@param** `Element|Array<Element>` target
- **@param** `...Element|Array<Element>` nodes

**Exemplo:**
```js
const novo = document.createElement('span');
replaceWith(document.querySelector('.item'), novo);
```

### insertAfter(ref, ...nodes)
Insere elementos após o elemento de referência.
- **@param** `Element` ref
- **@param** `...Element|Array<Element>` nodes

**Exemplo:**
```js
const novo = document.createElement('div');
insertAfter(document.querySelector('.item'), novo);
```

### insertBefore(ref, ...nodes)
Insere elementos antes do elemento de referência.
- **@param** `Element` ref
- **@param** `...Element|Array<Element>` nodes

**Exemplo:**
```js
const novo = document.createElement('div');
insertBefore(document.querySelector('.item'), novo);
```

### outerHtml(el, htmlString)
Obtém ou define o outerHTML do elemento.
- **@param** `Element|Array<Element>` el
- **@param** `string` [htmlString]
- **@returns** `string|undefined`

**Exemplo:**
```js
const html = outerHtml(document.querySelector('.item'));
outerHtml(document.querySelector('.item'), '<div class="novo"></div>');
```

### scrollTo(el, options)
Faz scroll suave até o elemento.
- **@param** `Element|Array<Element>` el
- **@param** `ScrollIntoViewOptions` [options]

**Exemplo:**
```js
scrollTo(document.querySelector('.item'));
```

### getRect(el)
Retorna o boundingClientRect do elemento.
- **@param** `Element` el
- **@returns** `DOMRect|null`

**Exemplo:**
```js
const rect = getRect(document.querySelector('.item'));
```
