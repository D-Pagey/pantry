import { updateCategoriesObject } from './utils';

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
          name: 'meat',
        },
        'categories.eee': {
          colour: 'blue',
          id: 'eee',
          name: 'fish',
        }
      });
    });
});
