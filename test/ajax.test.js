// Testes do módulo AJAX
const lib = require('../src/index');

describe('AJAX', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    if (global.XMLHttpRequest && global.XMLHttpRequest.mockRestore) {
      global.XMLHttpRequest.mockRestore();
    }
  });

  test('param serializa objeto', () => {
    expect(lib.utils.param({ a: 1, b: 'x' })).toBe('a=1&b=x');
  });

  test('serialize serializa formulário', () => {
    document.body.innerHTML = '<form id="f"><input name="a" value="1"><input name="b" value="2"></form>';
    const form = document.getElementById('f');
    expect(lib.utils.serialize(form)).toBe('a=1&b=2');
  });

  test('isXHR reconhece XMLHttpRequest', () => {
    const req = new window.XMLHttpRequest();
    expect(lib.utils.isXHR(req)).toBe(true);
  });

  test('get faz requisição GET', done => {
    const xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      addEventListener: jest.fn(),
      readyState: 4,
      status: 200,
      responseText: '{"ok":true}',
      onload: null,
      onerror: null
    };
    global.XMLHttpRequest = jest.fn(() => xhrMock);
    lib.get('/api', data => {
      expect(data).toBe('{"ok":true}');
      done();
    });
    xhrMock.onload();
  });

  test('post faz requisição POST', done => {
    const xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      addEventListener: jest.fn(),
      readyState: 4,
      status: 201,
      responseText: '{"id":1}',
      onload: null,
      onerror: null
    };
    global.XMLHttpRequest = jest.fn(() => xhrMock);
    lib.post('/api', { x: 1 }, data => {
      expect(data).toBe('{"id":1}');
      done();
    });
    xhrMock.onload();
  });

  test('getJSON retorna objeto', done => {
    const xhrMock = {
      open: jest.fn(),
      send: jest.fn(),
      setRequestHeader: jest.fn(),
      addEventListener: jest.fn(),
      readyState: 4,
      status: 200,
      responseText: '{"ok":true}',
      onload: null,
      onerror: null
    };
    global.XMLHttpRequest = jest.fn(() => xhrMock);
    lib.getJSON('/api', json => {
      expect(json.ok).toBe(true);
      done();
    });
    xhrMock.onload();
  });

  // Outros utilitários (setCSRF, clearCSRF, ajaxSetup, etc) podem ser testados por side effects e mocks.
});
