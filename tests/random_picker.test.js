import { randomPick } from '../src/logic/random_picker';

describe('Random Picker', () => {
    it('should return null on null array', () => {
        const item = randomPick(null);
        expect(item).toBeNull();
    });

    it('should return null on empty array', () => {
        const item = randomPick([]);
        expect(item).toBeNull();
    });

    it('should return random item from given array', () => {
        global.Math.random = jest.fn().mockReturnValue(0.4);

        const item = randomPick([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(item).toBe(5);
    });
});
