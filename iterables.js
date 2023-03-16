// Iterable interface
/*
    interface Iterable {
        [Symbol.iterator](): Iterator
    }
*/

// Iterator interface
/*
    interface Iterator {
        next(): IteratorResult
    }
*/

// IteratorResult interface
/*
    interface IteratorResult {
        next(): { done: boolean, value: any }
    }
*/


// Create an iterable of arguments passed to a function

function iterateOver ( ...args ) {
    let i = 0;
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    if ( i < args.length ) return { value: args[i++] };
                    else return { done: true };
                }
            }
        }
    }
}

// Iterators that are Iterable

function iterateOver1 ( ...args ) {
    let i = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if ( i < args.length ) return { value: args[i++] };
            else return { done: true };
        }
    }
}

const itr = iterateOver("a", "b", "c", "d");

for ( const a of itr ) {
    console.log("first", a);
    break;
}

for ( const a of itr ) {
    console.log("second", a);
}

// Zip n iterables into an iterable of n tuples

function zip ( ...iterables ) {
    const iterators = iterables.map(itrb => itrb[Symbol.iterator]());
    let isDone = false;
    return {
        [Symbol.iterator] () {
            return this;
        },
        next() {
            if ( !isDone ) {
                const arr = [];
                iterators.forEach(( itr ) => {
                    const { value } = itr.next();
                    if ( value ) {
                        arr.push(value);
                    } else {
                        isDone = true;
                        return;
                    }
                });
                if ( isDone ) {
                    iterators.forEach(( itr ) => {
                        itr.return();
                    });
                    return { done: true };
                } else {
                    return { value: arr };
                }
            } else {
                return { done: true };
            }
        }
    };
}

const zipped = zip(['a', 'b', 'c'], ['d', 'e', 'f', 'g']);
for (const x of zipped) {
    console.log(x);
}