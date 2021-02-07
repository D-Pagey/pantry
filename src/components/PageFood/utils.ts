import { FoodType, TenantType } from '../../types';
import { filterByTenantIds, getExpiringItems } from '../../utils';
import { FilterState } from '../MobileFoodMenu/filterReducer';

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

export const sortByName = (food: FoodType[]): FoodType[] => {
    return [...food].sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        if (aName < bName) return -1;
        if (aName > bName) return 1;

        return 0;
    });
};

// A function that takes some filters and applies them to original fridge
export const applyMultipleFilters = (food: FoodType[], filters: FilterState): FoodType[] => {
    const onlyFoodWithBatches = food.filter((item) => {
        return item.batches.length > 0;
    });

    const sorted =
        filters.sortBy === 'date' ? sortByOldestExpiryDate(onlyFoodWithBatches) : sortByName(onlyFoodWithBatches);

    const selectedOwnersFood =
        filters.selectedOwners.length > 0 ? filterByTenantIds(sorted, filters.selectedOwners) : sorted;

    return filters.showOnlyExpiring ? getExpiringItems(selectedOwnersFood) : selectedOwnersFood;
};

export const getOwnersButtonText = (selectedOwnersIds: string[], tenants: TenantType[]): string => {
    const selectedTenants = tenants.filter((tenant) => selectedOwnersIds.includes(tenant.uid));
    const firstNames = selectedTenants.map((tenant) => tenant.name.split(' ')[0]);

    if (selectedTenants.length === 1) return `${firstNames[0]}'s food`;
    if (selectedTenants.length === 2) return `${firstNames[0]}'s + ${firstNames[1]}'s`;

    return firstNames.reduce((acc, curr, index, array) => {
        if (index === 0) return `${curr}'s`;

        if (index === array.length - 1) {
            return `${acc} + ${curr}'s food`;
        }

        return `${acc}, ${curr}'s`;
    }, '');
};
