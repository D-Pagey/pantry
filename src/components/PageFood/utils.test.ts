import { addDays } from 'date-fns';
import { TenantAlexa, TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';
import { FoodType, BatchType, TenantType } from '../../types';
import { sortByName, sortByOldestExpiryDate, getOwnersButtonText } from './utils';

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

const TenantToni: TenantType = {
    ...TenantHeidi,
    name: 'Toni Lyle',
    uid: 'TenantToniUID'
};

describe('getOwnersButtonText function', () => {
    it.each`
        num    | selectedOwnersIds                                                  | expectedText
        ${'1'} | ${[TenantDan.uid]}                                                 | ${"Dan's food"}
        ${'2'} | ${[TenantDan.uid, TenantHeidi.uid]}                                | ${"Dan's + Heidi's"}
        ${'3'} | ${[TenantDan.uid, TenantHeidi.uid, TenantJoe.uid]}                 | ${"Dan's, Heidi's + Joe's food"}
        ${'3'} | ${[TenantDan.uid, TenantHeidi.uid, TenantJoe.uid]}                 | ${"Dan's, Heidi's + Joe's food"}
        ${'4'} | ${[TenantDan.uid, TenantHeidi.uid, TenantJoe.uid, TenantToni.uid]} | ${"Dan's, Heidi's, Joe's + Toni's food"}
    `('should return correct format for $num selected owners', ({ selectedOwnersIds, expectedText }) => {
        const tenants = [TenantDan, TenantHeidi, TenantJoe, TenantToni, TenantAlexa];

        const text = getOwnersButtonText(selectedOwnersIds, tenants);
        expect(text).toBe(expectedText);
    });
});
