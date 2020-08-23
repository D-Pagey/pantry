import { Batches, Tenant } from '../../fixtures';
import { getTotalServingsCount, reduceBatches } from './utils';

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
            owner: Tenant,
            servings: 4
        };

        const largeBatches = [BigBatch, BigBatch, BigBatch];
        const reducedBatches = reduceBatches(largeBatches);

        expect(reducedBatches[2].servings).toEqual(2);
    });
});