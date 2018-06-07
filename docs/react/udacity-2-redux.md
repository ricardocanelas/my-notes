REACT E REDUX

[Aula 1 - Por que Redux?](#aula-1---por-que-redux)

[Aula 2 - Redux na sua essência](#aula-2---redux-na-sua-ess%C3%AAncia)

[Aula 3 - React e Redux](#aula-3---react-e-redux)

[Aula 4 - Arquitetando uma Redux Store](#aula-3---react-e-redux)

[Aula 5 - Middleware para Redux](#aula-5---middleware-para-redux)

# Aula 1 - Por que Redux?

## Funções Puras / Pure Fuctions

As funções puras se prestam a um código de melhor qualidade, e ter isso em mente ao construir os aplicativos fará de você um programador mais capaz.

Tres items que deve ser:

- Return one and the same result if the same arguments are passed in
- Depend solely on the arguments passed into them
- Do not produce side effects

```
const square = (x) => x * x
```

Veja mais em: https://www.gitbook.com/book/drboolean/mostly-adequate-guide-old/details

## Funções inpuras

```
// Inpura
const tipPercentage = 0.15
const calculateTip = (cost) => cost * tipPercentage

// Pura
const calculateTip = (cost, tipPercentage = 0.15) => cost * tipPercentage
```

## Programação Funcional / Functional Programming

Enfatiza funções puras.. 

## Programação Imperativa 

Enfatiza funções impuras..

## Função High-order

 Pega uma função (ou seja, um callback) como argumento.
 
 Exemplo de funções HO: reduce, map, filter
 
 ## Reduce() 
 
 A ideia central de .reduce() é que ela pega uma grande quantidade de dados, mas retorna um único valor.
 
 ```
 const iceCreamStats = [
    { name: 'Amanda', gallonsEaten: 3.8},
    { name: 'Richard', gallonsEaten: 5.2}
 ]
 
 iceCreamStats.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.gallonsEaten
 }, 0) 
 
 // return: 9
 ```
 
 # Aula 2 - Redux na sua essência
 
 ## Major players in Redux / Os principais elementos do Redux
 
 * Action 
 * Reducers
 * The Store
 
 1. Action são enviadas pela store
 2. Para criar a store, precisamos do reducer.
 3. O reducer usa as actions.

Um fluxo de dados unidirecional

 ![fluxo](https://d17h27t6h515a5.cloudfront.net/topher/2017/August/59811293_nd019-c2-redux-full/nd019-c2-redux-full.png)

Resumo: os principais conceitos do Redux são as actions, os reducers e a store. A store é o single source of truth sobre o estado de seu aplicativo, os reducers atualizam e especificam o formato da store, e as actions são pacotes de informação que dizem aos reducers que tipos de eventos aconteceram no aplicativo.

## Actions

Actions são objetos JavaScript que descrevem qualquer evento que deva atualizar o estado do aplicativo.

Esses objetos devem ter uma propriedade **type** para distinguir o tipo específico de action que ocorreu.

Recomendações: Faça com que seus recursos enviem apenas os dados necessários! É importante manter actions o mais concentradas possíveis, sem efeitos colaterais.

```
{ 
    type: 'DELETE_COMMENT',
    id: 3
}
```

## Action Creators

```
deleteComment = id => ({
    type: 'DELETE_COMMENT',
    id: id
})
```

```
const CREATE_MEAL = 'CREATE_MEAL'

const mealCreator = (id) => ({
    type: CREATE_MEAL,
    id
})

console.log(mealCreator(1))
// { type: 'CREATE_MEAL', id: 1 }
```

## Reducers

Um reducer é, simplesmente, uma função à qual são passados esses dois argumentos.

Um reducer recebe o **estado atual** e uma action que foi despachada e, então, decide como transformar o **estado atual** em um **estado novo**, baseado na action que recebeu.

Regras: 

- Reducer deve ser uma função pura.
- Reducer deve receber o estado atual e uma action, e retornar o novo estado
- Reducer não deve produzir efeitos colaterais (solicitações assíncronas, alteração de variáveis de escopo, etc.)

```
function reducer (state = initialState, action) {
    const newState = {...state} 
    return newState // always return a state
}
```

```
function reducer (state = initialState, action) {
  switch (action.type) {
    case 'SUBMIT_USER' :
      return Object.assign({}, state, {
        user: action.user
      })
  }
}
```

## The Store 

O que comanda a parada toda

```
const immaStore = Redux.createStore(<reducer>)

immaStore.getState()

immaStore.dispatch(<action object>)

immaStore.subscrive(<listener function>)
```

## All Together

https://www.youtube.com/watch?v=AlFCMlK5cpU

https://github.com/udacity/reactnd-udacimeals-complete/commit/d0d4b8ade3dea46b7a3250ea196e0f862a399672 

# Aula 3 - React e Redux

A maior vantagem do react-redux é percebida no despacho de actions e no acesso à store do Redux a partir dos seus componentes React

* Provider
* Connect

## Provider

```
import { Provider } from 'react-redux';

const store = createStore(myReducer)

<Provider store={store}>
  <App />
</Provider>
```

O *Provider* permite que o Redux passe dados da store para quaisquer componentes React que precisem. Ele usa a funcionalidade de contexto do React para fazer isso funcionar.

## Currying / Curried Function

Também pode ser chamado de 'partial application' 

```
function greet(name, message) {
    return `${message}, ${name}!`;
}
```

Digamos que, por qualquer motivo, gostaríamos de esperar para *message* mais tarde. Uma forma de conseguir fazer isso seria retornar uma função que aceita uma mensagem, que pudesse ser chamada mais tarde.

```
// the curried function
const greet = (name) {
    return (message) => {
        return `${message}, ${name}!`;
    }
}

greet('Ricardo')('Yo yo')
```

Currying é o processo de fornecer entradas parcialmente a uma função que precisa de informações adicionais. A parte da API do Redux que usa currying é seu método connect(). Vamos dar uma olhada!..

## Connect

connect() é uma função que permite que um componente obtenha dados e despache actions a partir de uma store do Redux. Sua assinatura é interessante. Usando todos os argumentos, ela fica assim:

```
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

### mapStateToProps

mapStateToProps() permite que você especifique que dados do store você quer que sejam passados para seus componente React.

Ele pega do **state** de store, um argumento opcional **ownprops**, e retorna um objeto. Veja sua assinatura completa:

```
mapStateToProps(state, [ownProps])
```

```
const mapStateToProps = (state, ownProps) => ({
  name: state.user.name,
  age: state.user.age
});
```

```
const mapStateToProps = (state, ownProps) => ({
  photos: state.photos.filter(photo => photo.user === ownProps.user)
});
```

### mapDispatchToProps()

Quando você conecta um componente, aquele componente será passado automaticamente para o método dispatch() do Redux

```
const mapDispatchToProps = dispatch => ({
  boundUpdateName: (name) => dispatch(updateName(name))
});
```

# Aula 4 - Arquitetando uma Redux Store

## CombineReducers

combineReducers() é uma função auxiliar fornecida pelo Redux que transforma um objeto cujos valores são diferentes funções reducer em uma única função reducer. 

Passamos então este “root reducer” para o createStore() para criar a store do aplicativo.

```
// in: reducers/root_reducer.js
import { combineReducers } from 'redux';

function users (state = {}, action) { ...}

function books (state = {}, action) { ... }

export default combineReducers({
  users,
  books,
});
```

```
// in: store/store.js

import rootReducer from '../reducers/root_reducer';

const store = createStore(rootReducer)
```

## Normalização

Normalização é o processo de remover porções de dados duplicadas e garantir que os dados estejam estruturados da maneira menos profunda possível. 

```
const people = {
    personA: 'myInfoA',
    personB: 'myInfoB',
    personC: 'myInfoC',
}

const friends = ['personA', 'personB']
getFriendInformation = friends.map((friend) => people[friend])
```

Coloque em mente: **não duplique seus dados** e **mantenha sua store o menos profundo possível.**

# Aula 5 - Middleware para Redux

![middleware-redux](https://d17h27t6h515a5.cloudfront.net/topher/2017/August/598230e7_nd019-c2-middleware-full/nd019-c2-middleware-full.png)

Middleware.. um ponto de extensão criado por terceiros entre o despacho de uma action e o momento em que ela chega ao reducer.

Uma vez que o middleware recebe a action, ele pode, então, realizar uma série de operações, incluindo:

* Produzir um efeito colateral (ex: fazer um log do estado)
* Processar a action por si só (ex: fazendo uma requisição HTTP assíncrona)
* Redirecionando a action (ex: para outro middleware)
* Executar algum código durante o despacho
* Despachar actions suplementares

...e tudo isso é feito antes da action ser encaminhada para o reducer!

Doc: https://redux.js.org/advanced/middleware

## applyMiddleware()

Redux nos fornece a função applyMiddleware(), que podemos usar como nosso argumento enhancer. 

```
store.createStore(reducer, [preloadedState], [enhancer])
```

applyMiddleware() aceita múltiplos argumentos, então, caso necessário, podemos aplicar mais de um middleware a um aplicativo. 

```
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
)
```

Middlewares:

* https://github.com/evgenyrodionov/redux-logger
* https://github.com/gaearon/redux-thunk
* https://github.com/xgrommx/awesome-redux#react---a-javascript-library-for-building-user-interfaces
* ...

### Redux-Thunk

```
// store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const store = () => createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

Nos permite escrever action creators assíncronos que retornam funções em vez de objetos, nosso novo action creator, agora, pode ser assim:

```
// util/todos_api_util.js

export const fetchTodos = () => fetch('/api/todos');
```

```
import * as TodoAPIUtil from '../util/todo_api_util';

export const RECEIVE_TODOS = "RECEIVE_TODOS";

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const fetchTodos = () => dispatch => (
  TodoAPIUtil
      .fetchTodos()
      .then(todos => dispatch(receiveTodos(todos)))
);
```

O thunk pode, então, ser usado para atrasar o despacho de uma action ou para despachar somente se uma certa condição for satisfeita (ex: um pedido é resolvido).

Veja mais em:

- http://redux.js.org/docs/advanced/AsyncFlow.html
- http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

## Estrutura e Organização

Não existe um “jeito certo” de dividir as coisas, embora haja convenções que podemos praticar para ajudar a gerenciar a complexidade do Redux. 

Exemplos de mundo real:

* https://github.com/reactjs/redux/tree/master/examples/real-world
* https://github.com/reactjs/redux/issues/2378
* ...

...fique à vontade para escolher a estrutura que fizer mais sentido para você.

## Redux examples

* https://github.com/xgrommx/awesome-redux
* http://redux.js.org/docs/introduction/Examples.html


