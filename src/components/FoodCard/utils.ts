import { BatchType } from '../../types';

export const getTotalServingsCount = (batches: BatchType[]): number => {
    return batches.reduce((acc, curr) => {
        if (acc <= 10) return acc + curr.servings;

        return acc;
    }, 0);
};

export const reduceBatches = (batches: BatchType[]): BatchType[] => {
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
    }, { batches: [] as BatchType[], count: 0});

    return countedAndCropped.batches;
};