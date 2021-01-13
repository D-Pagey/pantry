import { DatabaseFoodType, BatchType } from '../../types';

type NewBatchType = {
    [id: string]: Omit<BatchType, 'servings'> & { quantity: number };
};

export type DatabaseFridgeType = {
    [name: string]: DatabaseFoodType;
};

export type NewDatabaseFridgeType = {
    [name: string]: Omit<DatabaseFoodType, 'batches'> & { batches: NewBatchType; unit: string };
};

export const convertBatches = (batches: { [id: string]: BatchType }): NewBatchType => {
    const batchValues = Object.values(batches);

    const swapKeys = batchValues.map((batch) => {
        const { servings, ...rest } = batch;

        return {
            ...rest,
            quantity: servings
        };
    });

    const nestedArray = swapKeys.map((swapped) => [swapped.id, swapped]);

    return Object.fromEntries(nestedArray);
};

export const updateFridge = (fridge: DatabaseFridgeType): NewDatabaseFridgeType => {
    const firstItem = Object.values(fridge)[0];

    const batches = firstItem.batches;

    console.log(batches);
    // const firstItemBatchesArray = Object.values(firstItem.batches).map((batch) => {
    //     const { servings, ...rest } = batch;

    //     return {
    //         ...rest,
    //         quantity: servings
    //     };
    // });

    // const nestedArray = firstItemBatchesArray.map((batch) => {
    //     return [batch.id, batch];
    // });

    // const newBatches = Object.fromEntries(nestedArray);

    // const updatedItem = {
    //     ...firstItem,
    //     batches: newBatches,
    //     unit: 'servings'
    // };

    return fridge;
};
