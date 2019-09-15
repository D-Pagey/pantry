import { checkIndex, countCategories } from '.';

describe('checkIndex function', () => {
    it('should return a number', () => {
        expect(typeof checkIndex([{ category: 'Fish' }])).toBe('number');
    });

    it('should return the index of a label', () => {
        const array = [
            {
                category: 'Fish'
            },
            {
                category: 'Meat'
            },
            {
                category: 'Vegetables'
            }
        ];

        expect(checkIndex(array, 'Fish')).toBe(0);
        expect(checkIndex(array, 'Meat')).toBe(1);
        expect(checkIndex(array, 'Vegetables')).toBe(2);
        expect(checkIndex(array, 'Dairy')).toBe(-1);
    });
});

describe('countCategories function', () => {
    it('should return an array', () => {
        expect(Array.isArray(countCategories([{ category: { label: 'Meat' } }]))).toBe(true);
    });

    it('should consolidate items', () => {
        expect(
            countCategories([
                {
                    label: 'Meat',
                    value: 'meat'
                },
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Meat',
                    value: 'meat'
                }
            ]).length
        ).toBe(3);

        expect(
            countCategories([
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Fish',
                    value: 'fish'
                }
            ]).length
        ).toBe(2);

        expect(
            countCategories([
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Meat',
                    value: 'meat'
                },
                {
                    label: 'Vegetables',
                    value: 'vegetables'
                }
            ]).length
        ).toBe(4);
    });

    it('should increment count if category already exists', () => {
        expect(
            countCategories([
                {
                    label: 'Meat',
                    value: 'meat'
                },
                {
                    label: 'Meat',
                    value: 'meat'
                },
                {
                    label: 'Meat',
                    value: 'meat'
                }
            ])
        ).toStrictEqual([{ category: 'Meat', count: 3 }, { category: 'All', count: 3 }]);

        expect(
            countCategories([
                {
                    label: 'Meat',
                    value: 'meat'
                },
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Fish',
                    value: 'fish'
                },
                {
                    label: 'Vegetables',
                    value: 'vegetables'
                },
                {
                    label: 'Vegetables',
                    value: 'vegetables'
                },
                {
                    label: 'Vegetables',
                    value: 'vegetables'
                },
                {
                    label: 'Vegetables',
                    value: 'vegetables'
                }
            ])
        ).toStrictEqual([
            { category: 'Meat', count: 1 },
            { category: 'Fish', count: 2 },
            { category: 'Vegetables', count: 4 },
            { category: 'All', count: 7 }
        ]);
    });
});
