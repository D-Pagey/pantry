import { addDays } from 'date-fns';

import { Batches, TenantHeidi, TenantJoe, TenantDan } from '../../fixtures';
import { BatchType } from '../../types';
import { getTotalQuantity, reduceBatches, getBatchTenants, sortBatches } from './utils';

const LargeBatch: BatchType = {
    expires: new Date(),
    id: 'id',
    ownerId: TenantHeidi.uid,
    quantity: 15
};

describe('getTotalQuantity function', () => {
    it.each`
        batches                     | expectedCount
        ${Batches}                  | ${7}
        ${[...Batches, ...Batches]} | ${14}
        ${[LargeBatch, ...Batches]} | ${22}
    `('should return $expectedCount count for certain batches', ({ batches, expectedCount }) => {
        const count = getTotalQuantity(batches);
        expect(count).toEqual(expectedCount);
    });
});

describe('reduceBatches function', () => {
    it('should return a reduced array of batches', () => {
        const largeBatches = [...Batches, ...Batches];
        const reducedBatches = reduceBatches(largeBatches);
        const count = getTotalQuantity(reducedBatches);

        expect(count).toEqual(10);
    });

    it('should return a chopped servings for last batch', () => {
        const BigBatch = {
            id: '1234',
            expires: new Date(),
            ownerId: TenantHeidi.uid,
            quantity: 4,
            unit: 'servings'
        };

        const largeBatches = [BigBatch, BigBatch, BigBatch];
        const reducedBatches = reduceBatches(largeBatches);

        expect(reducedBatches[2].quantity).toEqual(2);
    });
});

describe('getBatchTenants function', () => {
    it('should return an array of Tenants', () => {
        const sortedBatches: BatchType[] = [
            {
                id: '1234',
                expires: new Date(),
                ownerId: TenantHeidi.uid,
                quantity: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 2),
                ownerId: TenantJoe.uid,
                quantity: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 4),
                ownerId: TenantDan.uid,
                quantity: 1
            }
        ];

        const tenants = [TenantHeidi, TenantJoe, TenantDan];

        const sortedTenants = getBatchTenants(sortedBatches, tenants);

        expect(sortedTenants).toStrictEqual([TenantHeidi, TenantJoe, TenantDan]);
    });

    it('should return duplicated array of Tenants', () => {
        const sortedBatches: BatchType[] = [
            {
                id: '1234',
                expires: new Date(),
                ownerId: TenantHeidi.uid,
                quantity: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 2),
                ownerId: TenantJoe.uid,
                quantity: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 4),
                ownerId: TenantHeidi.uid,
                quantity: 1
            }
        ];

        const tenants = [TenantHeidi, TenantJoe, TenantDan];

        const sortedTenants = getBatchTenants(sortedBatches, tenants);

        expect(sortedTenants).toStrictEqual([TenantHeidi, TenantJoe]);
    });
});

const batchOne: BatchType = {
    expires: addDays(new Date(), 5),
    id: 'asdasdasd',
    quantity: 2,
    ownerId: 'bbb'
};

const batchTwo: BatchType = {
    ...batchOne,
    expires: addDays(new Date(), 2)
};

const batchThree: BatchType = {
    ...batchOne,
    expires: addDays(new Date(), 3)
};

describe('sortBatches function', () => {
    it('should sort batches from oldest to newest', () => {
        const result = sortBatches([batchOne, batchTwo, batchThree]);
        expect(result).toStrictEqual([batchTwo, batchThree, batchOne]);
    });
});
