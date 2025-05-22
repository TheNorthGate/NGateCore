# NGateCore – Documentação Detalhada

## Animação (`src/animation.js`)

### animate(el, props, duration, callback, easing = 'linear')
Anima propriedades CSS de um ou mais elementos.
- **@param** `Element|Array<Element>` el
- **@param** `Object` props
- **@param** `number` duration (ms)
- **@param** `Function` [callback]
- **@param** `string` [easing]

**Exemplo:**
```js
// animate
$NG('.box').animate({ opacity: 0.5, left: '100px' }, 400, () => {
  console.log('Animação concluída!');
});
```

### fxQueue(el, fn)
Gerencia uma fila de animações/efeitos para um elemento.
- **@param** `Element` el
- **@param** `Function` fn

**Exemplo:**
```js
// fxQueue
$NG.fxQueue(document.querySelector('.box'), next => {
  $NG('.box').animate({ opacity: 0 }, 300, next);
});
```

### fadeIn(el, duration, callback)
Anima a opacidade de 0 para 1.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// fadeIn
$NG('.box').fadeIn(300, () => console.log('Apareceu!'));
```

### fadeOut(el, duration, callback)
Anima a opacidade de 1 para 0.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// fadeOut
$NG('.box').fadeOut(300, () => console.log('Sumiu!'));
```

### fadeToggle(el, duration, callback)
Alterna entre fadeIn e fadeOut.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// fadeToggle
$NG('.box').fadeToggle(300);
```

### slideDown(el, duration, callback)
Expande a altura de 0 para o valor original.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// slideDown
$NG('.menu').slideDown(400);
```

### slideUp(el, duration, callback)
Colapsa a altura para 0.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// slideUp
$NG('.menu').slideUp(400);
```

### slideToggle(el, duration, callback)
Alterna entre slideDown e slideUp.
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// slideToggle
$NG('.menu').slideToggle(400);
```

### show(el, duration, callback)
Mostra o elemento (com ou sem animação).
- **@param** `Element|Array<Element>` el
- **@param** `number` [duration]
- **@param** `Function` [callback]

**Exemplo:**
```js
// show
$NG('.box').show(200);
```

### hide(el, duration, callback)
Esconde o elemento (com ou sem animação).
- **@param** `Element|Array<Element>` el
- **@param** `number` [duration]
- **@param** `Function` [callback]

**Exemplo:**
```js
// hide
$NG('.box').hide(200);
```

### toggle(el, duration, callback)
Alterna visibilidade (com ou sem animação).
- **@param** `Element|Array<Element>` el
- **@param** `number` [duration]
- **@param** `Function` [callback]

**Exemplo:**
```js
// toggle
$NG('.box').toggle(200);
```

### stop(el, clearQueue, jumpToEnd)
Interrompe animações em andamento em um elemento.
- **@param** `Element|Array<Element>` el
- **@param** `boolean` [clearQueue]
- **@param** `boolean` [jumpToEnd]

**Exemplo:**
```js
// stop
$NG('.box').stop(true, true);
```

### isAnimated(el)
Retorna se o elemento está atualmente animando.
- **@param** `Element` el
- **@returns** `boolean`

**Exemplo:**
```js
// isAnimated
if ($NG.utils.isAnimated(document.querySelector('.box'))) {
  console.log('Está animando!');
}
```

### setTransition(el, props, duration, easing = 'linear')
Define propriedades de transição CSS diretamente.
- **@param** `Element|Array<Element>` el
- **@param** `string` props
- **@param** `number` duration
- **@param** `string` [easing]

**Exemplo:**
```js
// setTransition
$NG.utils.setTransition(document.querySelector('.box'), 'opacity, left', 300, 'ease');
```

### removeTransition(el)
Remove transições CSS do elemento.
- **@param** `Element|Array<Element>` el

**Exemplo:**
```js
// removeTransition
$NG.utils.removeTransition(document.querySelector('.box'));
```

### animateScroll(el, to, duration, axis = 'top', callback)
Anima o scrollTop/scrollLeft de um elemento.
- **@param** `Element|Array<Element>` el
- **@param** `number` to
- **@param** `number` duration
- **@param** `string` [axis] 'top' ou 'left'
- **@param** `Function` [callback]

**Exemplo:**
```js
// animateScroll
$NG.utils.animateScroll(document.querySelector('.scrollable'), 200, 400, 'top', () => {
  console.log('Scroll animado!');
});
```

### pulse(el, duration, callback)
Efeito de pulsar (opacidade).
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// pulse
$NG('.btn').pulse(500);
```

### shake(el, duration, callback)
Efeito de tremer (shake).
- **@param** `Element|Array<Element>` el
- **@param** `number` duration
- **@param** `Function` [callback]

**Exemplo:**
```js
// shake
$NG('.input').shake(400);
```
