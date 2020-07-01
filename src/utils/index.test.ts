import { addDays } from 'date-fns';

import { colours } from '../tokens';
import { FreshBatch, Fridge, ExpiringSoonBatch, ExpiredBatch } from '../fixtures';
import { FoodType } from '../types';
import {
    getPercentageFromDate,
    getColourFromDate,
    getFridgeNameOptions,
    getExpiringItems,
    filterFridgeByCategory
} from '.';

describe('getPercentageFromDate function', () => {
    it.each`
        date                       | percentage
        ${addDays(new Date(), -1)} | ${100}
        ${new Date()}              | ${10}
        ${addDays(new Date(), 1)}  | ${10}
        ${addDays(new Date(), 2)}  | ${20}
        ${addDays(new Date(), 3)}  | ${40}
        ${addDays(new Date(), 4)}  | ${60}
        ${addDays(new Date(), 5)}  | ${80}
        ${addDays(new Date(), 6)}  | ${100}
    `('return $percentage% for $date', ({ percentage, date }) => {
        const result = getPercentageFromDate(date);

        expect(result).toBe(percentage);
    });
});

describe('getColourFromDate function', () => {
    it.each`
        date                       | colour
        ${addDays(new Date(), -1)} | ${colours.grey}
        ${new Date()}              | ${colours.red}
        ${addDays(new Date(), 1)}  | ${colours.red}
        ${addDays(new Date(), 2)}  | ${colours.red}
        ${addDays(new Date(), 3)}  | ${colours.orange}
        ${addDays(new Date(), 4)}  | ${colours.orange}
        ${addDays(new Date(), 5)}  | ${colours.darkGreen100}
        ${addDays(new Date(), 6)}  | ${colours.darkGreen100}
    `('return $colour for $date', ({ colour, date }) => {
        const result = getColourFromDate(date);

        expect(result).toBe(colour);
    });
});

describe('getFridgeNameOptions function', () => {
    it('should return an array of objects of labels and values', () => {
        const options = getFridgeNameOptions(Fridge.map((item) => item.name));
        expect(options).toStrictEqual([
            { label: 'Carrot', value: 'carrot' },
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
                name: 'carrot'
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
