Javascript Harmony.. ES6... ES2015

# Aula 1 - Sintaxe do ES6

## Loops

**O for loop** (not problem if you want you)

O for loop é óbviamente o loop mais comum existente

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
    // i of the 'i'terator
    console.log(digits[i]);
}
```

**O for...in loop** (don't use it)

O for...in loop reduz as fraquezas do for loop, eliminando a contagem lógica e a condição de saída.

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

O problema é se tiver prototype no Array, pode te colocar em uma enrascada.

```
Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
```

**forEach loop** (only work with Arrays) (don't use it)

o forEach loop é um método de array, então ele só pode ser utilizado por arrays. Também não existe maneira de parar ou interromper um forEach loop. Se você precisa desse tipo de comportamento, terá que usar um for loop básico.

**Loop for...of** (the best)

O for...of loop é utilizado para iterar qualquer tipo de dado que seja um iterable.

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) console.log(digit)
```

## Spread

O operador spread, escrito com 3 pontos consecutivos (`...`)

```
const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = [...fruits, ...vegetables];
console.log(produce);
```

**rest**

[Example](https://www.youtube.com/watch?v=vRtfwfqnVSs)

```
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
```

```
function sum() {
  let total = 0;
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}

// with ...rest
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

# Aula 2 - Funções


## Arrow Function

Arrow functions are only expressions

Examples:

```javascript
const sum = (num1, num2) => {
  return num1 + num2
}

// empty parameter list requires parentheses
const sayHi = () => console.log('Hello Brazilian Student!');

// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');

// This format of the function body is called the "concise body syntax".
const onlySingleLine = () => console.log('concise body syntax');

// This format of the function body is called the "block body syntax".
const onlyMultipleLine = () => {
  console.log('-----------------');
  console.log('block body syntax');
}
```

### This in Array Functions

Check out for more information [here](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)

Example:

```javascript
// constructor
function IceCream() {
  this.scoops = 0;
}

// if you aren't using ES6...
IceCream.prototype.addScoop = function() {
  const cone = this; // sets `this` to the `cone` variable
  setTimeout(function() {
    cone.scoops++; // references the `cone` variable
    console.log('scoop added!');
  }, 0.5);
};

// using ES6
IceCream.prototype.addScoop = function() {
  setTimeout(() => { // an arrow function is passed to setTimeout
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

### Default Function Parameters

```javascript
// not using ES6
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

  return `${greeting} ${name}!`;
}

// using ES6
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

### Defaults and destructuring arrays

```javascript
function createGrid([width = 5, height = 5] = []) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
createGrid(); // Generates a 5 x 5 grid
```

```javascript
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
```

## Class

- Class is just a function
- Class is a mirage over prototypal inheritance
- Using classes requires the use of new

```javascript
class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  static show(iceCreams) {
    for( item of iceCreams) {
      console.log(item.flavor)
    }
  }
}

ice1 = new IceCream('chocolate', 500, ['Chocolate syrup'])
ice1.addTopping('Whipped cream')
ice1.addTopping('Peanuts')

IceCream.show([ice1])

console.log(typeof Dessert); // function
console.log(typeof IceCream); // function

console.log(Dessert instanceof Object); // true
console.log(IceCream instanceof Object); // true

console.log(ice1 instanceof Object); // true
console.log(ice1 instanceof Dessert); // true
console.log(ice1 instanceof IceCream); // true
```

## Subclass

[Example with ES6 and ES5](https://www.youtube.com/watch?v=b8fEBUFk-Oo)

```
class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

The same example with 'normal' javascript

```
function Tree(size, leaves) {
  this.size = (typeof size === "undefined")? 10 : size;
  const defaultLeaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leaves = (typeof leaves === "undefined")?  defaultLeaves : leaves;
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = (typeof syrupQty === "undefined")? 15 : syrupQty;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
```

# Aula 3 - Built-ins

JavaScript Primitive Data Types: numbers; strings, booleans, null, undefined

## Symbol

É um identificador unico.

```
cons sym1 = Symbol('banana')
cons sym2 = Symbol('banana')

sym1 === sym2 // false

const bowl = {
    [Symbol('banana')]: { color: 'yellow', weight: 135.303 },
    [Symbol('banana')]: { color: 'yellow', weight: 112.534 },
}
```

## iterable & iterator

Esses protocolos não são built-ins, ou seja, não são padrão da linguagem, mas ajudarão você a entender o novo conceito de iteração no ES6, assim como mostrarão um caso de uso para symbols.

O protocolo **iterable** é utilizado para definir e personalizar o comportamento de iteração de objetos. Para alguns objetos, esse comportamento é nativo na linguagem, como em strings e arrays (qualquer objeto que é um iterable pode usar o novo loop *for...of*)

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) console.log(digit);
```

Para um objeto ser um iterable, ele deve possuir um método padrão chamado **iterator**.

O método iterator, que está disponível pela constante `[Symbol.iterator]`, é uma função sem argumentos que retorna um objeto iterator.

Como funciona?

Um objeto se torna um iterator quando implementa o método `.next()`. O método não recebe parâmetros e retorna um objeto com duas propriedades (value e done).

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next()); // Object {value: 0, done: false}
console.log(arrayIterator.next()); // Object {value: 1, done: false}
console.log(arrayIterator.next()); // Object {value: 9, done: true}
```

```
const ricardo = {
   name: 'Ricardo',
   height: `5'10"`,
   weight: 185,
   [Symbol.iterator]() {
       var keys = Object.keys(this);
       var i = 0;
       return {
           next: () => {
               const key = keys[i++];
               const value = this[key];
               const done = i >= keys.length;
               return { key, value, done};
           }
       };
   }
};

for(const prop of person) console.log(prop) // "Ricardo"... "5.10"... "185"

// or

let iterator = james[Symbol.iterator]();

console.log(iterator.next()); // 'Ricardo'
console.log(iterator.next()); // `5'10`
console.log(iterator.next()); // 185
```

## Sets

Na matemática, um set (conjunto, na tradução literal) é uma coleção de items diferentes entre si. Por exemplo, `{2, 4, 5, 6}` é um set porque cada número é único e aparece uma só vez. No entanto, `{1, 1, 2, 4}` não é um set, pois contém itens duplicados (o 1 está lá mais de uma vez!).

```
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games);
// Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Mario Kart')
// Set {'Banjo-Kazooie', 'Banjo-Tooie', 'Age of Empires'}

console.log(games.size);
// 3

console.log(games.has('Banjo-Tooie'));
// true

console.log(games.value())
//  O valor retornado pelo método .values() ou keys() é um objeto SetIterator.

games.clear()
console.log(games);
// Set {}
```

SetIterator

```
const months = new Set(['January',..])
const iterator = months.values();
iterator.next(); // Object {value: 'January', done: false}
```

## O que é um WeakSet?

Um WeakSet é como um set normal, mas com algumas diferenças-chave:

- um WeakSet só pode conter objetos
- um WeakSet não é um iterable, o que significa que não é possível iterar por seus itens
- um WeakSet não possui o método .clear()

Por que WeakSets só deveria conter objetos?

Os WeakSets se aproveitam do garbage collection ao trabalhar exclusivamente com objetos. Se você alterar o valor de um objeto para `null, então estará, basicamente, removendo o objeto.

[Example](https://www.youtube.com/watch?v=Z0t-ZaR38ME)

**Maps** are collections of key-value pairs { key1: value1 }. **Sets** are collections of unique values [val1, val2, val3]

Sets::Array
Maps::Objects

## Maps

```
const employees = new Map()

employees.set('ricardocanelas@udacity.com', {
    firstName: 'Ricardo',
    lastName: 'Canelas',
    role: 'Content Developer'
})

employees.delete('julia@udacity.com')

employees.has('julia@udacity.com')

employees.get('ricardocanelas@gmail.com')

employees.clear()
```

**Iterando**

```
// Opcao 1
let iteratorObjForKeys = employees.keys();
iteratorObjForKeys.next();
iteratorObjForKeys.next();

// Opcao 2
for (const employee of employees) {
    const [ key, value ] = employee;
    console.log(key, value, employee);
}

// Opção 3
employees.forEach((value, key) => console.log(value, key));
```

## WeakMap

Exemplo: [Video](https://www.youtube.com/watch?v=sUE_JjiF_q4)

Um WeakMap como um map normal, com algumas pequenas diferenças:

- um WeakMap só pode conter objetos como chaves,
- um WeakMap não é um iterable, o que significa que não é possível executar um loop para varrer seu conteúdo e
- um WeakMap não possui um método .clear().

## Promises

Uma promise em JavaScript é criada com a nova função construtora de Promise - `new Promise()`.

```
const mySundae = new Promise((resolve, reject) => {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {}
        resolve(sundae)
        // or
        // reject(`Sorry, we're out of that flavor.`);
    },2000)
})

mySundae.then(function (data) {
    console.log(data)
}, function (error) {
    console.log(error)
})
```

## Proxies

Em inglês, "proxy" significa "algo que representa outra pessoa".

Em ES6 - Um proxy de Javascript permite que um objeto substitua outro... e lide com todas as interações para esse outro objeto.

Para criar um objeto proxy, usamos o construtor proxy - `new Proxy()`. O construtor de proxy recebe dois parâmetros:

1. um objeto contendo uma lista de métodos que serão utilizados para tratar o acesso aos dados do primeiro objeto.
2. O segundo objeto é chamado de handler.

```
var richard = {status: 'looking for work'};
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
```

```
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
        return target[propName];
    },
    set(target, propName, value) {
        if (propName === 'payRate') { // if the pay is being set, take 15% as commission
            value = value * 0.85;
        }
        target[propName] = value;
    }
};

const agent = new Proxy(richard, handler);
agent.status;
// logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
// (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status

agent.payRate = 1000; // set the actor's pay to $1,000 * 0.85
agent.payRate; // $850 the actor's actual pay
```

Confira [todos os handlers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)

## ES5 Getter and Setter

```
var obj = {
    _age: 5,
    _height: 4,
    get age() {
        console.log(`getting the "age" property`);
        console.log(this._age);
    },
    get height() {
        console.log(`getting the "height" property`);
        console.log(this._height);
    }
};

obj.age; // logs 'getting the "age" property' & 5
obj.height; // logs 'getting the "height" property' & 4
```

## Generators / Funções pausáveis

Se quisermos ter a capacidade de pausar uma função no meio de sua execução, precisaremos de um novo tipo de função presente no ES6 - generator functions! Vamos ver como uma funciona:

```
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log( name );
    }

    console.log('the function has ended');
}
```

Observe o asterisco logo após a palavra function. Esse asterisco indica que a função é um generator!

O asterisco pode ser colocado em qualquer lugar entre a palavra reservada function e o nome da função;

```
function* getEmployee() {} // it's correct
function * getEmployee() {} // it's correct
function *getEmployee() {} // it's correct
```

```
getEmployeer()
```

Quando um generator é invocado, na verdade nenhum código de dentro da função é executado. Na verdade, um iterator é criado e retorna da função. Esse iterator, então, poderá ser utilizado para executar o código interno da função.

```
const generatorIterator = getEmployee();
generatorIterator.next();
/*
the function has started
Amanda
...
Richard
the function has ended
*/
```

Agora, se você tentou executar esse código, percebeu que, na primeira vez que chamamos o método .next() do iterator, todo o código de dentro do generator foi executado. Ou seja, o código nunca pausou! Como podemos conseguir esse efeito mágico de pausa?

A palavra-chave `yield` foi introduzida ao ES6. Ela pode ser utilizada no interior de generator functions e é o que causa a pausa do generator.

```
function* getEmployee() {
    console.log('the function has started');

    const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];

    for (const name of names) {
        console.log(name);
        yield name;
    }

    console.log('the function has ended');
}

const generatorIterator = getEmployee();
let result = generatorIterator.next();
result.value // is "Amanda"

generatorIterator.next().value // is "Diego"
generatorIterator.next().value // is "Farrin"
```

Quantas vezes o método .next() do iterator precisa ser chamado para completar todo o código da generator function udacity abaixo?

```
function* udacity() {
    yield 'Richard';
    yield 'James'
    console.log('...')
    console.log('to the end of the function')
}
```

`3` vezes... a terceira executa o final da função

Uma forma de enviar dados para dentro da função generator

```
function* displayResponse() {
    const response = yield;
    console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // starts running the generator function
iterator.next('Hello Udacity Student'); // send data into the generator
// the line above logs to the console: Your response is "Hello Udacity Student"!
```

Os generators também serão muito utilizados nas próximas adições à linguagem JavaScript. Um recurso que veremos em breve e que fará uso deles são as async functions.

# Aula 4 - Desenvolvedor profissional

## Polyfill

Spackling, no Estados Unidos. Polyfill, uma marca, na Inglaterra. É uma massa usada para preencher buracos, rachaduras ou defeitos nas paredes.

A Javascript file that patches a hole by replicationg some native feature that's missing. Um polyfill é um arquivo de Javascript que preenche um buraco replicando atributos nativos para navegadores que não os possuem.

Exemplo de um polyfill

```
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```

[veja a lista completa](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

## Transpilling

Transpiler vai trasformar uma linguagem X para Y... ou versão da linguagem 10 para 9. Diferentemente de um compilador que vai pegar a linguagem X e transformar em linguagem de maquina. [vídeo explicando melhor](https://www.youtube.com/watch?v=Ku2NATTmgks)

O transpiler JavaScript mais popular é chamado Babel.

[Exemplo](https://github.com/udacity/course-es6/tree/master/lesson-4/walk-through-transpiling) e [video explicando](https://www.youtube.com/watch?v=QGE5Emfg1hI)
