import { addDays } from 'date-fns';
import { colours } from '../tokens';
import { FreshBatch, Fridge, ExpiringSoonBatch, ExpiredBatch } from '../fixtures';
import { FoodType } from '../types';
import { chooseDateColour, getFridgeNameOptions, getExpiringItems, filterFridgeByCategory } from '.';

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
        const options = getFridgeNameOptions(Fridge.map((item) => item.name));
        expect(options).toStrictEqual([
            { label: 'Carrots', value: 'carrots' },
            { label: 'Broccoli', value: 'broccoli' },
            { label: 'Steak', value: 'steak' },
            { label: 'Milk', value: 'milk' }
        ]);
    });
});

describe('getExpiringItems function', () => {
    it('should return a correct list of food items that are expiring soon', () => {
        const partiallyExpiringFridge: FoodType[] = [
            {
                batches: [ExpiredBatch, ExpiringSoonBatch],
                category: 'vegetables',
                name: 'carrots'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak'
            }
        ];

        const expiringFood = getExpiringItems(partiallyExpiringFridge);
        expect(expiringFood).toStrictEqual([partiallyExpiringFridge[0]]);
    });
});

describe('filterFridgeByCategory function', () => {
    it('should correctly filter', () => {
        const filtered = filterFridgeByCategory(Fridge, 'dairy');
        expect(filtered).toStrictEqual([Fridge[3]]);
    });
}); 