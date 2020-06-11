import { FoodType } from '../../types';

export const formatExpiryDates = (fridgeItems: FoodType[]): FoodType[] => {
    return fridgeItems.map((item) => {
        return {
            ...item,
            batches: item.batches.map((batch) => ({ ...batch, expires: batch.expires.toDate() }))
        };
    });
};
