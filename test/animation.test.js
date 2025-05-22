// test/animation.test.js
// Testes unitários para o módulo de animação do NGCore

const lib = require('../src/index');

describe('Animação', () => {
  let el;
  beforeEach(() => {
    document.body.innerHTML = '<div id="anim"></div>';
    el = document.getElementById('anim');
    el.style.opacity = '1';
  });

  test('fadeOut reduz opacidade e chama callback', done => {
    lib.fadeOut(el, 10, () => {
      expect(parseFloat(el.style.opacity)).toBeLessThan(1);
      done();
    });
  });

  test('fadeIn aumenta opacidade e chama callback', done => {
    el.style.opacity = '0';
    lib.fadeIn(el, 10, () => {
      expect(parseFloat(el.style.opacity)).toBeGreaterThan(0);
      done();
    });
  });

  test('animate altera propriedades CSS', done => {
    lib.animate(el, { width: '100px' }, 10, () => {
      expect(el.style.width).toBe('100px');
      done();
    });
  });
});
