// Animação
/**
 * Anima propriedades CSS de um ou mais elementos.
 * @param {Element|Array<Element>} el
 * @param {Object} props
 * @param {number} duration (ms)
 * @param {Function} [callback]
 * @param {string} [easing]
 */
export function animate(el, props, duration, callback, easing = 'linear') {
  const elems = Array.isArray(el) ? el : [el];
  const easings = {
    linear: t => t,
    ease: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    'ease-in': t => t * t,
    'ease-out': t => t * (2 - t)
  };
  elems.forEach(element => {
    const start = {};
    const end = {};
    for (const prop in props) {
      start[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
      end[prop] = parseFloat(props[prop]);
    }
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const easeT = easings[easing] ? easings[easing](t) : t;
      for (const prop in props) {
        const value = start[prop] + (end[prop] - start[prop]) * easeT;
        element.style[prop] = isNaN(value) ? props[prop] : value + (prop === 'opacity' ? '' : 'px');
      }
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (typeof callback === 'function') {
        callback.call(element);
      }
    }
    requestAnimationFrame(step);
  });
}

/**
 * Gerencia uma fila de animações/efeitos para um elemento.
 * @param {Element} el
 * @param {Function} fn
 */
export function fxQueue(el, fn) {
  if (!el._fxQueue) el._fxQueue = [];
  el._fxQueue.push(fn);
  if (el._fxQueue.length === 1) {
    (function next() {
      if (!el._fxQueue.length) return;
      el._fxQueue[0](function done() {
        el._fxQueue.shift();
        next();
      });
    })();
  }
}

/**
 * Anima a opacidade de 0 para 1.
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function fadeIn(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    e.style.opacity = 0;
    e.style.display = '';
    animate(e, { opacity: 1 }, duration, callback);
  });
}

/**
 * Anima a opacidade de 1 para 0.
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function fadeOut(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    animate(e, { opacity: 0 }, duration, function() {
      e.style.display = 'none';
      if (callback) callback.call(e);
    });
  });
}

/**
 * Alterna entre fadeIn e fadeOut.
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function fadeToggle(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    if (getComputedStyle(e).display === 'none' || getComputedStyle(e).opacity == 0) {
      fadeIn(e, duration, callback);
    } else {
      fadeOut(e, duration, callback);
    }
  });
}

/**
 * Expande a altura de 0 para o valor original (slideDown).
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function slideDown(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    e.style.display = '';
    let h = e.offsetHeight;
    e.style.overflow = 'hidden';
    e.style.height = '0px';
    animate(e, { height: h }, duration, function() {
      e.style.height = '';
      e.style.overflow = '';
      if (callback) callback.call(e);
    });
  });
}

/**
 * Colapsa a altura para 0 (slideUp).
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function slideUp(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    let h = e.offsetHeight;
    e.style.overflow = 'hidden';
    animate(e, { height: 0 }, duration, function() {
      e.style.display = 'none';
      e.style.height = '';
      e.style.overflow = '';
      if (callback) callback.call(e);
    });
  });
}

/**
 * Alterna entre slideDown e slideUp.
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function slideToggle(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    if (getComputedStyle(e).display === 'none' || e.offsetHeight === 0) {
      slideDown(e, duration, callback);
    } else {
      slideUp(e, duration, callback);
    }
  });
}

/**
 * Mostra o elemento (com ou sem animação).
 * @param {Element|Array<Element>} el
 * @param {number} [duration]
 * @param {Function} [callback]
 */
export function show(el, duration, callback) {
  if (duration) {
    fadeIn(el, duration, callback);
  } else {
    const elems = Array.isArray(el) ? el : [el];
    elems.forEach(e => {
      e.style.display = '';
      if (callback) callback.call(e);
    });
  }
}

/**
 * Esconde o elemento (com ou sem animação).
 * @param {Element|Array<Element>} el
 * @param {number} [duration]
 * @param {Function} [callback]
 */
export function hide(el, duration, callback) {
  if (duration) {
    fadeOut(el, duration, callback);
  } else {
    const elems = Array.isArray(el) ? el : [el];
    elems.forEach(e => {
      e.style.display = 'none';
      if (callback) callback.call(e);
    });
  }
}

/**
 * Alterna visibilidade (com ou sem animação).
 * @param {Element|Array<Element>} el
 * @param {number} [duration]
 * @param {Function} [callback]
 */
export function toggle(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    if (getComputedStyle(e).display === 'none' || e.style.display === 'none') {
      show(e, duration, callback);
    } else {
      hide(e, duration, callback);
    }
  });
}

/**
 * Interrompe animações em andamento em um elemento.
 * @param {Element|Array<Element>} el
 * @param {boolean} [clearQueue]
 * @param {boolean} [jumpToEnd]
 */
export const stop = (el, clearQueue, jumpToEnd) => {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    if (e && e._fxQueue && e._fxQueue.length) {
      if (jumpToEnd && typeof e._fxQueue[0] === 'function') {
        e._fxQueue[0](() => {}); // chama done imediatamente
      }
      if (clearQueue) e._fxQueue = [];
    }
  });
};

/**
 * Retorna se o elemento está atualmente animando.
 * @param {Element} el
 * @returns {boolean}
 */
export const isAnimated = el => !!(el && e._fxQueue && e._fxQueue.length);

/**
 * Define propriedades de transição CSS diretamente.
 * @param {Element|Array<Element>} el
 * @param {string} props
 * @param {number} duration
 * @param {string} [easing]
 */
export function setTransition(el, props, duration, easing = 'linear') {
  const elems = Array.isArray(el) ? el : [el];
  const value = props + ' ' + duration + 'ms ' + easing;
  elems.forEach(e => {
    e.style.transition = value;
    e.style.webkitTransition = value;
  });
}

/**
 * Remove transições CSS do elemento.
 * @param {Element|Array<Element>} el
 */
export function removeTransition(el) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    e.style.transition = '';
    e.style.webkitTransition = '';
  });
}

/**
 * Anima o scrollTop/scrollLeft de um elemento.
 * @param {Element|Array<Element>} el
 * @param {number} to
 * @param {number} duration
 * @param {string} [axis] 'top' ou 'left'
 * @param {Function} [callback]
 */
export function animateScroll(el, to, duration, axis = 'top', callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    const start = axis === 'left' ? e.scrollLeft : e.scrollTop;
    const change = to - start;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const value = start + change * t;
      if (axis === 'left') e.scrollLeft = value;
      else e.scrollTop = value;
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (typeof callback === 'function') {
        callback.call(e);
      }
    }
    requestAnimationFrame(step);
  });
}

/**
 * Efeito de pulsar (opacidade).
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function pulse(el, duration, callback) {
  fadeOut(el, duration / 2, function() {
    fadeIn(el, duration / 2, callback);
  });
}

/**
 * Efeito de tremer (shake).
 * @param {Element|Array<Element>} el
 * @param {number} duration
 * @param {Function} [callback]
 */
export function shake(el, duration, callback) {
  const elems = Array.isArray(el) ? el : [el];
  elems.forEach(e => {
    const originalTransform = e.style.transform;
    const stepDuration = duration / 10;
    let startTime = null;
    let lastStep = -1;

    function animationStep(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const currentStep = Math.floor(elapsed / stepDuration);

      if (elapsed >= duration) {
        e.style.transform = originalTransform;
        if (typeof callback === 'function') {
          callback.call(e);
        }
        return;
      }

      if (currentStep > lastStep && currentStep < 10) {
        // The shake effect applies translateX based on whether the step is even or odd.
        // Original logic: i % 2 === 0 ? 5 : -5.
        // For currentStep (0-indexed):
        // Step 0 (i=1): odd i -> -5px
        // Step 1 (i=2): even i -> 5px
        // ...
        // So, for currentStep: (currentStep + 1) % 2 === 0 ? 5 : -5
        // Which simplifies to: currentStep % 2 !== 0 ? 5 : -5
        e.style.transform = 'translateX(' + (currentStep % 2 !== 0 ? 5 : -5) + 'px)';
        lastStep = currentStep;
      }
      
      requestAnimationFrame(animationStep);
    }

    requestAnimationFrame(animationStep);
  });
}
