import { BatchType, TenantType } from '../../types';
import { getOwnerFromId } from '../../utils';

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

export const getBatchTenants = (sortedBatches: BatchType[], tenants: TenantType[]): TenantType[] => {
    return sortedBatches.reduce((acc, curr, index) => {
        if (index === 0) return [...acc, getOwnerFromId(curr.ownerId, tenants)];

        const accumulatorIds = acc.map(tenant => tenant.uid);

        if (!accumulatorIds.includes(curr.ownerId)) {
            return [...acc, getOwnerFromId(curr.ownerId, tenants)];
        }

        return acc;
    }, [] as TenantType[]);
};
