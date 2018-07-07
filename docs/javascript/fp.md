?> **Book:** Beginning Functional JavaScript (by Anto Aravinth)

Most of the benefits of Functional programming come from writing Pure Functions.

## Function vs Methods

Simply put, a **Function** is a piece of code that can be called by its name. It can be pass arguments and return values.

```js
var simple = (a) => {return a} // A simple function
simple(5) //called by its name
```

However, **Methods** is a piece of code that must be called by its name along with its associated object name.

```js
var obj = {simple : (a) => {return a} }
obj.simple(5) //called by its name along with its associated object
```

---

## Imperative, Declarative, Abstraction

Functional programming is also about being declarative and writing abstracted code.

**Imperative programming** is all about telling the compiler “how” to do the things.

```
const array = [1,2,3]
for(const i=0; i<array.length; i++) console.log(array[i])
```

**Declarative programming**, we are going to tell “what” the compiler needs to do rather than the “how” parts. The “how” parts are being abstracted into common functions (these functions are called as Higher-Order functions

```
const array = [1,2,3]
array.forEach((element) => console.log(element))
```

---

## Pure Fuctions

Pure functions are the functions that return **the same output** for the given input. Functions that are not pure have side effects. Pure Function also shouldn’t mutate any external environment variables.

Developers spend most of their time in reading others’ code. Having a function with side effects in your code base is hard to read for other developers in your team.

```
const double = (value) => value * 2;
double(5) // 10
// the same output (10) for the given input (5), always! easy to test!
```

---

## Terminologies:

- **unary Function**: `const identity = (x) => x;` takes only **one** argument: x.
- **binary Function**: `const sum = (x,y) => x + y;;` takes only **two** arguments: x and y.
- **ternary functions**: `const sum = (x,y,z) => x + y + z;` takes only **three** argument x, y and z.
- and so on...
- But JavaScript does allow a special type of function that we call a **variadic function**:  `const sum = (...args) => console.log(args)`.

- **closure function**: The function inner is called a closure function.

```js
function outer(x) {
    function inner() {...} // <-- closures
}
```
---

## Techniques

### CACHABLE

Since the pure function is going to always return the same output for the given input, we can cache the function outputs.

```js
const complexCalculation = (x) => { ... }
const complexCalculationBookKeeper = {}

complexCalculationBookKeeper.hasOwnProperty(420)
    ? complexCalculationBookKeeper[420]
    : complexCalculationBookKeeper[420] = complexCalculation(420)
```

Did you see how easily we have made the function calls cachable by using less code? That’s the power of pure functions!

### HIGHER-ORDER FUNCTIONS

A Higher-Order Function is a function that receives the function as its argument and/or returns them as outputs. HOCs are written usually to abstract the common problems.

```js
const times = (times, fn) => {
  for (var i = 0; i < times; i++) fn(i);
}

// ---------
// Example |
// ---------
times(10, (i) => console.log(i))
```

### HIGHER-ORDER FUNCTIONS & CLOSURES

Conceito:

```js
var fn = (arg) => {
    let innerFn = () => {
        console.log(arg)
    }
    return innerFn
}

var closureFn = fn(5) // output: innerFn <function>
closureFn() // output: 5
```

Case Use:

* Unary

```js
const unary = (fn) => fn.length === 1 ? fn : (arg) => fn(arg)

// -----------
// Example 1 |
// -----------
unary(() => console.log('x'))() // output: x
unary((arg) => console.log(arg))('Hello') // output: Hello

// -----------
// Example 2 |
// -----------
unary(parseInt)('3') // will be 3

// -----------
// Example 3 |
// -----------
['1', '2', '3'].map(unary(parseInt)) // will be: [1, 2, 3]
```

* Once (util)

```js
const once = (fn) => {
  let done = false;

  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments))
  }
}

// ---------
// Example |
// ---------
const myFn = once(() => console.log('done'))
myFn() // 'done'
myFn() // undefined
```

* Map (util)

```js
const map = (array, fn) => {
    let results = [];
    for (const [index, value] of array.entries())
        results.push(fn(value, index, array))
    return results;
};
```

* Filter (util)

```js
const filter = (array, fn) => {
    const results = [];
    for (const [index, value] of array.entries())
        (fn(value, index, array)) ? results.push(value) : undefined
    return results;
};
```

* ForEachObject (util)

```js
const forEachObject = (obj, fn) => {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            //calls the fn with key and value as its argument
            fn(property, obj[property])
        }
    }
}

// ---------
// Example |
// ---------
const obj = {x: 'X', y: 'y'}
forEachObject(obj, ((key, value) => console.log(value)))
```

* Memoize Function

The memoize is a special higher-order function that allows the function to remember or memorize its result

```js
const memoized = (fn) => {
    const lookupTable = {};
    return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}

// ---------
// Example |
// ---------
let fastFactorial = memoized((n) => {
    if (n === 0) return 1;
    return n * fastFactorial(n - 1); // Recursion!!
})

fastFactorial(1) // 1
// lookupTable = {0: 1, 1: 1}

fastFactorial(7) // 5040
// lookupTable = {0: 1, 1: 1, 2: 2, 3: 6, 4: 24, 5: 120, 6: 720, 7: 5040}

fastFactorial(5) // 120
// lookupTable = {0: 1, 1: 1, 2: 2, 3: 6, 4: 24, 5: 120, 6: 720, 7: 5040}
```

* Reduction (util)

```js
const reduce = (array, fn, accumlator) => {
    for(const value of array)
        accumlator = fn(accumlator,value)
    return [accumlator]
}

// ---------
// Example |
// ---------
reduce([1,2,3,4,5], (acc, val) => {
    return acc + val
}, 0) // will be 15
```

* ConcatAll or Fatten (util)

```js
const concatAll = (array) => {
    let results = []
    for(const value of array)
        results.push.apply(results, value);
    return results;
}

// ---------
// Example |
// ---------
const apressBooks = [
    {id: 1, type: 'beginners', bookDetails: [
        {title: "C# 6.0", rating: 2},
        {title: 'React 16', rating: 5},
    ]},
    {id: 1, type: 'intermediate', bookDetails: [
        {title: "Master React", rating: 2},
        {title: 'FP Javascript', rating: 4.6},
    ]}
]

concatAll(apressBooks.map(book => book.details)
/**[
    { title: 'C# 6.0', rating: 2 },​​​​​
    ​​​​​{ title: 'React 16', rating: 5 },​​​​​
    ​​​​​{ title: 'Master React', rating: 2 },​​​​​
    ​​​​​{ title: 'FP Javascript', rating: 4.6 }
]​​​​*/
```

### CURRYING

Currying is a process of converting a function with **n** number of arguments into a nested *unary function*.

```js
const addCurried = (x) => {
    return (y) => { // <--- closure concept
        x + y;
    }
}

// ---------
// Example |
// ---------
addCurried(4)(4) // output: 8
```

```js
const curry = (fn) => {
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }
    return function curriedFn(...args) {
        return fn.apply(null, args);
    };
};

// --------
// Example
// --------
const multiply = (x,y,z) => x * y * z;
curry(multiply)(1,2,3) // output: 6
```

```js
const curryN = (fn) => {
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }
    return function curriedFn(...args) {
        if(args.length < fn.length){
            return function (){
                return curriedFn.apply(null, args.concat( [].slice.call(arguments) ));
            };
        }
        return fn.apply(null, args);
    };
};

// ---------
// Example |
// ---------
const loggerHelper = (mode,initialMessage,errorMessage,lineNo) => {
    if(mode === "DEBUG") console.debug(initialMessage,errorMessage + "at line: " + lineNo)
    else if(mode === "ERROR") console.error(initialMessage,errorMessage + "at line: " + lineNo)
    else if(mode === "WARN") console.warn(initialMessage,errorMessage + "at line: " + lineNo)
    else throw "Wrong mode"
}

let errorLogger = curryN(loggerHelper)("ERROR")("Error At Stats.js");
let debugLogger = curryN(loggerHelper)("DEBUG")("Debug At Stats.js");
let warnLogger  = curry(loggerHelper)("WARN")("Warn At Stats.js")
errorLogger("Invalid argument passed", 23)
```

### PARTIAL APPLICATION

```js
const partial = function (fn,...partialArgs){
    let args = partialArgs;
    return function(...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                // !! 'undefined' is our key !!
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    };
};

// ---------
// Example |
// ---------
const prettyPrintJson = partial(JSON.stringify, undefined, null, 4)
prettyPrintJson({foo: "bar", bar: "foo"})
```

### COMPOSITION AND PIPELINES

* Compose Unitary Function

```js
const compose = (a, b) => (c) => a(b(c))

let number = compose(Math.round,parseFloat)
let number = (c) => Math.round(parseFloat(c)) // anoter way

// ---------
// Example |
// ---------
let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;

const countWords = compose(count,splitIntoSpaces);
countWords("hello your reading about composition") // output: old
```

* Compose Many Function

```js
const composeN = (...fns) => (value) =>
    reduce(fns.reverse(),(acc, fn) => fn(acc), value);

// ---------
// Example |
// ---------
let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd"

const oddOrEvenWords = compose(oddOrEven,count,splitIntoSpaces);
oddOrEvenWords("hello your reading about composition") // output: old
```

* Pipelines / Sequences

```js
const pipe = (...fns) => (value) =>
    reduce(fns,(acc, fn) => fn(acc), value);

// ---------
// Example |
// ---------
let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd"

const oddOrEvenWords = pipe(splitIntoSpaces, count, oddOrEven);
oddOrEvenWords("hello your reading about composition"); // old
```

## FUNCTOR

the Functor is nothing but a Container that can hold the value, let’s revisit the definition of Functor.

```js
cont Container = function(val) {
    this.value = val
}

Container.of = function(val) {
    return new Container(value)
}

Container.of('val')
```

But wait! It looks like Functor needs to implement a method called map. Let’s implement that...

```js
Container.prototype.map = function(fn){
    return Container.of(fn(this.value));
}

// ---------
// Example |
// ---------
let double = (x) => x + x;
Container.of(3).map(double) // Container { value: 6 }
```

* Maybe Functor

```js
const MayBe = function(val) {
    this.value = val;
}

MayBe.of = function(val) {
    return new MayBe(val);
}

MayBe.prototype.isNothing = function() {
    return (this.value === null || this.value === undefined);
};

MayBe.prototype.map = function(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

// ---------
// Example |
// ---------
MayBe.of("string").map((x) => x.toUpperCase()) // MayBe { value: 'STRING' }

MayBe.of(null).map((x) => x.toUpperCase()) // MayBe { value: null }

// We don't need to handle inside the function, like this way:
MayBe.of("string").map((x) => {
    return x === null || x === undefined ? null : x.toUpperCase()
})
```

* Either Functor


```js
const Nothing = function(val) {
    this.value = val;
};
Nothing.of = function(val) {
    return new Nothing(val);
};
Nothing.prototype.map = function(f) {
    return this;
};

const Some = function(val) {
    this.value = val;
};
Some.of = function(val) {
    return new Some(val);
};
Some.prototype.map = function(fn) {
    return Some.of(fn(this.value));
}

const Either = {
    Some : Some,
    Nothing: Nothing
}

// ---------
// Example |
// ---------
const getPosts = () => {
    try {
        response = Some.of('dummy data via ajax')
    } catch (erro) {
        response = Nothing.of({ errorCorde: 500 })
    }
    return response
}

const posts = Maybe.of(getPosts)
    .map(response => response.data)
    .map(response => response.list)
```