import { BatchType, UserType } from '../../types';

export const getTotalServingsCount = (batches: BatchType[]): number => {
    return batches.reduce((acc, curr) => {
        if (acc <= 10) return acc + curr.servings;

        return acc;
    }, 0);
};

export const reduceBatches = (batches: BatchType[]): BatchType[] => {
    const countedAndCropped = batches.reduce(
        (acc, curr) => {
            if (curr.servings + acc.count <= 10) {
                return {
                    batches: [...acc.batches, curr],
                    count: curr.servings + acc.count
                };
            }

            if (curr.servings + acc.count > 10) {
                const choppedBatch = { ...curr, servings: 10 - acc.count };
                return {
                    batches: [...acc.batches, choppedBatch],
                    count: choppedBatch.servings + acc.count
                };
            }

            return acc;
        },
        { batches: [] as BatchType[], count: 0 }
    );

    return countedAndCropped.batches;
};

export const getOwnerPhotoAndName = (batches: BatchType[]): Partial<UserType>[] => {
    return batches.reduce((acc, curr, index) => {
        const name = curr.owner.name || curr.owner.email;

        if (index === 0) return [{ photo: curr.owner.photo, name }];

        const existingNames = acc.map((item) => item.name);

        if (!existingNames.includes(curr.owner.name))
            return [...acc, { photo: curr.owner.photo, name }];

        return acc;
    }, [] as Partial<UserType>[]);
};
