FUNDAMENTOS DE REACT

[Aula 1 - Introdução](#aula-1-introdução)

[Aula 2 - Renderização da UI com o React](#aula-2-renderização-da-ui-com-o-react)

[Aula 3 - Gerenciamento de Estados](#aula-3-gerenciamento-de-estados)

[Aula 4 - Gerenciamento de Estados](#aula-4-renderizando-a-ui-com-dados-externos)

[Aula 5 - Gerenciando a localização na aplicação com o React Router](#aula-5-gerenciando-a-localiza%C3%A7%C3%A3o-na-aplica%C3%A7%C3%A3o-com-o-react-router)

# Aula 1 - Introdução

## Composição

A composição ocorre quando funções simples são combinadas para criar outras mais complexas.
Pense em cada função como um bloco de construção único que faz uma coisa (DOT - "does one thing")

## Código imperativo

Imperative significa: expressar um comando; comandar.

Quando um código de JavaScript é escrito de maneira imperativa, dizemos ao JavaScript exatamente **o que** fazer e **como** fazer isso.

 ## Código declarativo

Com o código declarativo, não codificamos todas as etapas para chegar ao resultado final. Em vez disso, declaramos o que queremos fazer, e o JavaScript se encarregará de fazê-lo.

```javascript
const people = ['Amanda', 'Geoff', 'Michael', 'Richard', 'Ryan', 'Tyler']
const excitedPeople = people.map(name => name + '!')
```
*"JavaScript", vou dar esse conjunto de nomes e quero que você mapeie-os e coloque uma exclamação em cada um ao final. Depois, devolva-me o resultado, por favor."*

O código imperativo instrui o JavaScript sobre como ele deve executar cada etapa. Com o código declarativo, dizemos ao JavaScript o que queremos obter e o deixamos tomar conta das etapas de execução.

O React é declarativo, pois escrevemos o código que queremos, e o React é responsável por pegar o código declarado e executar todas as etapas de JavaScript/DOM para nos fornecer o resultado desejado.

## Data-Binding

### Unidirecional (one-way data bindings)

Os dados fluem em uma única direção, do pai para o filho. React usa esse tipo de direcionamento.

### Bidirecional  (two-way data bindings)

Frameworks de front-end, como o Angular e o Ember, utilizam a ligação de dados bidirecionais (two-way data bindings).

## Map & Filter

```javascript
const people = ['Rico', 'Canelas', 'Fernanda'];
const lenPeople = people.map(person => person.length);
const shortsPeople = people.filter(person => person.length < 5);
```

***

# Aula 2 - Renderização da UI com o React

## CreateElement

O método .createElement() do React requer uma descrição de um elemento e retorna um objeto JavaScript simples.

O .createElement() retorna um elemento Root

```javascript
import React from 'react'

const helloElem = React.createElement('div', {'className': 'world'}, 'Hello World!')

const myListElem = React.createElement('ol', null,
  React.createElement('li', null, 'Michael'),
  React.createElement('li', null, 'Richard'),
  React.createElement('li', null, 'Evelly'),
)

const people = ['Michael', 'Richard', 'Evelly']
const peopleListElem = React.createElement('ol', null,
  people.map((person, index) => (
    React.createElement('li', { key: index }, person),
  ))
)
```

Usando o 'react-dom' para renderizar.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const helloElem = React.createElement('div', {'className': 'world'}, 'Hello World!');
ReactDOM.render(helloElem, document.getElementById('root'));
```

## JSX

Ao escrever JSX, tenha em mente que ele deve retornar apenas um único elemento.

```javascript
const people = ['Michael', 'Richard', 'Evelly']
const peopleListElem = (
 <ol>
  {people.map((person,index) => (
   <li key={index}>{person}</li>
  ))}
 </ol>
)
```

## Componentes

Existe apenas um método absolutamente necessário em qualquer classe de componente de React: o método render().

Essas classes de componentes devem seguir o princípio da responsabilidade única e apenas "fazer uma coisa". Se ele gerencia muitas tarefas diferentes, pode ser uma boa idéia decompor seu componente em subcomponentes menores.

Uma ótima mentalidade para se adquirir ao criar aplicativos em React é [pensar em componentes.](https://reactjs.org/docs/thinking-in-react.html)

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

class ContactList extend React.Component {
  render () {
    $greeting = 'Hello World'

    return (
      <div>
        <h1>$greeting</h1>
        <p>lorem ipsum...</p>
      </div>
    )
  }
}

ReactDOM.render(
 <ContactList>,
 document.getElementById('root')
)
```

O JSX é incrível, mas precisa ser transpilado para JavaScript regular antes de chegar ao navegador. Normalmente, usamos um transpiler como o Babel para fazer isso. Podemos executar o Babel com uma ferramenta de build como o Webpack, que ajuda a agrupar todos nossos assets (arquivos de JavaScript, CSS, imagens, etc.) para projetos na web.

## Create React App

Para simplificar essas configurações iniciais, podemos usar o pacote do aplicativo Create React, do Facebook, para cuidar de toda a configuração para nós!

```dash
npm install -g create-react-app
create-react-app contactsApp
```

Vai instalar: React, React-Dom, React-Scripts

React-Scripts vem com: Babel, Webpack, Webpack-Dev-Server


***

# Aula 3 - Gerenciamento de Estados

Conceitos: Props, States, Componentes Funcionais, Componentes Controlados.

Se você deseja que seu componente armazene dados locais mutáveis, considere usar o *state* para manter essa informação.

Se a mudança de algumas informações ao longo do tempo não é esperada, e geralmente é projetada para ser "somente leitura" em seu aplicativo, considere usar *props* em vez disso.

## Props

Um prop é qualquer entrada que você passa para um componente React. Assim como um atributo HTML, um nome e valor do prop são adicionados ao componente.

Podemos pensar em passar os props para componentes, assim como passamos argumentos para funções. Assim como podemos acessar os argumentos passados para uma função em JavaScript, podemos também acessar os props de um componente com this.props (ou props em
componentes funcionais sem estado).

Qualquer prop passado para um componente é acessível com o objeto this.props.

### Prop-Types

O PropTypes é um pacote que nos permite definir os tipos de dados que queremos ter e nos avisar, durante o desenvolvimento, se o prop que foi passado para o componente coincide ou não com o esperado.

```dash
yarn install prop-types
```

## Componente (como class)

```javascript
class User extends React.Components {
 render() {
  return (
   <p>Username: {this.props.username}</p>
  )
 }
}
```

## Stateless Functional Components (como function)

Componente funcional sem estado.

```javascript
const User = (props) => {
 return (
  <p>Username: {props.username}
 )
}
```

## Componentes Controlados

Os componentes controlados referem-se a componentes que representam um formulário, mas a "fonte da verdade" para esse estado do formulário vive dentro do estado do componente em vez de dentro do DOM. Os benefícios dos componentes controlados são:

- Validação de entrada instantânea
- Desativação/habilitação de botões de maneira condicional
- Imposição de formatos de entrada

```javascript
class NameForm extends React.Component {
 state = { email: '' }
 handleChange = (event) => {
  this.setState({email: event.target.value });
 }
 render () {
  return (
   <form>
    <input type='text' value={this.state.email} onChange={this.handleChange} />
   </form>
  )
 }
}
```

***

# Aula 4 - Renderizando a UI com dados externos

O render() só é usado para exibir conteúdo, apenas!

Códigos que devem lidar com requisições Ajax, requisição HTTP, recuperar dados devem estar no ciclo de vida (lifecycle events)

## Lifecycle Events

**componentWillMount()** - invocado imediatamente antes do componente ser inserido no DOM

**componentDidMount()** - invocado imediatamente depois do componente ser inserido no DOM

**componentWillUnmount()** - invocado imediatamente antes do componente ser removido do DOM

**componentWillReceiveProps()** - invocado sempre que o componente está prestes a receber novas props

Em qual método do ciclo de vida você deveria realizar requisições Ajax ou de APIs? RE: componentDidMount

Cada um é executado em um momento diferente, mas podemos separá-los em três categorias:

### Adicionando ao DOM

- constructor()
- componentWillMount()
- render()
- componentDidMount()

### Renderizando novamente

- componentWillReceiveProps()
- shouldComponentUpdate()
- componentWillUpdate()
- render()
- componentDidUpdate()

### Removendo do DO

- componentWillUnmount()

![LifeCycle](https://d17h27t6h515a5.cloudfront.net/topher/2017/August/598b5e5f_nd019-c1-l4-lifecycle-events/nd019-c1-l4-lifecycle-events.png)

***

# Aula 5 - Gerenciando a localização na aplicação com o React Router

SPA, single-page applicatiions - Aplicações de página única.

O React Router transforma projetos React em aplicações single-page

```dash
npm install --save react-router-dom
```

## BrowserRouter

Vai ouvir as mudanças no URL, quando as mudanças acontecerem, ele faz a tela certa aparecer.

Você precisa envolver todo o seu aplicativo em um componente BrowserRouter:

```javascript
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
 <BrowserRouter><App /><BrowserRouter>,
 document.getElementById('root')
)
```

## Link

```javascript
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}>
  Courses
</Link>
```

## Route

 é o componente que decidirá quais components serão renderizados com base em cada caminho de URL. Route pega um caminho que corresponde ao URL, então o Route vai renderizar uma IU.

```javascript
<Route exact path='/' render={() => (
    <ListContact
        contact={this.state.contacts}
    />
)}/>

<Route path='/create' component={CreateContact} />
````
