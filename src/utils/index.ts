import { differenceInDays } from 'date-fns';
import { titleCase } from 'title-case';
import arraySort from 'array-sort';
import { BatchType, DatabaseFoodType, DropdownOptionType, FoodType, TenantType } from '../types';
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

export const formatDropdownOptions = (fridge: FoodType[]): DropdownOptionType[] => {
    return fridge.map((food) => {
        const totalServings = food.batches.reduce((acc, curr) => acc + curr.servings, 0);

        return { label: `${titleCase(food.name)} (${totalServings} servings)`, value: food.name };
    });
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

export const formatExpiryDates = (fridgeItems: DatabaseFoodType[]): FoodType[] => {
    const formatted = fridgeItems.reduce((acc, curr): FoodType[] => {
        const batchesArray = curr.batches ? Object.values(curr.batches) : [];

        if (batchesArray.length === 0) return [...acc, { ...curr, batches: [] }];

        const formattedBatches = batchesArray.map((batch) => {
            return {
                ...batch,
                expires: batch.expires.toDate()
            };
        });

        return [...acc, { ...curr, batches: formattedBatches }];
    }, [] as FoodType[]);

    return arraySort(formatted, 'name');
};

/**
 * Converts a food item with `batches` as an array into a food item with `batches`
 * as an object of objects
 */
export const convertBatchesArray = (fridgeItems: FoodType[]): DatabaseFoodType[] => {
    return fridgeItems.map((item) => {
        const newBatches: { [id: string]: BatchType } = {};

        item.batches.forEach((batch) => {
            newBatches[batch.id] = batch;
        });

        return {
            ...item,
            batches: newBatches
        };
    });
};

export const countExpiringFoodItems = (fridgeItems: FoodType[]): number => {
    return fridgeItems.reduce((acc, curr) => {
        const expiringSoon = curr.batches.some(
            (batch) => differenceInDays(batch.expires, new Date()) < EXPIRING_SOON_DAYS
        );

        if (expiringSoon) return acc + 1;
        return acc;
    }, 0);
};

export const getOwnerFromId = (tenantId: string, tenants: TenantType[]): TenantType => {
    return tenants.filter((tenant) => tenant.uid === tenantId)[0];
};

type CategoryWithCount = { [category: string]: number };

export const getCategoriesAndCounts = (fridge: FoodType[]): CategoryWithCount => {
    return fridge.reduce((acc, curr) => {
        if (curr.batches.length > 0) {
            return {
                ...acc,
                [curr.category]: acc[curr.category] ? acc[curr.category] + 1 : 1
            };
        }

        return acc;
    }, {} as CategoryWithCount);
};
