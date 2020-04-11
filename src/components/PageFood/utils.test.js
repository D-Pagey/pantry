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
        expect(result).toStrictEqual([
            {
                categories: ['111'],
                expires: new Date('2019-10-11T23:00:00.000Z'),
                id: '1245',
                name: 'chicken',
                servings: 2
            },
            {
                categories: ['111'],
                expires: new Date('2019-04-08T23:00:00.000Z'),
                id: '9999',
                name: 'steak',
                servings: 1
            }
        ]);
    });
});
