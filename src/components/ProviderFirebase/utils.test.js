import { indexOfLabel, countCategories } from './utils';

describe('indexOfLabel function', () => {
    it('should return a number', () => {
        expect(typeof indexOfLabel(['fish', 'meat', 'chocolate'], 'fish')).toBe('number');
    });

    it('should return the index of a label', () => {
        const array = ['fish', 'meat', 'vegetables', 'chocolate'];

        expect(indexOfLabel(array, 'fish')).toBe(0);
        expect(indexOfLabel(array, 'meat')).toBe(1);
        expect(indexOfLabel(array, 'vegetables')).toBe(2);
        expect(indexOfLabel(array, 'dairy')).toBe(-1);
        expect(indexOfLabel(array, 'chocolate')).toBe(3);
    });
});

describe('countCategories function', () => {
    it('should return an array', () => {
        expect(Array.isArray(countCategories(['meat']))).toBe(true);
    });

    it('should consolidate items', () => {
        expect(
            countCategories([
                { label: 'meat', colour: 'red' },
                { label: 'fish', colour: 'pink' },
                { label: 'meat', colour: 'red' },
                { label: 'meat', colour: 'red' }
            ]).length
        ).toBe(3);
        expect(
            countCategories([
                { label: 'vegetables', colour: 'green' },
                { label: 'vegetables', colour: 'green' },
                { label: 'vegetables', colour: 'green' }
            ]).length
        ).toBe(2);
        expect(
            countCategories([
                { label: 'fish', colour: 'blue' },
                { label: 'meat', colour: 'red' },
                { label: 'vegetables', colour: 'green' }
            ]).length
        ).toBe(4);
    });

    it('should increment count if category already exists', () => {
        expect(
            countCategories([
                { label: 'meat', colour: 'red' },
                { label: 'meat', colour: 'red' },
                { label: 'meat', colour: 'red' }
            ])
        ).toStrictEqual([
            { label: 'meat', colour: 'red', count: 3 },
            { label: 'all', colour: 'blue', count: 3 }
        ]);

        expect(
            countCategories([
                { label: 'meat', colour: 'red' },
                { label: 'fish', colour: 'purple' },
                { label: 'fish', colour: 'purple' },
                { label: 'vegetables', colour: 'green' },
                { label: 'vegetables', colour: 'green' },
                { label: 'vegetables', colour: 'green' },
                { label: 'vegetables', colour: 'green' }
            ])
        ).toStrictEqual([
            { label: 'meat', colour: 'red', count: 1 },
            { label: 'fish', colour: 'purple', count: 2 },
            { label: 'vegetables', colour: 'green', count: 4 },
            { label: 'all', colour: 'blue', count: 7 }
        ]);
    });
});
