import { FoodType, TenantType } from '../../types';
import { getExpiringItems } from '../../utils';
import { FilterState } from '../MobileFoodMenu/filterReducer';

export type SortOptions = 'name' | 'date';

type ApplyFiltersAction = {
    type: 'APPLY_FILTERS';
    filters: FilterState;
};

type FilterExpiringAction = {
    type: 'FILTER_EXPIRING';
};

type RemoveExpiringFilterAction = {
    type: 'REMOVE_EXPIRING_FILTER';
    fridge: FoodType[];
};

type FoodActions = ApplyFiltersAction | FilterExpiringAction | RemoveExpiringFilterAction;

export type FoodState = {
    food: FoodType[];
    selectedOwners: string[];
    showOnlyExpiring: boolean;
    sortBy: SortOptions;
};

export const init = (initialFoodState: FoodState, tenants: TenantType[], fridge: FoodType[]): FoodState => {
    const onlyFoodWithBatches = fridge.filter((item) => {
        return item.batches.length > 0;
    });

    return {
        ...initialFoodState,
        selectedOwners: tenants.map((tenant) => tenant.uid),
        food: onlyFoodWithBatches
    };
};

export const initialFoodState: FoodState = {
    food: [],
    selectedOwners: [],
    showOnlyExpiring: true,
    sortBy: 'date'
};

export const foodReducer = (state: FoodState, action: FoodActions): FoodState => {
    switch (action.type) {
        case 'APPLY_FILTERS': {
            return {
                ...state,
                ...action.filters
            };
        }

        case 'FILTER_EXPIRING': {
            const filtered = getExpiringItems(state.food);
            return {
                ...state,
                food: filtered
            };
        }

        case 'REMOVE_EXPIRING_FILTER': {
            const filtered = action.fridge.filter((item) => item.batches.length > 0);

            return {
                ...state,
                showOnlyExpiring: false,
                food: filtered
            };
        }

        default:
            return state;
    }
};
