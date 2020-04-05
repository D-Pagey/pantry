import { addDays } from 'date-fns';
import { calculateExpiringSoon, indexOfLabel, updateCategories } from './utils';

describe('calculateExpiringSoon function', () => {
    const food = [
        {
            categories: ['111', '222'],
            expires: addDays(new Date(), 1),
            id: '1245',
            name: 'chicken',
            servings: 2
        },
        {
            categories: ['111', '222'],
            expires: addDays(new Date(), 5),
            id: '5678',
            name: 'salmon',
            servings: 1
        }
    ];

    it('should return an array', () => {
        expect(Array.isArray(calculateExpiringSoon(food))).toBe(true);
    });

    it('should add an isExpiringSoon property to each food item', () => {
        expect(calculateExpiringSoon(food)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    isExpiringSoon: expect.any(Boolean)
                })
            ])
        );
    });

    it('should return correct values for isExpiringSoon', () => {
        const result = calculateExpiringSoon(food);

        expect(result[0]).toEqual(
            expect.objectContaining({
                isExpiringSoon: true
            })
        );
        expect(result[1]).toEqual(
            expect.objectContaining({
                isExpiringSoon: false
            })
        );
    });
});

// TODO: Delete this, is it needed with new categories?
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

describe.only('updateCategories function', () => {
    const allCategories = [
        {
            colour: 'red',
            count: 0,
            id: '111',
            label: 'Meat',
            value: 'meat'
        },
        {
            colour: 'blue',
            count: 0,
            id: '222',
            label: 'Fish',
            value: 'fish'
        },
        {
            colour: 'green',
            count: 0,
            id: '333',
            label: 'Vegetables',
            value: 'vegetables'
        }
    ];

    const itemCategoryIds = [allCategories[1].id];

    it('should return an array', () => {
        expect(Array.isArray(updateCategories(allCategories, itemCategoryIds))).toBe(true);
    });

    it.only('should increase the count of a category when adding a category', () => {
        const result = updateCategories(allCategories, itemCategoryIds);

        expect(result).toStrictEqual([
            allCategories[0],
            { ...allCategories[1], count: allCategories[1].count + 1 },
            allCategories[2]
        ]);
    });
});
