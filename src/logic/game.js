import { showBoard } from '../presentation/board';
import { prompt } from '../presentation/messages';
import { Ai } from './ai';
import { GameState, MARK_O, MARK_X } from './game_state';

const BOARD_SIZE = 3;
const AI_LEVEL = 0; // Lowest AI Level, Highest Level is 2

const askPlayerToMove = async (state) => {
    const input = await prompt(`Enter a number (from 1 to ${(state.size * state.size)}): `);
    state.markSquare(parseInt(input), MARK_X);
    showBoard(state);
};

const askComputerToMove = async (state) => {
    const ai = new Ai(state);
    const no = ai.nextMove(AI_LEVEL);
    state.markSquare(parseInt(no), MARK_O);
    showBoard(state);
};

const run = async () => {
    const state = new GameState(BOARD_SIZE);
    showBoard(state);
    let winner = null;
    while (true) {
        await askPlayerToMove(state);
        winner = state.findWinner();
        if (winner || state.allSquaresMarked()) {
            break;
        }
        await askComputerToMove(state);
        winner = state.findWinner();
        if (winner || state.allSquaresMarked()) {
            break;
        }
    }
};

export default run;
