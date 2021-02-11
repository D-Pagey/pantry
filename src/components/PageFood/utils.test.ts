import { addDays } from 'date-fns';
import { TenantAlexa, TenantDan, TenantHeidi, TenantJoe } from '../../fixtures';
import { FoodType, BatchType, TenantType } from '../../types';
import { FilterState } from '../MobileFoodMenu/filterReducer';
import { applyMultipleFilters, sortByName, sortByOldestExpiryDate, getOwnersButtonText } from './utils';

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

const defaultFilters: FilterState = {
    selectedOwners: [],
    showOnlyExpiring: false,
    sortBy: 'name',
    category: ''
};

const ExpiringZebra: FoodType = {
    name: 'zebra',
    category: 'meat',
    unit: 'servings',
    batches: [
        {
            expires: new Date(),
            quantity: 2,
            id: 'asdadsadsda',
            ownerId: TenantDan.uid
        }
    ]
};

const FreshApple: FoodType = {
    name: 'apple',
    category: 'fruit',
    unit: 'units',
    batches: [
        {
            expires: addDays(new Date(), 5),
            quantity: 3,
            id: 'asdadsadsda',
            ownerId: TenantHeidi.uid
        }
    ]
};

const AverageCarrot: FoodType = {
    name: 'carrot',
    category: 'vegetables',
    unit: 'units',
    batches: [
        {
            expires: addDays(new Date(), 4),
            quantity: 5,
            id: 'asdadsadsda',
            ownerId: TenantJoe.uid
        }
    ]
};

describe('applyMultipleFilters function', () => {
    it('should filter out items without batches', () => {
        const foodWithoutBatches = [FreshApple, ExpiringZebra, { ...AverageCarrot, batches: [] }];

        const filtered = applyMultipleFilters(foodWithoutBatches, defaultFilters);

        expect(filtered.length).toBe(foodWithoutBatches.length - 1);
    });

    it('should sort by name', () => {
        const filters: FilterState = {
            ...defaultFilters,
            sortBy: 'name'
        };

        const sortedByName = applyMultipleFilters([ExpiringZebra, FreshApple, AverageCarrot], filters);

        const sortedItemsByName = [FreshApple, AverageCarrot, ExpiringZebra];

        expect(sortedByName).toStrictEqual(sortedItemsByName);
    });

    it('should sort by date', () => {
        const filters: FilterState = {
            ...defaultFilters,
            sortBy: 'date'
        };

        const sortedByName = applyMultipleFilters([AverageCarrot, FreshApple, ExpiringZebra], filters);

        const sortedItemsByName = [ExpiringZebra, AverageCarrot, FreshApple];

        expect(sortedByName).toStrictEqual(sortedItemsByName);
    });

    it('should not filter by owner if no expiring, no selected owners and items with batches', () => {
        const filters: FilterState = {
            ...defaultFilters,
            showOnlyExpiring: false,
            selectedOwners: []
        };

        const food = [AverageCarrot, FreshApple, ExpiringZebra];

        const notFiltered = applyMultipleFilters(food, filters);

        expect(notFiltered.length).toBe(food.length);
    });

    it('should filter by owner if passed selected owners', () => {
        const filters: FilterState = {
            ...defaultFilters,
            showOnlyExpiring: false,
            selectedOwners: [TenantDan.uid]
        };

        const food = [AverageCarrot, FreshApple, ExpiringZebra];

        const notFiltered = applyMultipleFilters(food, filters);

        expect(notFiltered.length).toBe(1);
    });

    it('should not filter by expiring if passed showOnlyExpiring = false', () => {
        const filters: FilterState = {
            ...defaultFilters,
            showOnlyExpiring: false,
            selectedOwners: []
        };

        const food = [AverageCarrot, FreshApple, ExpiringZebra];

        const notFiltered = applyMultipleFilters(food, filters);

        expect(notFiltered.length).toBe(food.length);
    });

    it('should filter by expiring if passed showOnlyExpiring', () => {
        const filters: FilterState = {
            ...defaultFilters,
            showOnlyExpiring: true,
            selectedOwners: []
        };

        const food = [AverageCarrot, FreshApple, ExpiringZebra];

        const filtered = applyMultipleFilters(food, filters);

        expect(filtered).toStrictEqual([ExpiringZebra]);
    });
});
