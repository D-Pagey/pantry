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
        // @ts-ignore
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
    const items = Object.values(fridge);

    const updatedItems = items.map((item) => {
        const { batches, ...rest } = item;
        const updatedBatches = convertBatches(batches);

        return {
            ...rest,
            batches: updatedBatches,
            unit: 'servings'
        };
    });

    const withKeys = updatedItems.map((item) => [item.name, item]);

    return Object.fromEntries(withKeys);
};
