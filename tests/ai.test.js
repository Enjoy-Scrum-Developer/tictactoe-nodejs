import { Ai } from '../src/logic/ai';
import { GameState, MARK_O, MARK_X } from '../src/logic/game_state';

jest.mock('../src/logic/random_picker', () => ({
    randomPick: jest.fn().mockReturnValue(7),
}));

describe('AI', () => {
    it('should return random move at level 0', () => {
        const state = new GameState(3);
        const ai = new Ai(state);
        state.markSquare(1, MARK_X);
        state.markSquare(2, MARK_O);
        state.markSquare(3, MARK_X);
        const move = ai.nextMove(0);
        expect(move).toBe(7);
    });

    it('should return winning move at level 0', () => {
        const state = new GameState(3);
        const ai = new Ai(state);
        state.markSquare(5, MARK_X);
        state.markSquare(2, MARK_O);
        state.markSquare(1, MARK_X);
        state.markSquare(9, MARK_O);
        state.markSquare(3, MARK_X);
        state.markSquare(8, MARK_O);
        state.markSquare(3, MARK_X);
        const move = ai.nextMove(0);
        expect(move).toBe(7);
    });
    
    it('should return best move at level 2 start', () => {
        const state = new GameState(3);
        const ai = new Ai(state);
        const move = ai.nextMove(2);
        expect(move).toBe(5);
    });

    it('should return best move at level 2 midgame', () => {
        const state = new GameState(3);
        const ai = new Ai(state);
        state.markSquare(5, MARK_X);
        state.markSquare(1, MARK_O);
        const move = ai.nextMove(2);
        expect(move).toBe(7);
    });
});
