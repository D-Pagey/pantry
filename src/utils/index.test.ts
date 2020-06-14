import { addDays } from 'date-fns';
import { colours } from '../tokens';
import { Fridge } from '../fixtures';
import { chooseDateColour, getFridgeNameOptions  } from '.';

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

describe('getFridgeNameOptions function', () => {
    it('should return an array of objects of labels and values', () => {
        const options = getFridgeNameOptions(Fridge.map(item => item.name));
        expect(options).toStrictEqual([
            { label: 'Carrots', value: 'carrots' },
            { label: 'Broccoli', value: 'broccoli' },
            { label: 'Steak', value: 'steak' },
            { label: 'Milk', value: 'milk' }
        ]);
    });
});
