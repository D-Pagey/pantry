import { addDays } from 'date-fns';

import { colours } from '../tokens';
import { FoodType } from '../types';
import { FreshBatch, Fridge, ExpiringSoonBatch, ExpiredBatch, TenantHeidi, TenantDan, TenantJoe } from '../fixtures';
import {
    checkAndFilterInvalidData,
    checkExistingCategory,
    convertBatchesArray,
    countExpiringFoodItems,
    filterByTenantIds,
    filterFridgeByCategory,
    formatFoodDropdownOptions,
    getCategoriesAndCounts,
    getColourFromDate,
    getExpiringItems,
    getOwnerFromId,
    getPercentageFromDate
} from '.';

const mockToastError = jest.fn();

jest.mock('react-toastify', () => ({
    toast: {
        error: (text: string) => mockToastError(text)
    }
}));

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

describe('formatFoodDropdownOptions function', () => {
    it('should return an array of objects of labels and values', () => {
        const options = formatFoodDropdownOptions(Fridge);
        expect(options).toStrictEqual([
            { label: 'Really Long Food Name for Carrot (7 servings)', value: 'really long food name for carrot' },
            { label: 'Broccoli (7 servings)', value: 'broccoli' },
            { label: 'Steak (7 servings)', value: 'steak' },
            { label: 'Milk (7 carton)', value: 'milk' },
            { label: 'Chocolate (0 servings)', value: 'chocolate' }
        ]);
    });
});

describe('getExpiringItems function', () => {
    it('should return a correct list of food items that are expiring soon', () => {
        const partiallyExpiringFridge: FoodType[] = [
            {
                batches: [ExpiredBatch, ExpiringSoonBatch],
                category: 'vegetables',
                name: 'carrot',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                category: 'meat',
                name: 'steak',
                unit: 'servings'
            }
        ];

        const expiringFood = getExpiringItems(partiallyExpiringFridge);
        expect(expiringFood).toStrictEqual([partiallyExpiringFridge[0]]);
    });
});

describe('filterFridgeByCategory function', () => {
    it('should correctly filter', () => {
        const filtered = filterFridgeByCategory(Fridge, 'meat');
        expect(filtered).toStrictEqual([Fridge[2]]);
    });
});

describe('formatExpiryDates function', () => {
    it.todo('should convert timestamps to dates');
});

describe('countExpiringFoodItems function', () => {
    it('should return the count of 2 with expiring batches', () => {
        const HalfExpiringFridge: FoodType[] = [
            Fridge[0],
            Fridge[1],
            {
                batches: [
                    {
                        id: '22234',
                        expires: addDays(new Date(), 5),
                        ownerId: TenantHeidi.uid,
                        quantity: 1
                    }
                ],
                category: 'dairy',
                name: 'milk',
                unit: 'servings'
            }
        ];

        const count = countExpiringFoodItems(HalfExpiringFridge);
        expect(count).toBe(2);
    });

    it('should return the correct count of 0 with no expiring batches', () => {
        const HalfExpiringFridge: FoodType[] = [
            {
                batches: [
                    {
                        id: '6677676',
                        expires: addDays(new Date(), 5),
                        ownerId: TenantHeidi.uid,
                        quantity: 1
                    }
                ],
                category: 'dairy',
                name: 'milk',
                unit: 'servings'
            }
        ];

        const count = countExpiringFoodItems(HalfExpiringFridge);
        expect(count).toBe(0);
    });
});

describe('getOwnerFromId function', () => {
    it('should return a single owner object', () => {
        const result = getOwnerFromId(TenantHeidi.uid, [TenantHeidi, TenantDan, TenantJoe]);
        expect(result).toStrictEqual(TenantHeidi);
    });
});

describe('convertBatchesArray function', () => {
    it('should convert batches array into object of objects', () => {
        const result = convertBatchesArray([Fridge[0]]);
        expect(result).toStrictEqual([
            {
                batches: {
                    '1111111': {
                        expires: expect.any(Date),
                        id: '1111111',
                        ownerId: 'fghij',
                        quantity: 1
                    },
                    '22222222': {
                        expires: expect.any(Date),
                        id: '22222222',
                        ownerId: 'abcde',
                        quantity: 2
                    },
                    '3333333': {
                        expires: expect.any(Date),
                        id: '3333333',
                        ownerId: 'zxwy',
                        quantity: 4
                    }
                },
                category: 'vegetables',
                name: Fridge[0].name,
                unit: 'servings'
            }
        ]);
    });
});

describe('getCategoriesAndCounts function', () => {
    it('should return an object of names and counts', () => {
        const result = getCategoriesAndCounts(Fridge);
        expect(result).toStrictEqual({ dairy: 1, meat: 1, vegetables: 2 });
    });
});

describe('filterByTenantIds function', () => {
    it('should return foods only with selected tenant', () => {
        const fridge: FoodType[] = [
            {
                batches: [ExpiringSoonBatch],
                name: 'Carrots',
                category: 'vegetables',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                name: 'Steak',
                category: 'meat',
                unit: 'servings'
            },
            {
                batches: [],
                name: 'Salmon',
                category: 'fish',
                unit: 'servings'
            }
        ];

        const result = filterByTenantIds(fridge, [ExpiringSoonBatch.ownerId]);
        expect(result).toStrictEqual([fridge[0]]);
    });

    it('should return foods only with multiple selected tenants', () => {
        const fridge: FoodType[] = [
            {
                batches: [ExpiringSoonBatch],
                name: 'Carrots',
                category: 'vegetables',
                unit: 'servings'
            },
            {
                batches: [FreshBatch],
                name: 'Steak',
                category: 'meat',
                unit: 'servings'
            },
            {
                batches: [FreshBatch, ExpiringSoonBatch],
                name: 'Chicken',
                category: 'meat',
                unit: 'servings'
            },
            {
                batches: [],
                name: 'Salmon',
                category: 'fish',
                unit: 'servings'
            },
            {
                batches: [ExpiredBatch],
                name: 'Cod',
                category: 'fish',
                unit: 'servings'
            }
        ];

        const result = filterByTenantIds(fridge, [FreshBatch.ownerId, ExpiringSoonBatch.ownerId]);
        expect(result).toStrictEqual([fridge[0], fridge[1], fridge[2]]);
    });
});

describe('checkAndFilterInvalidData function', () => {
    it('should filter out invalid data', () => {
        const databaseFridge: any[] = [
            {
                name: 'Milk',
                category: 'Dairy',
                unit: 'cartons',
                batches: {
                    [ExpiredBatch.id]: ExpiredBatch
                }
            },
            {
                name: 'Item without batches',
                category: 'Dairy',
                unit: 'cartons'
            },
            {
                name: 'Item without unit',
                category: 'Dairy',
                batches: {
                    [ExpiredBatch.id]: ExpiredBatch
                }
            },
            {
                name: 'Broccoli without category',
                unit: 'cartons',
                batches: {
                    [ExpiredBatch.id]: ExpiredBatch
                }
            },
            {
                category: 'item without name property',
                unit: 'cartons',
                batches: {
                    [ExpiredBatch.id]: ExpiredBatch
                }
            }
        ];

        const result = checkAndFilterInvalidData(databaseFridge);

        expect(result).toStrictEqual([databaseFridge[0]]);
    });

    it.each`
        property
        ${'category'}
        ${'unit'}
        ${'batches'}
    `('should call toast error notification when no $property property', ({ property }) => {
        const testItem = {
            name: 'Chocolate',
            category: 'dairy',
            unit: 'troughs',
            batches: {
                [ExpiredBatch.id]: ExpiredBatch
            },
            [property]: undefined
        };

        checkAndFilterInvalidData([testItem]);

        expect(mockToastError).toHaveBeenCalledWith(`No ${property} for ${testItem.name}, ${testItem.name} omitted`);
    });
});

describe('checkExistingCategory function', () => {
    it('should return a category when it already exists', () => {
        const category = checkExistingCategory(Fridge, Fridge[2].name);
        expect(category).toBe(Fridge[2].category);
    });

    it('should return an empty string if name does not exist', () => {
        const category = checkExistingCategory(Fridge, 'check-unique-name');
        expect(category).toBe('');
    });
});
