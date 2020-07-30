import { FoodCardBatches, UserPhoto1, UserPhoto2, UserPhoto3 } from '../../fixtures';
import { getTotalServingsCount, reduceBatches, getBatchPhotos } from './utils';

describe('getBackPhotos function', () => {
    it.each`
    batches
    ${FoodCardBatches}
    ${[...FoodCardBatches, ...FoodCardBatches]}
    `('should return an array of dedeplucated photos', ({ batches }) => {
        const photos = getBatchPhotos(batches);
        expect(photos).toStrictEqual([UserPhoto1, UserPhoto2, UserPhoto3]);
    });
});

describe('getTotalServingsCount function', () => {
    it.each`
        batches                                     | expectedCount
        ${FoodCardBatches}                          | ${7}
        ${[...FoodCardBatches, ...FoodCardBatches]} | ${14}
    `('should return $expectedCount count for certain batches', ({ batches, expectedCount }) => {
        const count = getTotalServingsCount(batches);
        expect(count).toEqual(expectedCount);
    });
});

describe('reduceBatches function', () => {
    it('should return a reduced array of batches', () => {
        const largeBatches = [...FoodCardBatches, ...FoodCardBatches];
        const reducedBatches = reduceBatches(largeBatches);
        const count = getTotalServingsCount(reducedBatches);

        expect(count).toEqual(10);
    });

    it('should return a chopped servings for last batch', () => {
        const BigBatch = {
            expires: new Date(),
            ownerPhoto: '1',
            servings: 4
        };

        const largeBatches = [BigBatch, BigBatch, BigBatch];
        const reducedBatches = reduceBatches(largeBatches);

        expect(reducedBatches[2].servings).toEqual(2);
    });
});
