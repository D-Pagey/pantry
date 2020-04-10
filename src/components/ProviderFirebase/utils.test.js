import { indexOfLabel, updateCategoriesObject } from './utils';

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
