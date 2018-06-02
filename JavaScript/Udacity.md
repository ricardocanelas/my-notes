
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


