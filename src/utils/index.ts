import { differenceInDays } from 'date-fns';
import { titleCase } from 'title-case';
import { DropdownOptionType, FoodType } from '../types';
import { colours, EXPIRING_SOON_DAYS } from '../tokens';

export const getPercentageFromDate = (date: Date): number => {
    const difference = differenceInDays(date, new Date());

    if (difference >= 5) return 100;
    if (difference === 4) return 80;
    if (difference === 3) return 60;
    if (difference === 2) return 40;
    if (difference === 1) return 20;
    if (difference === 0) return 10;

    return 100;
};

export const getColourFromDate = (date: Date): string => {
    const difference = differenceInDays(date, new Date());

    if (difference >= 4) return colours.darkGreen100;
    if (difference >= 2) return colours.orange;
    if (difference >= 0) return colours.red;

    return colours.grey;
};

export const getFridgeNameOptions = (names: string[]): DropdownOptionType[] => {
    return names.map((name) => ({ label: titleCase(name), value: name }));
};

export const getExpiringItems = (food: FoodType[]): FoodType[] => {
    return food.filter((item) => {
        return item.batches.reduce((acc, curr) => {
            if (acc) return acc;

            const difference = differenceInDays(curr.expires, new Date());

            return difference < EXPIRING_SOON_DAYS;
        }, false as boolean);
    });
};

export const filterFridgeByCategory = (food: FoodType[], category: string): FoodType[] => {
    return food.filter((item) => item.category === category);
};

export const formatExpiryDates = (fridgeItems: FoodType[]): FoodType[] => {
    return fridgeItems.map((item) => {
        return {
            ...item,
            batches: Object.values(item.batches).map((batch) => ({ ...batch, expires: batch.expires.toDate() }))
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