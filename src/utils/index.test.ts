import { addDays } from 'date-fns';
import { colours } from '../tokens';
import { chooseDateColour } from '.';

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
