import { addDays } from 'date-fns';

import { Batches, TenantHeidi, TenantJoe, TenantDan } from '../../fixtures';
import { BatchType } from '../../types';
import { getTotalServingsCount, reduceBatches, getBatchTenants } from './utils';

describe('getTotalServingsCount function', () => {
    it.each`
        batches                     | expectedCount
        ${Batches}                  | ${7}
        ${[...Batches, ...Batches]} | ${14}
    `('should return $expectedCount count for certain batches', ({ batches, expectedCount }) => {
        const count = getTotalServingsCount(batches);
        expect(count).toEqual(expectedCount);
    });
});

describe('reduceBatches function', () => {
    it('should return a reduced array of batches', () => {
        const largeBatches = [...Batches, ...Batches];
        const reducedBatches = reduceBatches(largeBatches);
        const count = getTotalServingsCount(reducedBatches);

        expect(count).toEqual(10);
    });

    it('should return a chopped servings for last batch', () => {
        const BigBatch = {
            id: '1234',
            expires: new Date(),
            ownerId: TenantHeidi.uid,
            servings: 4
        };

        const largeBatches = [BigBatch, BigBatch, BigBatch];
        const reducedBatches = reduceBatches(largeBatches);

        expect(reducedBatches[2].servings).toEqual(2);
    });
});

describe('getBatchTenants function', () => {
    it('should return an array of Tenants', () => {
        const sortedBatches: BatchType[] = [
            {
                id: '1234',
                expires: new Date(),
                ownerId: TenantHeidi.uid,
                servings: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 2),
                ownerId: TenantJoe.uid,
                servings: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 4),
                ownerId: TenantDan.uid,
                servings: 1
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
                servings: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 2),
                ownerId: TenantJoe.uid,
                servings: 2
            },
            {
                id: '3333',
                expires: addDays(new Date(), 4),
                ownerId: TenantHeidi.uid,
                servings: 1
            }
        ];

        const tenants = [TenantHeidi, TenantJoe, TenantDan];

        const sortedTenants = getBatchTenants(sortedBatches, tenants);

        expect(sortedTenants).toStrictEqual([TenantHeidi, TenantJoe]);
    });
});
