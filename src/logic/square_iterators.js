
const buildHorizontalIndexIterator = (row) => (
    (size) => (column => row * size + column)
);

const buildVerticalIndexIterator = (column) => (
    (size) => (row => row * size + column)
);

const buildDiagonalIndexIterator = (size) => (
    row => row * size + row
);

const buildBackwardDiagonalIndexIterator = (size) => (
    row => (row + 1) * (size - 1)
);

const iterate = (iteratorBuilder, squares, size, reducerOrConsumer, initialValue) => {
    const iterator = iteratorBuilder(size);
    const entries = new Array(size).fill(0)
        .map((_, index) => iterator(index))
        .map(index => ({ index, value: squares[index] }));
    if (initialValue != undefined) {
        return entries.reduce(reducerOrConsumer, initialValue);
    }
    entries.forEach(reducerOrConsumer);
    return null;
};

export const iterateDiagonal = (squares, size, reducerOrConsumer, initialValue) => {
    return iterate(buildDiagonalIndexIterator, squares, size, reducerOrConsumer, initialValue);
};

export const iterateBackwardDiagonal = (squares, size, reducerOrConsumer, initialValue) => {
    return iterate(buildBackwardDiagonalIndexIterator, squares, size, reducerOrConsumer, initialValue);
};

export const iterateHorizontalFunctionBuilder = (row) => (
    (squares, size, reducerOrConsumer, initialValue) => {
        return iterate(buildHorizontalIndexIterator(row), squares, size, reducerOrConsumer, initialValue);
    }    
);

export const iterateVerticalFunctionBuilder = (column) => (
    (squares, size, reducerOrConsumer, initialValue) => {
        return iterate(buildVerticalIndexIterator(column), squares, size, reducerOrConsumer, initialValue);
    }
);
