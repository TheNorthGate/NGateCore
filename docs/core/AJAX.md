# NGateCore – Documentação Detalhada

## AJAX (`src/ajax.js`)

### ajax(options)
Função AJAX principal (GET, POST, etc).
- **@param** `Object` options
  - url, method, data, headers, responseType, timeout, success, error, async

**Exemplo:**
```js
// ajax
$NG.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  method: 'GET',
  success: function(data) { console.log(data); },
  error: function(xhr) { alert('Erro!'); }
});
```

### get(url, success, options = {})
Atalho para GET.
- **@param** `string` url
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// get
$NG.get('https://jsonplaceholder.typicode.com/posts/1', function(data) {
  console.log(data);
});
```

### post(url, data, success, options = {})
Atalho para POST.
- **@param** `string` url
- **@param** `Object|string|FormData` data
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// post
$NG.post('https://jsonplaceholder.typicode.com/posts', { title: 'NG', body: 'Core' }, function(data) {
  console.log('Criado:', data);
});
```

### getJSON(url, success, options = {})
Atalho para GET que retorna JSON.
- **@param** `string` url
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// getJSON
$NG.getJSON('https://jsonplaceholder.typicode.com/todos/1', function(json) {
  console.log(json.title);
});
```

### param(obj)
Serializa um objeto para query string.
- **@param** `Object` obj
- **@returns** `string`

**Exemplo:**
```js
// param
const qs = $NG.utils.param({ a: 1, b: 'x' }); // 'a=1&b=x'
```

### serialize(form)
Serializa um formulário para query string.
- **@param** `HTMLFormElement` form
- **@returns** `string`

**Exemplo:**
```js
// serialize
const form = document.querySelector('form');
const qs = $NG.utils.serialize(form);
```

### getScript(url, success)
Carrega e executa um script remoto.
- **@param** `string` url
- **@param** `Function` [success]

**Exemplo:**
```js
// getScript
$NG.utils.getScript('https://code.jquery.com/jquery-3.6.0.min.js', function() {
  console.log('jQuery carregado!');
});
```

### abort(request)
Aborta uma requisição AJAX em andamento.
- **@param** `XMLHttpRequest` request

**Exemplo:**
```js
// abort
const req = $NG.ajax({ url: '/demorado', success: () => {} });
$NG.utils.abort(req); // aborta a requisição
```

### setCSRF(token)
Define um token CSRF para ser enviado em todas as requisições.
- **@param** `string` token

**Exemplo:**
```js
// setCSRF
$NG.utils.setCSRF('token123');
```

### clearCSRF()
Remove o token CSRF global.

**Exemplo:**
```js
// clearCSRF
$NG.utils.clearCSRF();
```

### ajaxSetup(options)
Define opções globais para todas as requisições AJAX.
- **@param** `Object` options

**Exemplo:**
```js
// ajaxSetup
$NG.utils.ajaxSetup({ headers: { 'X-Test': '1' } });
```

### ajaxPrefilter(fn)
Permite interceptar/modificar opções antes de cada requisição AJAX.
- **@param** `Function` fn

**Exemplo:**
```js
// ajaxPrefilter
$NG.utils.ajaxPrefilter(function(opts) {
  opts.headers = opts.headers || {};
  opts.headers['X-Intercepted'] = 'yes';
});
```

### put(url, data, success, options = {})
Atalho para PUT.
- **@param** `string` url
- **@param** `Object|string|FormData` data
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// put
$NG.utils.put('/api/item/1', { nome: 'Novo' }, function(resp) {
  console.log('Atualizado:', resp);
});
```

### deleteReq(url, data, success, options = {})
Atalho para DELETE.
- **@param** `string` url
- **@param** `Object|string|FormData` data
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// deleteReq
$NG.utils.deleteReq('/api/item/1', {}, function(resp) {
  console.log('Removido:', resp);
});
```

### jsonp(url, callbackName, success, error)
Suporte a requisições JSONP.
- **@param** `string` url
- **@param** `string` callbackName
- **@param** `Function` success
- **@param** `Function` [error]

**Exemplo:**
```js
// jsonp
$NG.utils.jsonp('https://api.dominio.com/jsonp', 'callback', function(data) {
  console.log('JSONP:', data);
});
```

### upload(url, file, success, options = {})
Upload de arquivos via AJAX.
- **@param** `string` url
- **@param** `File|Blob` file
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// upload
const file = document.querySelector('input[type=file]').files[0];
$NG.utils.upload('/upload', file, function(resp) {
  console.log('Upload ok:', resp);
});
```

### download(url, success, options = {})
Download de arquivos via AJAX.
- **@param** `string` url
- **@param** `Function` success
- **@param** `Object` [options]

**Exemplo:**
```js
// download
$NG.utils.download('/arquivo.pdf', function(blob) {
  // Faça algo com o blob (ex: salvar)
});
```

### isXHR(obj)
Verifica se um objeto é uma instância de XMLHttpRequest.
- **@param** `any` obj
- **@returns** `boolean`

**Exemplo:**
```js
// isXHR
const req = $NG.ajax({ url: '/api' });
console.log($NG.utils.isXHR(req)); // true
```
