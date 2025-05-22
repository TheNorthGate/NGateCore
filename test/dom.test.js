// Testes do módulo DOM
const lib = require('../src/index');

describe('DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="a" class="item foo"></div>
      <div class="item"></div>
      <span id="b"></span>
    `;
  });

  test('select retorna elementos por seletor', () => {
    const items = lib.select('.item');
    expect(items.length).toBe(2);
  });

  test('addClass e removeClass', () => {
    const el = document.getElementById('a');
    lib.addClass(el, 'bar');
    expect(el.classList.contains('bar')).toBe(true);
    lib.removeClass(el, 'foo');
    expect(el.classList.contains('foo')).toBe(false);
  });

  test('attr define e obtém atributos', () => {
    const el = document.getElementById('a');
    lib.attr(el, 'data-x', '123');
    expect(lib.attr(el, 'data-x')).toBe('123');
  });

  test('html e text', () => {
    const el = document.getElementById('a');
    lib.html(el, '<b>oi</b>');
    expect(lib.html(el)).toBe('<b>oi</b>');
    lib.text(el, 'txt');
    expect(lib.text(el)).toBe('txt');
  });

  test('parent, children, next, prev', () => {
    const parent = document.createElement('div');
    parent.innerHTML = '<span id="c"></span><span id="d"></span>';
    document.body.appendChild(parent);
    const c = document.getElementById('c');
    const d = document.getElementById('d');
    expect(lib.parent(c)).toBe(parent);
    expect(lib.children(parent).length).toBe(2);
    expect(lib.next(c)).toBe(d);
    expect(lib.prev(d)).toBe(c);
  });

  test('hasClass e toggleClass', () => {
    const el = document.getElementById('a');
    expect(lib.hasClass(el, 'item')).toBe(true);
    lib.toggleClass(el, 'toggle');
    expect(el.classList.contains('toggle')).toBe(true);
    lib.toggleClass(el, 'toggle');
    expect(el.classList.contains('toggle')).toBe(false);
  });

  test('remove remove elementos do DOM', () => {
    const el = document.getElementById('a');
    lib.remove(el);
    expect(document.getElementById('a')).toBeNull();
  });
});
