// A generator function on a high level is a function which can be paused and resumed. This 
// function when called returns a generator object which can be used to control the process.

function* genFunc () {
    console.log("A");
    yield 45;
    console.log("B");
}

const gf = genFunc();
console.log(gf.next());
console.log(gf.next());

// Generator functions can play three roles.
// Data producers: They can produce data through yield and go to paused state.
// Data consumers: They can consume data through next and yield via parameter assignment. They 
// wake when data is available.
// Coroutines: They can both produce and consume data.


/*
    Iterable interface

    interface Iterable {
        [Symbol.iterator](): Iterator
    }
*/

/*
    Iterator interface

    interface Iterator {
        next(): IteratorResult
    }
*/

/*
    IteratorResult interface

    interface IteratorResult {
        done: boolean,
        value: any
    }
*/

// Implement object iterable via iterator interface

function objectIterator ( obj ) {

    const keys = Reflect.ownKeys(obj);
    let idx = 0;

    return {
        [Symbol.iterator] () {
            return this;
        },
        next() {
            const val = obj[keys[idx]]
            return {
                value: [keys[idx++], val],
                done: val ? false : true
            }
        }
    };
}

for ( const yu of objectIterator({a: 1, b: 2})) {
    console.log("yu", yu);
}

// Create an iterator on object keys with generator

function* objectEntries ( obj ) {
    const keys = Reflect.ownKeys(obj);

    for ( let i = 0; i < keys.length; i++ ) {
        yield [ keys[i], obj[keys[i]] ];
    }
}

const sampleObj = { key1: "value1", key2: "value2", key3: "value3", key4: "value4" };

for ( const val of objectEntries(sampleObj) ) {
    console.log(val);
}

// yield*
// It is used to recursively call a generator function. The operand of yield* can be any iterable.

function* foo () {
    yield 1;
    yield 2;
    return 9;
}

function* bar () {
    yield 3;
    const val = yield* foo();
    console.log("-------", val);
    yield 4;
    return 8;
}

const bh = bar();
for ( const ui of bh ) {
    console.log("********", ui);
}

// yield* considers the return statement and includes the value. Other constructs e.g. for of loop
// doesn't consider it


// Iterating over a binary tree with generators

class BinaryTree {
    value;
    left;
    right;
    constructor ( value ) {
        this.value = value,
        this.left = null;
        this.right = null;
    }

    *[Symbol.iterator]() {
        yield this.value;
        if ( this.left ) yield* this.left;
        if ( this.right ) yield* this.right;
    }
}

const root = new BinaryTree(1);
const rootLeft = new BinaryTree(2);
const rootRight = new BinaryTree(3);
const rootLeftRight = new BinaryTree(4);
const rootRightLeft = new BinaryTree(5);

root.left = rootLeft;
root.right = rootRight;
rootLeft.right = rootLeftRight;
rootRight.left = rootRightLeft;

for ( const er of root ) {
    console.log("er", er);
}


// Sample coroutine for asynchronous code

function co ( generatorFunction ) {
    const genObj = generatorFunction();
    rec(genObj.next());
    function rec ({ value, done }) {
        if ( !done ) {
            value.then(( resp ) => {
                rec(genObj.next(resp));
            }).catch(( err ) => {
                genObj.throw(err);
            });
        }
    }
}


// Generator function take which takes n number of items from a finite / infinite list

function* take ( itr, n ) {
    let i = 0;
    for ( const u of itr ) {
        if ( i < n ) {
            i++;
            yield u;
        }
        else break;
    }
}


// Write a generator function which gives n natural numbers from a pool of natural numbers.

function* naturalNumbers () {
    for ( n = 1; ; n++ ) {
        yield n;
    }
}

for ( const jk of take(naturalNumbers(), 5) ) {
    console.log("jk", jk);
}

