import { convertBatches, updateFridge, DatabaseFridgeType, NewDatabaseFridgeType } from './utils';

const Fridge: DatabaseFridgeType = {
    broccoli: {
        name: 'broccoli',
        category: 'vegetables',
        batches: {
            abc: {
                id: 'abc',
                expires: new Date(),
                servings: 2,
                ownerId: 'zz'
            },
            def: {
                id: 'def',
                expires: new Date(),
                servings: 3,
                ownerId: 'zz'
            }
        }
    },
    carrots: {
        name: 'carrots',
        category: 'vegetables',
        batches: {
            ghi: {
                id: 'ghi',
                expires: new Date(),
                servings: 1,
                ownerId: 'zz'
            },
            jkl: {
                id: 'jkl',
                expires: new Date(),
                servings: 4,
                ownerId: 'zz'
            }
        }
    }
};

const NewFridge: NewDatabaseFridgeType = {
    broccoli: {
        unit: 'servings',
        name: 'broccoli',
        category: 'vegetables',
        batches: {
            abc: {
                id: 'abc',
                expires: new Date(),
                quantity: 2,
                ownerId: 'zz'
            },
            def: {
                id: 'def',
                expires: new Date(),
                quantity: 3,
                ownerId: 'zz'
            }
        }
    },
    carrots: {
        unit: 'servings',
        name: 'carrots',
        category: 'vegetables',
        batches: {
            ghi: {
                id: 'ghi',
                expires: new Date(),
                quantity: 1,
                ownerId: 'zz'
            },
            jkl: {
                id: 'jkl',
                expires: new Date(),
                quantity: 4,
                ownerId: 'zz'
            }
        }
    }
};

describe('updateFridge function', () => {
    it('should convert old fridge to new fridge', () => {
        const result = updateFridge(Fridge);
        expect(result).toStrictEqual(NewFridge);
    });

    it('should convert even with empty batches', () => {
        const FridgeWithEmpty = {
            ...Fridge,
            chicken: {
                name: 'chicken',
                category: 'vegetables',
                batches: {}
            }
        };

        const NewFridgeWithEmpty = {
            ...NewFridge,
            chicken: {
                unit: 'servings',
                name: 'chicken',
                category: 'vegetables',
                batches: {}
            }
        };

        const result = updateFridge(FridgeWithEmpty);
        expect(result).toStrictEqual(NewFridgeWithEmpty);
    });
});

describe('convertBatches function', () => {
    it('should convert old batches to new batches', () => {
        const result = convertBatches(Fridge.broccoli.batches);
        expect(result).toStrictEqual(NewFridge.broccoli.batches);
    });
});
