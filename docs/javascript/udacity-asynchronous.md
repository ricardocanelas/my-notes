
# Aula 1 - Ajax com XHR

Ajax era um sigla para (Asynchronous Javascript And XML) JavaScript Assincrono e XML, mas é um termo errôneo agora. Ajax é o conceito de requisitar dados de forma assíncrona

API significa (Application Programming Interface) interface para a programação de aplicações. [Banco de dados de APIs](https://www.programmableweb.com/apis/directory)

## Object XHR (Xml Http Request)

XMLHttpRequests (normalmente abreviadas para XHR) podem ser utilizadas para requisitar qualquer tipo de arquivo (arquivos de texto, arquivos HTML, arquivos JSON, Imagens, etc.) ou dados de uma API.

```
const asyncRequestObject = new XMLHttpRequest();
asyncRequestObject.open('GET', 'https://unsplash.com');
asyncRequestObject.onload = function handleSuccess () {
    console.log( this.responseText );
    const data = JSON.parse( this.responseText );
    console.log( data )
};
asyncRequestObject.onerror = function handleError () {
    console.log( 'An error occurred 😞' );
};
asyncRequestObject.send();
```

Passar false como terceiro parâmetro para o método open faz com que a requisição XHR seja realizada de forma síncrona `req.open('GET', 'https://unsplash.com', false);`, fazendo com que o mecanismo JavaScript pause e espere até que a requisição retorne antes de continuar - essa "pausa e espera" também é chamada de "blocking". Isso é uma péssima ideia e fere completamente o propósito de se ter um comportamento assíncrono.

Confira [aqui outras dicas](https://www.html5rocks.com/en/tutorials/file/xhr2/)

# Aula 2 - Ajax com jQuery

```
function handleResponse(data) {
    console.log('the ajax request has finished!');
    console.log(data);
}

$.ajax({
    url: 'http://swapi.co/api/people/1/',
    headers: {},
    method: 'get'
}).done(handleResponse);
```

# Aula 3 - Ajax com Fetch

Fetch é uma nova maneira de realizar requisições HTTP, é uma API nova, e se baseia nas Promises.

Talvez você precise de um Polyfill [canIUse](https://caniuse.com/#feat=fetch), [polyfill](https://github.com/github/fetch).

```
fetch('https://api.mysite.com/api/visit/increment', {
     method: 'POST'
}).then(function(response) {
    // response.blob() // O .blob() extrairá o body da imagem contida na response.
    // response.json() // O .json() converte a resposta JSON
    return response.json() // O método .json() em um objeto response retorna uma Promise,
}).then(function(data) {
    console.log(data)
}).catch(function (error) {
    console.log(error)
});
```

Adding header

```
fetch('https://api.unsplash.com/search/photos?page=1&query=flowers', {
    headers: {
        Authorization: 'Client-ID abc1234'
    }
})

// or

const requestHeaders = new Headers()
requestHeaders.append('Authorization', 'Client-ID abc1234')
fetch('https://api.unsplash.com/search/photos?page=1&query=flowers', {
    headers: requestHeaders
})
```

[Mais informações](https://davidwalsh.name/fetch)