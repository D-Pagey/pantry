import { checkIndex, countCategories } from './utils';

describe('checkIndex function', () => {
    it('should return a number', () => {
        expect(typeof checkIndex([{ category: 'fish', count: 2 }], 'fish')).toBe('number');
    });

    it('should return the index of a label', () => {
        const array = [
            {
                category: 'fish',
                count: 2
            },
            {
                category: 'meat',
                count: 3
            },
            {
                category: 'vegetables',
                count: 1
            }
        ];

        expect(checkIndex(array, 'fish')).toBe(0);
        expect(checkIndex(array, 'meat')).toBe(1);
        expect(checkIndex(array, 'vegetables')).toBe(2);
        expect(checkIndex(array, 'dairy')).toBe(-1);
    });
});

describe('countCategories function', () => {
    it('should return an array', () => {
        expect(Array.isArray(countCategories(['meat']))).toBe(true);
    });

    it('should consolidate items', () => {
        expect(countCategories(['meat', 'fish', 'meat', 'meat']).length).toBe(3);
        expect(countCategories(['fish', 'fish', 'fish']).length).toBe(2);
        expect(countCategories(['fish', 'meat', 'vegetables']).length).toBe(4);
    });

    it('should increment count if category already exists', () => {
        expect(countCategories(['meat', 'meat', 'meat'])).toStrictEqual([
            { category: 'meat', count: 3 },
            { category: 'all', count: 3 }
        ]);

        expect(
            countCategories([
                'meat',
                'fish',
                'fish',
                'vegetables',
                'vegetables',
                'vegetables',
                'vegetables'
            ])
        ).toStrictEqual([
            { category: 'meat', count: 1 },
            { category: 'fish', count: 2 },
            { category: 'vegetables', count: 4 },
            { category: 'all', count: 7 }
        ]);
    });
});
