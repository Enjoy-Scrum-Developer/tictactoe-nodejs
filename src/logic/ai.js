import { randomPick } from '../logic/random_picker';
import { BLANK, MARK_O, MARK_X } from './game_state';
import { iterateBackwardDiagonal, iterateDiagonal, iterateHorizontalFunctionBuilder, iterateVerticalFunctionBuilder } from './square_iterators';

class GameDetails {
    constructor(state, aiSymbol, playerSymbol) {
        this.state = state
        this.aiSymbol = aiSymbol
        this.playerSymbol = playerSymbol
    }
}

class SquareScoresBuilder {
    constructor(game) {
        this.aiSymbol = game.aiSymbol;
        this.playerSymbol = game.playerSymbol;
        this.state = game.state;
        this.size = game.state.size;
        this.scores = new Array(this.size * this.size).fill(0);
    }

    build() {
        this.iterateAndComputeScores(iterateDiagonal);
        this.iterateAndComputeScores(iterateBackwardDiagonal);
        this.iterateAndComputeScoresByGroup(iterateHorizontalFunctionBuilder);
        this.iterateAndComputeScoresByGroup(iterateVerticalFunctionBuilder);
        for (let i = 0; i < this.scores.length; i++) {
            if (this.scores[i] == null) {
                this.scores[i] = 0;
            }
        }
        return this.scores;
    }

    iterateAndComputeScoresByGroup(iteratorFunctionBuilder) {
        for (let groupIndex = 0; groupIndex < this.size; groupIndex++) {
            const iteratorFunction = iteratorFunctionBuilder(groupIndex);
            this.iterateAndComputeScores(iteratorFunction);
        }
    }

    iterateAndComputeScores(iteratorFunction) {
        const { size, state, scores, playerSymbol } = this;
        let playerMarks = 0;
        iteratorFunction(state.squares, size, ({ index, value }) => {
            if (value !== BLANK) {
                scores[index] = null;
            }
            if (value === playerSymbol) {
                playerMarks++;
            }
        });
        if (playerMarks == 0) {
            iteratorFunction(state.squares, size, ({ index }) => {
                scores[index] += 1;
            });
        }
    }
}

export class Ai {
    constructor(state, aiSymbol = MARK_O, playerSymbol = MARK_X) {
        this.state = state;
        this.aiSymbol = aiSymbol;
        this.playerSymbol = playerSymbol;
    }

    nextMove(aiLevel) {
        const game = new GameDetails(this.state, this.aiSymbol, this.playerSymbol);
        return this.compute(aiLevel, game.state.availableMoves, game);
    }

    compute(aiLevel, bestMoves, game) {
        let winningMove = this.findWinningMove(this.state, this.aiSymbol);
        if (winningMove) {
            return winningMove;
        }
        if (aiLevel == 0) {
            return randomPick(bestMoves);
        }
        winningMove = this.findWinningMove(this.state, this.playerSymbol);
        if (winningMove) {
            return winningMove;
        }
        if (aiLevel == 1) {
            return randomPick(bestMoves);       
        }
        return this.findBestMove(game);
    }

    findBestMove(game) {
        const squareScores = new SquareScoresBuilder(game).build();
        const maxScore = squareScores.reduce((result, current) => {
            if (current > result) {
                return current;
            }
            return result;
        }, 0);
        const bestMoves = squareScores.map((value, index) => ({ index, value }))
            .filter(({ value }) => value === maxScore)
            .map(({ index }) => index + 1);
        if (bestMoves.length > 1) {
            return randomPick(bestMoves);
        }
        return bestMoves[0];
    }

    findWinningMove(state, symbol) {
        for (let no of state.availableMoves) {
            const stateCopy = this.state.clone();
            if (stateCopy.markSquare(no, symbol)) {
                if (stateCopy.findWinner() === symbol) {
                    return no;
                }
            }
        }
        return null;
    }
}
