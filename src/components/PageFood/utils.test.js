import { Categories } from '../../fixtures/categories';
import { Fridge } from '../../fixtures/fridge';
import { filterFridge } from './utils';

describe('filterFridge function', () => {
    it('should return an array', () => {
        const result = filterFridge(Fridge, Categories[0]);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should filter fridge down by category', () => {
        const result = filterFridge(Fridge, Categories[0]);
        expect(result).toStrictEqual([Fridge[0], Fridge[1]]);
    });
});
