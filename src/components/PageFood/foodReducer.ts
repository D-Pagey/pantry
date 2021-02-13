import { FoodType, TenantType } from '../../types';
import { getExpiringItems } from '../../utils';
import { applyMultipleFilters } from './utils';

export type SortOptions = 'name' | 'date';

export type FilterState = {
    category: string;
    selectedOwners: string[];
    showOnlyExpiring: boolean;
    sortBy: SortOptions;
};

type ApplyFiltersAction = {
    type: 'APPLY_FILTERS';
    fridge: FoodType[];
};

type RemoveExpiringFilterAction = {
    type: 'REMOVE_EXPIRING_FILTER';
    fridge: FoodType[];
};

type ChangeSortAction = {
    type: 'CHANGE_SORTED_BY';
    sortBy: SortOptions;
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

type RemoveCategoryAction = {
    type: 'REMOVE_CATEGORY';
    fridge: FoodType[];
};

type ToggleOwnerAction = {
    type: 'TOGGLE_SELECTED_OWNER';
    ownerId: string;
};

type ChangeCategoryAction = {
    type: 'CHANGE_CATEGORY';
    category: string;
};

type ResetFiltersAction = {
    type: 'RESET';
};

type ChangeShowExpiredAction = {
    type: 'CHANGE_SHOW_ONLY_EXPIRED';
    onlyShowExpired: boolean;
};

export type FoodActions =
    | ApplyFiltersAction
    | RemoveExpiringFilterAction
    | UpdateFridgeAction
    | RemoveSelectedOwnersAction
    | RemoveCategoryAction
    | ToggleOwnerAction
    | ChangeCategoryAction
    | ResetFiltersAction
    | ChangeShowExpiredAction
    | ChangeSortAction;

export type FoodState = {
    food: FoodType[];
    appliedFilters: FilterState;
    pendingFilters: FilterState;
};

export const init = (initialFoodState: FoodState, tenants: TenantType[], fridge: FoodType[]): FoodState => {
    const expiringItems = getExpiringItems(fridge);

    const filters = {
        ...initialFoodState.appliedFilters,
        showOnlyExpiring: expiringItems.length > 0,
        selectedOwners: tenants.map((tenant) => tenant.uid)
    };

    return {
        ...initialFoodState,
        appliedFilters: filters,
        pendingFilters: filters,
        food: applyMultipleFilters(fridge, filters)
    };
};

const defaultFilters: FilterState = {
    selectedOwners: [],
    showOnlyExpiring: true,
    sortBy: 'date',
    category: ''
};

export const initialFoodState: FoodState = {
    food: [],
    appliedFilters: defaultFilters,
    pendingFilters: defaultFilters
};

export const foodReducer = (state: FoodState, action: FoodActions): FoodState => {
    switch (action.type) {
        case 'APPLY_FILTERS': {
            return {
                ...state,
                appliedFilters: state.pendingFilters,
                food: applyMultipleFilters(action.fridge, state.pendingFilters)
            };
        }

        case 'REMOVE_EXPIRING_FILTER': {
            const updatedFilters = {
                ...state.appliedFilters,
                showOnlyExpiring: false
            };

            return {
                ...state,
                appliedFilters: updatedFilters,
                pendingFilters: updatedFilters,
                food: applyMultipleFilters(action.fridge, updatedFilters)
            };
        }

        case 'REMOVE_SELECTED_OWNERS': {
            const updatedFilters = {
                ...state.appliedFilters,
                selectedOwners: action.tenants.map((tenant) => tenant.uid)
            };

            return {
                ...state,
                appliedFilters: updatedFilters,
                pendingFilters: updatedFilters,
                food: applyMultipleFilters(action.fridge, updatedFilters)
            };
        }

        case 'REMOVE_CATEGORY': {
            const updatedFilters = {
                ...state.appliedFilters,
                category: ''
            };

            return {
                ...state,
                appliedFilters: updatedFilters,
                pendingFilters: updatedFilters,
                food: applyMultipleFilters(action.fridge, updatedFilters)
            };
        }

        case 'UPDATE_FRIDGE': {
            return {
                ...state,
                food: applyMultipleFilters(action.fridge, state.appliedFilters)
            };
        }

        case 'TOGGLE_SELECTED_OWNER': {
            const {
                pendingFilters: { selectedOwners }
            } = state;

            const updatedSelectedOwners = selectedOwners.includes(action.ownerId)
                ? selectedOwners.filter((id) => id !== action.ownerId)
                : [...selectedOwners, action.ownerId];

            return {
                ...state,
                pendingFilters: {
                    ...state.pendingFilters,
                    selectedOwners: updatedSelectedOwners
                }
            };
        }

        case 'CHANGE_CATEGORY': {
            return {
                ...state,
                pendingFilters: {
                    ...state.pendingFilters,
                    category: action.category
                }
            };
        }

        case 'RESET': {
            return {
                ...state,
                pendingFilters: state.appliedFilters
            };
        }

        case 'CHANGE_SHOW_ONLY_EXPIRED': {
            return {
                ...state,
                pendingFilters: {
                    ...state.pendingFilters,
                    showOnlyExpiring: action.onlyShowExpired
                }
            };
        }

        case 'CHANGE_SORTED_BY': {
            return {
                ...state,
                pendingFilters: {
                    ...state.pendingFilters,
                    sortBy: action.sortBy
                }
            };
        }

        default:
            return state;
    }
};
