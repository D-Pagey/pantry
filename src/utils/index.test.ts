import { addDays } from 'date-fns';
import { colours } from '../tokens';
import { CategoriesWithCounts } from '../fixtures';
import { chooseDateColour, formatCategories } from '.';

describe('chooseDateColour function', () => {
    it.each`
        date                      | colour
        ${new Date()}             | ${colours.grey}
        ${addDays(new Date(), 2)} | ${colours.orange}
        ${addDays(new Date(), 5)} | ${colours.darkGreen100}
    `('return $colour for $date', ({ colour, date }) => {
        const result = chooseDateColour(date);

        expect(result).toBe(colour);
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
        const resultNames = result.map((item) => item.name);

        expect(resultNames.includes('expiring')).toBe(false);
    });

    it('should return an array of objects with label and value keys', () => {
        const result = formatCategories(CategoriesWithCounts);

        result.forEach((category) => {
            expect(category).toStrictEqual(
                expect.objectContaining({
                    label: category.name,
                    value: category.name
                })
            );
        });
    });
});
