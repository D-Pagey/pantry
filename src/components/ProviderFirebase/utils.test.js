import { extractAllCategoryIds, updateCategoriesObject } from './utils';
import { Fridge } from '../../fixtures';

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

// describe.only('updateCategoriesCount function', () => {
//     it('should return an array', () => {
//         const result = updateCategoriesCount(Fridge, Categories);

//         expect(Array.isArray(result)).toBe(true);
//     });

//     it.only('should return an array of categories with counts', () => {
//         const allIds = fridge.reduce((acc, curr) => {
//           curr.categories.map(id => {
//             if ()
//           })
//         }, []);

//         const result = updateCategoriesCount(Fridge, Categories);

//         expect(result).toStrictEqual([
//             { colour: 'red', id: '111', name: 'meat', count: 3 },
//             { colour: 'blue', id: '222', name: 'fish', count: 1 },
//             { colour: 'green', id: '333', name: 'vegetables', count: 1 },
//             { colour: 'pink', id: '444', name: 'snacks', count: 0 }
//         ]);
//     });
// });
