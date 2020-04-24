import { DatabaseCategoryType } from '../../types';
import { countCategories, countCategoryIds, updateCategoriesObject } from './utils';
import { CategoriesObject, Fridge } from '../../fixtures';

const categories: DatabaseCategoryType[] = [
    {
        name: 'meat',
        colour: 'red',
        id: 'ddd',
    },
    {
        name: 'fish',
        colour: 'blue',
        id: 'eee',
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
