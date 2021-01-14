import { BatchType, TenantType } from '../../types';
import { getOwnerFromId } from '../../utils';

export const getTotalQuantity = (batches: BatchType[]): number => {
    return batches.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);
};

export const reduceBatches = (batches: BatchType[]): BatchType[] => {
    const countedAndCropped = batches.reduce(
        (acc, curr) => {
            if (curr.quantity + acc.count <= 10) {
                return {
                    batches: [...acc.batches, curr],
                    count: curr.quantity + acc.count
                };
            }

            if (curr.quantity + acc.count > 10) {
                const choppedBatch = { ...curr, quantity: 10 - acc.count };
                return {
                    batches: [...acc.batches, choppedBatch],
                    count: choppedBatch.quantity + acc.count
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

        const accumulatorIds = acc.map((tenant) => tenant.uid);

        if (!accumulatorIds.includes(curr.ownerId)) {
            return [...acc, getOwnerFromId(curr.ownerId, tenants)];
        }

        return acc;
    }, [] as TenantType[]);
};

export const sortBatches = (batches: BatchType[]): BatchType[] => {
    return [...batches].sort((a, b) => {
        const aTime = a.expires.getTime();
        const bTime = b.expires.getTime();

        if (aTime < bTime) return -1;
        if (aTime > bTime) return 1;

        return 0;
    });
};
