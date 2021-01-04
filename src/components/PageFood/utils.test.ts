import { addDays } from 'date-fns';
import { TenantDan } from '../../fixtures';
import { FoodType, BatchType } from '../../types';
import { sortByName, sortByOldestExpiryDate } from './utils';

export const Batch: BatchType = {
    id: '3333333',
    expires: addDays(new Date(), 5),
    ownerId: TenantDan.uid,
    quantity: 4
};

const ItemOne: FoodType = {
    batches: [{ ...Batch, expires: addDays(new Date(), 5) }],
    category: 'vegetables',
    name: 'radish',
    unit: 'servings'
};

const ItemTwo: FoodType = {
    batches: [
        { ...Batch, expires: addDays(new Date(), 3) },
        { ...Batch, expires: addDays(new Date(), 5) }
    ],
    category: 'meat',
    name: 'bacon',
    unit: 'servings'
};

const ItemThree: FoodType = {
    batches: [
        { ...Batch, expires: addDays(new Date(), 1) },
        { ...Batch, expires: addDays(new Date(), 7) }
    ],
    category: 'dairy',
    name: 'cheese',
    unit: 'servings'
};

const FridgeWithDifferentBatches: FoodType[] = [ItemOne, ItemTwo, ItemThree];

describe('sortByOldestExpiryDate function', () => {
    it('should return sorted values by expiry date', () => {
        const result = sortByOldestExpiryDate(FridgeWithDifferentBatches);

        expect(result).toStrictEqual([ItemThree, ItemTwo, ItemOne]);
    });
});

describe('sortByName function', () => {
    it('should return values in alphabetical order', () => {
        const result = sortByName([ItemOne, ItemTwo, ItemThree]);

        expect(result).toStrictEqual([ItemTwo, ItemThree, ItemOne]);
    });
});
