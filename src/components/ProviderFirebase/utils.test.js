import { countCategories, extractAllCategoryIds, updateCategoriesObject } from './utils';
import { CategoriesObject, Fridge } from '../../fixtures';

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

describe('extractAllCategoryIds function', () => {
    it('should return an array', () => {
        const result = extractAllCategoryIds(Fridge);

        expect(Array.isArray(result)).toBe(true);
    });

    it('should return all of the category ids in the fridge', () => {
        const result = extractAllCategoryIds(Fridge);

        expect(result).toStrictEqual(['111', '111', '222', '111', '333']);
    });
});

describe('countCategories function', () => {
    it('should return an array', () => {
        const allIds = ['111', '111', '222', '111', '333'];
        const result = countCategories(allIds, CategoriesObject);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(false);
    });

    it('should return categories with correct counts', () => {
        const allIds = ['111', '111', '222', '111', '333'];
        const result = countCategories(allIds, CategoriesObject);

        expect(result).toStrictEqual({
            '111': {
                colour: 'red',
                count: 3,
                id: '111',
                name: 'meat'
            },
            '222': {
                colour: 'blue',
                count: 1,
                id: '222',
                name: 'fish'
            },
            '333': {
                colour: 'green',
                count: 1,
                id: '333',
                name: 'vegetables'
            }
        });
    });
});
