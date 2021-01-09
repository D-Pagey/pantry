import { FoodType } from '../../types';

export const sortByOldestExpiryDate = (food: FoodType[]): FoodType[] => {
    const filteredOutEmptyBatches = [...food].filter((item) => item.batches.length > 0);

    return filteredOutEmptyBatches.sort((a, b) => {
        const aExpiryDate = a.batches[0].expires.getTime();
        const bExpiryDate = b.batches[0].expires.getTime();

        if (aExpiryDate < bExpiryDate) return -1;
        if (aExpiryDate > bExpiryDate) return 1;

        return 0;
    });
};
