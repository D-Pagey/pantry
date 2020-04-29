import { formatCategories } from './utils';
import { CategoriesWithCounts } from '../../fixtures';

describe('formatCategories function', () => {
    it('should return an array', () => {
        const result = formatCategories(CategoriesWithCounts);

        expect(typeof result).toBe('object');
        expect(Array.isArray(result)).toBe(true);
    });

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