import { addDays } from 'date-fns';
import { Batches, Tenant } from '../../fixtures';
import { BatchType } from '../../types';
import { getTotalServingsCount, reduceBatches, getOwnerPhotoAndName } from './utils';

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

describe('getOwnerPhotoAndName function', () => {
    it('should return an array of deduplicated owner photos', () => {
        const batches: BatchType[] = [
            {
                expires: new Date(),
                id: '111',
                servings: 2,
                owner: {
                    email: 'dan@mail.com',
                    photo: 'www.dan.com',
                    name: 'dan',
                    uid: 'dan'
                }
            },
            {
                expires: addDays(new Date(), 2),
                id: '222',
                servings: 2,
                owner: {
                    email: 'joe@mail.com',
                    photo: 'www.joe.com',
                    name: 'joe',
                    uid: 'joe'
                }
            },
            {
                expires: addDays(new Date(), 5),
                id: '111',
                servings: 2,
                owner: {
                    email: 'dan@mail.com',
                    photo: 'www.dan.com',
                    name: 'dan',
                    uid: 'dan'
                }
            }
        ];

        const result = getOwnerPhotoAndName(batches);

        expect(result).toStrictEqual([
            { photo: 'www.dan.com', name: 'dan' },
            { photo: 'www.joe.com', name: 'joe' }
        ]);
    });
});
