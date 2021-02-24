import { GameState, MARK_O, MARK_X } from '../src/logic/game_state';

describe('Game State', () => {
    it('should return true on all squares marked', () => {
        const state = new GameState(3);
        state.markSquare(1, MARK_X);
        state.markSquare(2, MARK_O);
        state.markSquare(3, MARK_X);
        state.markSquare(4, MARK_O);
        state.markSquare(5, MARK_X);
        state.markSquare(6, MARK_O);
        state.markSquare(7, MARK_O);
        state.markSquare(8, MARK_X);
        state.markSquare(9, MARK_O);
        expect(state.allSquaresMarked()).toBeTruthy();
        expect(state.availableMoves).toEqual([]);
    });

    it('should return false on all squares marked', () => {
        const state = new GameState(3);
        state.markSquare(5, MARK_X);
        expect(state.allSquaresMarked()).toBeFalsy();
        expect(state.availableMoves).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
    });

    it('should return null on find winner', () => {
        const state = new GameState(3);
        state.markSquare(1, MARK_X);
        expect(state.findWinner()).toBeNull();
    });

    it('should return x on find winner diagonal', () => {
        const state = new GameState(3);
        state.markSquare(1, MARK_X);
        state.markSquare(5, MARK_X);
        state.markSquare(9, MARK_X);
        expect(state.findWinner()).toBe(MARK_X);
    });

    it('should return x on find winner backward diagonal', () => {
        const state = new GameState(3);
        state.markSquare(3, MARK_X);
        state.markSquare(5, MARK_X);
        state.markSquare(7, MARK_X);
        expect(state.findWinner()).toBe(MARK_X);
    });

    it('should return o on find winner horizontal top', () => {
        const state = new GameState(3);
        state.markSquare(1, MARK_O);
        state.markSquare(2, MARK_O);
        state.markSquare(3, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });

    it('should return o on find winner horizontal middle', () => {
        const state = new GameState(3);
        state.markSquare(4, MARK_O);
        state.markSquare(5, MARK_O);
        state.markSquare(6, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });

    it('should return o on find winner horizontal bottom', () => {
        const state = new GameState(3);
        state.markSquare(7, MARK_O);
        state.markSquare(8, MARK_O);
        state.markSquare(9, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });

    it('should return o on find winner vertical left', () => {
        const state = new GameState(3);
        state.markSquare(1, MARK_O);
        state.markSquare(4, MARK_O);
        state.markSquare(7, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });

    it('should return o on find winner vertical center', () => {
        const state = new GameState(3);
        state.markSquare(2, MARK_O);
        state.markSquare(5, MARK_O);
        state.markSquare(8, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });

    it('should return o on find winner vertical right', () => {
        const state = new GameState(3);
        state.markSquare(3, MARK_O);
        state.markSquare(6, MARK_O);
        state.markSquare(9, MARK_O);
        expect(state.findWinner()).toBe(MARK_O);
    });
});
