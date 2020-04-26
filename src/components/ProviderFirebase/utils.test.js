import { addWeeks } from 'date-fns'; 
import { CategoriesObject, Fridge } from '../../fixtures';
import { countCategories, countCategoryIds, updateCategoriesObject, calculateExpiring } from './utils';

const categories = [
    {
        name: 'meat',
        colour: 'red',
        id: 'ddd',
        count: 0,
        label: 'meat',
        value: 'meat'
    },
    {
        name: 'fish',
        colour: 'blue',
        id: 'eee',
        count: 0,
        label: 'fish',
        value: 'fish'
    }
];

describe('updateCategoriesObject function', () => {
    it('should return an object', () => {
        const result = updateCategoriesObject(categories);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
    });

    it('should handle adding a new category', () => {
        const result = updateCategoriesObject(categories);

        expect(result).toStrictEqual({
            'categories.ddd': {
                colour: 'red',
                id: 'ddd',
                name: 'meat'
            },
            'categories.eee': {
                colour: 'blue',
                id: 'eee',
                name: 'fish'
            }
        });
    });
});

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

    it('should return an array', () => {
        const result = calculateExpiring(Fridge, expiringId);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(true);
    });

    it('should add an expiringID to categories if expiring soon', () => {
        const fridgeWithExpiring = [
            {
                categories: ['abc'],
                expires: new Date(),
                id: 'x',
                name: 'Chicken',
                servings: 1
            }
        ];

        const result = calculateExpiring(fridgeWithExpiring, expiringId);

        expect(result[0].categories).toStrictEqual([...fridgeWithExpiring[0].categories, expiringId]);
    });

    it('should not have an expiringID to categories if not expiring soon', () => {
        const fridgeWithExpiring = [
            {
                categories: ['abc'],
                expires: addWeeks(new Date(), 1),
                id: 'x',
                name: 'Chicken',
                servings: 1
            }
        ];

        const result = calculateExpiring(fridgeWithExpiring, expiringId);

        expect(result[0].categories).toStrictEqual(fridgeWithExpiring[0].categories);
    });
});
