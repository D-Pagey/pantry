import { addWeeks } from 'date-fns';
import { CategoriesObject, Fridge } from '../../fixtures';
import { countCategories, countCategoryIds, calculateExpiring } from './utils';

describe('countCategoryIds function', () => {
    it('should return an object', () => {
        const result = countCategoryIds(Fridge);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
    });

    it('should return all of the category ids with a count', () => {
        const result = countCategoryIds(Fridge);

        expect(result).toStrictEqual({
            '111': 3,
            '222': 1,
            '333': 1
        });
    });
});

describe('countCategories function', () => {
    it('should return an array', () => {
        const result = countCategories(Fridge, CategoriesObject);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(true);
    });

    it('should return categories with correct counts', () => {
        const result = countCategories(Fridge, CategoriesObject);

        expect(result).toStrictEqual([
            {
                colour: 'red',
                count: 3,
                id: '111',
                name: 'meat'
            },
            {
                colour: 'blue',
                count: 1,
                id: '222',
                name: 'fish'
            },
            {
                colour: 'green',
                count: 1,
                id: '333',
                name: 'vegetables'
            },
            {
                colour: 'pink',
                count: 0,
                id: '444',
                name: 'snacks'
            }
        ]);
    });
});

describe('calculatingExpiring function', () => {
    const expiringId = '123';

    it('should return an object', () => {
        const result = calculateExpiring(Fridge, expiringId);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
    });

    it('should add an expiringID to categories if expiring soon', () => {
        const fridge = [
            {
                categories: ['abc'],
                expires: new Date(),
                id: 'x',
                name: 'Chicken',
                servings: 1
            }
        ];

        const { fridgeWithExpiring, count } = calculateExpiring(fridge, expiringId);

        expect(fridgeWithExpiring[0].categories).toStrictEqual([...fridge[0].categories, expiringId]);
        expect(count).toEqual(1);
    });

    it('should not have an expiringID to categories if not expiring soon', () => {
        const fridge = [
            {
                categories: ['abc'],
                expires: addWeeks(new Date(), 1),
                id: 'x',
                name: 'Chicken',
                servings: 1
            }
        ];

        const { fridgeWithExpiring, count } = calculateExpiring(fridge, expiringId);

        expect(fridgeWithExpiring[0].categories).toStrictEqual(fridge[0].categories);
        expect(count).toEqual(0);
    });
});
