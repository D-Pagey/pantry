import { CategoriesArray, Fridge } from '../../fixtures';
import { filterFridge, swapIdsForNames, swapNamesForIds } from './utils';

describe('filterFridge function', () => {
    it('should return an array', () => {
        const result = filterFridge(Fridge, CategoriesArray[0]);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should filter fridge down by category', () => {
        const result = filterFridge(Fridge, CategoriesArray[0]);
        expect(result).toStrictEqual([Fridge[0], Fridge[1], Fridge[3]]);
    });
});

describe('swapIdsForNames function', () => {
    it('should return an array', () => {
        const result = swapIdsForNames(Fridge, CategoriesArray);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should return Fridge data with names instead of ids', () => {
        const multipleCategories = {
            categories: ['111', '333'],
            expires: new Date(2019, 3, 9),
            id: '5678',
            name: 'broccoli',
            servings: 1
        };

        const fridge = swapIdsForNames([...Fridge, multipleCategories], CategoriesArray);
        const categoryNames = CategoriesArray.map((category) => category.name);

        fridge.map((food) => {
            return food.categories.map((category) => {
                return expect(categoryNames.includes(category)).toBe(true);
            });
        });
    });
});

describe('swapNamesForIds function', () => {
    it('should return an array', () => {
        const fridgeWithNames = [
            {
                categories: ['meat', 'vegetables'],
                expires: new Date(2019, 3, 9),
                id: '8888',
                name: 'broccoli',
                servings: 1
            },
            {
                categories: ['fish'],
                expires: new Date(2019, 3, 9),
                id: '1111',
                name: 'salmon',
                servings: 1
            }
        ];

        const result = swapNamesForIds(fridgeWithNames, CategoriesArray);
        expect(Array.isArray(result)).toBe(true);
    });

    it('should return Fridge data with ids instead of names', () => {
        const fridgeWithNames = [
            {
                categories: ['meat', 'vegetables'],
                expires: new Date(2019, 3, 9),
                id: '5678',
                name: 'broccoli',
                servings: 1
            },
            {
                categories: ['fish'],
                expires: new Date(2019, 3, 9),
                id: '1111',
                name: 'salmon',
                servings: 1
            }
        ];

        const fridge = swapNamesForIds(fridgeWithNames, CategoriesArray);
        const categoryIds = CategoriesArray.map((category) => category.id);

        fridge.map((food) => {
            return food.categories.map((category) => {
                return expect(categoryIds.includes(category)).toBe(true);
            });
        });
    });
});
