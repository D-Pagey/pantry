import { FoodCardBatchType } from '../../types';

export const getTotalServingsCount = (batches: FoodCardBatchType[]): number => {
    return batches.reduce((acc, curr) => {
        if (acc <= 10) return acc + curr.servings;

        return acc;
    }, 0);
};

export const reduceBatches = (batches: FoodCardBatchType[]): FoodCardBatchType[] => {
    const countedAndCropped = batches.reduce((acc, curr) => {
        if (curr.servings + acc.count <= 10) {
            return { 
                batches: [...acc.batches, curr],
                count: curr.servings + acc.count
            };
        }

        if (curr.servings + acc.count > 10) {
            const choppedBatch = {...curr, servings: 10 - acc.count};
            return { 
                batches: [...acc.batches, choppedBatch],
                count: choppedBatch.servings + acc.count
            };
        }

        return acc;
    }, { batches: [] as FoodCardBatchType[], count: 0});

    return countedAndCropped.batches;
};

// pull out unduplicated ownerPhotos 
export const getBatchPhotos = (batches: FoodCardBatchType[]): string[] => {
    return batches.reduce((acc, curr) => {
        if (acc.includes(curr.ownerPhoto)) return acc;

        return [...acc, curr.ownerPhoto];
    }, [] as string[]);
}; 