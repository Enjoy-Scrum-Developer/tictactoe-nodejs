import {
    iterateBackwardDiagonal,
    iterateDiagonal,
    iterateHorizontalFunctionBuilder,
    iterateVerticalFunctionBuilder,
} from './square_iterators';

export const MARK_X = 'X';
export const MARK_O = 'O';
export const BLANK = ' ';

class WinnerFinder {
    constructor(squares, size) {
        this.squares = squares;
        this.size = size;
    }

    find() {
        return this.findWinnerByIterator(iterateDiagonal)
            || this.findWinnerByIterator(iterateBackwardDiagonal)
            || this.findWinnerByIteratorByGroup(iterateHorizontalFunctionBuilder)
            || this.findWinnerByIteratorByGroup(iterateVerticalFunctionBuilder);
    }

    findWinnerByIteratorByGroup(iteratorFunctionBuilder) {
        for (let groupIndex = 0; groupIndex < this.size; groupIndex++) {
            const iteratorFunction = iteratorFunctionBuilder(groupIndex);
            const winningSymbol = this.findWinnerByIterator(iteratorFunction);
            if (winningSymbol) {
                return winningSymbol;
            }
        }
        return null;
    }

    findWinnerByIterator(iteratorFunction) {
        const symbolTally = iteratorFunction(this.squares, this.size, (tally, { value }) => {
            const updatedTally = tally || {};
            updatedTally[value] = (updatedTally[value] || 0) + 1;
            return updatedTally;
        }, {});
        const winningSymbol = Object.entries(symbolTally)
            .filter(entry => entry[0] !== BLANK)
            .filter(entry => entry[1] === this.size)
            .map(entry => entry[0]);
        if (winningSymbol.length == 0) {
            return null;
        }
        return winningSymbol[0];
    }
}

export class GameState {
    constructor(size) {
        this.size = size
        this.squares = new Array(size * size).fill(BLANK);
        this.started = false;
    }

    markSquare(no, symbol) {
        this.started = true;
        const index = no - 1;
        if (this.squares[index] === BLANK) {
            this.squares[index] = symbol;
            return true;
        }
        return false;
    }

    allSquaresMarked() {
        return this.squares.filter(element => element === BLANK).length == 0;
    }

    findWinner() {
        const winnerFinder = new WinnerFinder(this.squares, this.size);
        return winnerFinder.find();
    }

    clone() {
        const state = new GameState(this.size);
        state.squares = [ ...this.squares ];
        state.started = this.started;
        return state;
    }

    get availableMoves() {
        return this.squares.map((value, index) => ({ index, value }))
            .filter(({ value }) => value === BLANK)
            .map(({ index }) => index + 1);
    }
}
