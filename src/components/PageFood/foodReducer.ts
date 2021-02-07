import { FoodType, TenantType } from '../../types';
import { getExpiringItems } from '../../utils';
import { FilterState } from '../MobileFoodMenu/filterReducer';
import { applyMultipleFilters } from './utils';

export type SortOptions = 'name' | 'date';

type ApplyFiltersAction = {
    type: 'APPLY_FILTERS';
    filters: FilterState;
    fridge: FoodType[];
};

type RemoveExpiringFilterAction = {
    type: 'REMOVE_EXPIRING_FILTER';
    fridge: FoodType[];
};

type RemoveSelectedOwnersAction = {
    type: 'REMOVE_SELECTED_OWNERS';
    fridge: FoodType[];
    tenants: TenantType[];
};

type UpdateFridgeAction = {
    type: 'UPDATE_FRIDGE';
    fridge: FoodType[];
};

type FoodActions = ApplyFiltersAction | RemoveExpiringFilterAction | UpdateFridgeAction | RemoveSelectedOwnersAction;

export type FoodState = {
    food: FoodType[];
    filters: FilterState;
};

export const init = (initialFoodState: FoodState, tenants: TenantType[], fridge: FoodType[]): FoodState => {
    const expiringItems = getExpiringItems(fridge);

    const filters = {
        ...initialFoodState.filters,
        showOnlyExpiring: expiringItems.length > 0,
        selectedOwners: tenants.map((tenant) => tenant.uid)
    };

    return {
        ...initialFoodState,
        filters,
        food: applyMultipleFilters(fridge, filters)
    };
};

export const initialFoodState: FoodState = {
    food: [],
    filters: {
        selectedOwners: [],
        showOnlyExpiring: true,
        sortBy: 'date'
    }
};

export const foodReducer = (state: FoodState, action: FoodActions): FoodState => {
    switch (action.type) {
        case 'APPLY_FILTERS': {
            return {
                ...state,
                filters: action.filters,
                food: applyMultipleFilters(action.fridge, action.filters)
            };
        }

        case 'REMOVE_EXPIRING_FILTER': {
            const updatedFilters = {
                ...state.filters,
                showOnlyExpiring: false
            };

            return {
                ...state,
                filters: updatedFilters,
                food: applyMultipleFilters(action.fridge, updatedFilters)
            };
        }

        case 'REMOVE_SELECTED_OWNERS': {
            const updatedFilters = {
                ...state.filters,
                selectedOwners: action.tenants.map((tenant) => tenant.uid)
            };

            return {
                ...state,
                filters: updatedFilters,
                food: applyMultipleFilters(action.fridge, updatedFilters)
            };
        }

        case 'UPDATE_FRIDGE': {
            return {
                ...state,
                food: applyMultipleFilters(action.fridge, state.filters)
            };
        }

        default:
            return state;
    }
};
