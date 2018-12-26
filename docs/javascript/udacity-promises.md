# Aula 1 - Criando promises

Diferença entre [`callbacks` e `thens`](https://www.youtube.com/watch?v=RR0MoEoHb9U).

Uma promise pode ter 4 estados:

- Fulfilled (resolved): it worked
- Rejected: It didn't work
- Pending: Still waiting
- Settled: Something happened

Exemplos:

```
function ready () {
    return new Promise((resolve) => {
        const checkState = () {
            if(document.readState !== 'loading') {
                resolve()
            }
        }
        document.addEventListener('readystatechange', checkState)
        checkState()
    })
}

ready().then(() => {
    console.log('The page is ready')
})
```

```
new Promise(function(resolve, reject) {
    var img = document.createElement('img')
    img.src = 'image.jpg'
    img.onload = resolve
    img.onerror = reject
    document.body.appendChild(img)
}).then(finishLoading).catch(showAlternateImage)
```

```
function createThumbs(data) {
  return new Promise(function(resolve) {
    var pT = document.createElement('planet-thumb');
    for (var d of data) {
      pT.push(d);
    }
    home.appendChild(pT);
    console.log('rendered: ' + data.pl_name);
    resolve();
  });
}

loading.show()
createThumbs.then(() => {
    loading.hide()
})
```

```
function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest()
        req.open('GET', url)
        req.onload = function () {
            if (req.status == 200){
                resolve(req.response)
            } else {
                reject(Error(req.statusText))
            }
        }
        req.onerror = function () {
            reject(Error('Network Error'))
        }
        req.send()
    })
}

get('api.mysite.com/info').then(function(data) {
    console.log(data)
}).catch(function(error) {
    console.log(error)
})
```

```
function get(url){
    return fetch(url)
}
function getJson(url){
    return get(url).then((response) => response.json())
}
```

# Aula 2 - Encadeando promises

```
getJson('/data.json')
    .then((data) => {
        return Json.parse(data).result
    })
    .catch((error) => {
        console.log('Network error: ', error)
    })
    .then((response) => {
        // in Parallel
        console.log(response.images)
        for(image as images) {
            getBlob(image.url)
                .then(createThumbImage)
        }
    })
    .catch((error) => {
        console.log('Not found result data')
    })

getJson('/data.json')
    ...
    .then((response) => {
        // in Series
        const sequence = Promise.resolve()
        response.images.forEach(image => {
            sequence = sequence.then(() => {
                return getBlob(image.url)
            }).then(createThumbImage)
        })
    })
```

Usando o `all()`. [Veja a documentação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

- Se um das promises rejeitar, vai rejeitar todos.
- Se todas as promises passar, vai retornar um Array

```
getJson('/data.json')
    .then((response) => {
        var arrayOfPromises = response.images.map(image => {
            getBlob(image.url)
        })
        return Promise.all(arrayOfPromises)
    })
    .then(arrayOfImage => {
        arrayOfImage.forEach(image => {
            createThumbImage(image)
        })
    })
```

