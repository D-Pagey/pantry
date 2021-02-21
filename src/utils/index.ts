import { differenceInDays } from 'date-fns';
import { titleCase } from 'title-case';
import { toast } from 'react-toastify';
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

// TODO: Change to units
export const formatFoodDropdownOptions = (fridge: FoodType[]): DropdownOptionType[] => {
    return fridge.map((food) => {
        const total = food.batches.reduce((acc, curr) => acc + curr.quantity, 0);

        return { label: `${titleCase(food.name)} (${total} ${food.unit})`, value: food.name };
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatDropdownOptions = (array: any[]): DropdownOptionType[] => {
    return array.map((item: string | number) => ({
        label: item.toString(),
        value: item.toString()
    }));
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

export const formatExpiryDatesAndBatches = (fridgeItems: DatabaseFoodType[]): FoodType[] => {
    return fridgeItems.reduce((acc, curr): FoodType[] => {
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
};

/**
 * A function that filters out any data that is not in the correct shape
 * Also calls a toast notification on any data that is not valid
 */
export const checkAndFilterInvalidData = (fridgeItems: DatabaseFoodType[]): DatabaseFoodType[] => {
    const filtered = fridgeItems.filter((item) => {
        const { name, category, batches, unit } = item;

        if (name === undefined) return false;
        if (category === undefined) {
            toast.error(`No category for ${name}, ${name} omitted`);
            return false;
        }

        if (unit === undefined) {
            toast.error(`No unit for ${name}, ${name} omitted`);
            return false;
        }

        if (batches === undefined) {
            toast.error(`No batches for ${name}, ${name} omitted`);
            return false;
        }

        return true;
    });

    return filtered;
};

export const removePreviousTenantsItems = (items: FoodType[], currentTenants: TenantType[]): FoodType[] => {
    const currentTenantsIds = currentTenants.map((tenant) => tenant.uid);

    return items.map((item) => {
        return {
            ...item,
            batches: item.batches.filter((batch) => {
                if (currentTenantsIds.includes(batch.ownerId)) return true;

                return false;
            })
        };
    });
};

/**
 * Filters out invalid data then formats the shape of the valid data
 */
export const checkAndFormatFridge = (fridgeItems: DatabaseFoodType[], tenants: TenantType[]): FoodType[] => {
    const cleanData = checkAndFilterInvalidData(fridgeItems);
    const formattedData = formatExpiryDatesAndBatches(cleanData);
    return removePreviousTenantsItems(formattedData, tenants);
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

export const filterByTenantIds = (fridge: FoodType[], selectedTenants: string[]): FoodType[] => {
    return fridge.filter((item) => {
        if (item.batches.length === 0) return false;

        return item.batches.reduce((acc, curr): boolean => {
            // once we have decided to keep the item, we don't need to check again
            if (acc === true) return acc;

            // if any of the batches have a selected tenant that keep the item
            if (selectedTenants.includes(curr.ownerId)) {
                return true;
            }

            // if we aren't already keeping the item and the selected tenants
            // are one of the owners of a batch, then filter it out
            return false;
        }, false as boolean);
    });
};

export const checkExistingCategory = (fridge: FoodType[], name: string): string => {
    return fridge.reduce((acc, curr) => {
        if (curr.name === name.toLowerCase()) {
            return curr.category;
        }

        return acc;
    }, '');
};

export const checkExistingItem = (fridge: FoodType[], name: string): FoodType | undefined => {
    return fridge.reduce((acc, curr): FoodType | undefined => {
        if (curr.name === name) return curr;

        return acc;
    }, undefined as FoodType | undefined);
};
