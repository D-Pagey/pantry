import { CategoriesWithCounts } from '../fixtures';
import { formatCategories, getIndexOfId, swapCategoryIdsForValues } from '.';

const arrayOfFoods = [
  {
    category: 'meat',
    date: new Date(),
    expires: 1,
    id: '1234',
    name: 'steak',
  },
  {
    category: 'fish',
    date: new Date(),
    expires: 1,
    id: '5678',
    name: 'salmon',
  },
];

describe('getIndexOfId function', () => {
  it('should return -1 if doesnt exist', () => {
    expect(getIndexOfId('123', arrayOfFoods)).toBe(-1);
  });

  it('should return the index is the id does exist', () => {
    expect(getIndexOfId('1234', arrayOfFoods)).toBe(0);
    expect(getIndexOfId('5678', arrayOfFoods)).toBe(1);
  });
});

describe('formatCategories function', () => {
    it('should not contain a category named expiring', () => {
        const categories = [
            ...CategoriesWithCounts,
            {
                colour: 'black',
                count: 3,
                id: '9898988888',
                name: 'expiring'
            }
        ];


        const result = formatCategories(categories);
        const resultNames = result.map(item => item.name);

        expect(resultNames.includes('expiring')).toBe(false);
    });

    it('should return an array of objects with label and value keys', () => {
        const result = formatCategories(CategoriesWithCounts);

        result.forEach(category => {
            expect(category).toStrictEqual(expect.objectContaining({
                label: category.name,
                value: category.name
            }));
        });
    });
});

describe('swapCategoryIdsForValues function', () => {
    it('should return correct values from provided ids', () => {
        const ids = CategoriesWithCounts.map(category => category.id);

        const result = swapCategoryIdsForValues(ids, CategoriesWithCounts);

        expect(result).toStrictEqual(formatCategories(CategoriesWithCounts));
    });

    it('should return correct value if passed a subsection of ids', () => {
        const ids = ['888', '999'];

        const result = swapCategoryIdsForValues(ids, CategoriesWithCounts);

        expect(result).toStrictEqual([
            {
                colour: 'red',
                count: 2,
                id: '888',
                label: 'meat',
                name: 'meat', 
                value: 'meat'
            }, 
            {
                colour: 'blue',
                count: 0,
                id: '999',
                label: 'fish',
                name: 'fish',
                value: 'fish'
            }]);
    });

    it('should not include an expiring category in the return value', () => {
        const expiringCategory = {
            colour: 'black',
            count: 10,
            id: '76767',
            name: 'expiring'
        };

        const ids = ['888', expiringCategory.id];

        const result = swapCategoryIdsForValues(ids, [...CategoriesWithCounts, expiringCategory]);
        const resultNames = result.map(item => item.name);

        expect(resultNames).toEqual(
            expect.not.arrayContaining(['expiring']),
          );
    });
});