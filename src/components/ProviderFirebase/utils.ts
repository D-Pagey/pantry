import { differenceInDays } from 'date-fns';
import { FoodType } from '../../types';
import { EXPIRING_SOON_DAYS } from '../../tokens';

export const formatExpiryDates = (fridgeItems: FoodType[]): FoodType[] => {
    return fridgeItems.map((item) => {
        return {
            ...item,
            batches: item.batches.map((batch) => ({ ...batch, expires: batch.expires.toDate() }))
        };
    });
};

export const countExpiringFoodItems = (fridgeItems: FoodType[]): number => {
   return fridgeItems.reduce((acc, curr) => {
        const expiringSoon = curr.batches.some(batch => differenceInDays(batch.expires, new Date()) < EXPIRING_SOON_DAYS);

        if (expiringSoon) return acc + 1;
        return acc;
    }, 0);
};