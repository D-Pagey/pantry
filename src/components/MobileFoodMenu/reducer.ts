import { TenantType } from '../../types';

export type SortOptions = 'name' | 'date';

type ChangeSortAction = {
    type: 'CHANGE_SORTED_BY';
    sortBy: SortOptions;
};

type ChangeShowExpiredAction = {
    type: 'CHANGE_SHOW_ONLY_EXPIRED';
    onlyShowExpired: boolean;
};

type ToggleSelectedOwnerAction = {
    type: 'TOGGLE_SELECTED_OWNER';
    ownerId: string;
};

type ResetAction = {
    type: 'RESET';
    tenants: TenantType[];
};

export type FilterState = {
    selectedOwners: string[];
    showOnlyExpiring: boolean;
    sortBy: SortOptions;
};

type FilterActions = ChangeSortAction | ChangeShowExpiredAction | ToggleSelectedOwnerAction | ResetAction;

export const init = (initialState: FilterState, tenants: TenantType[]): FilterState => {
    return {
        ...initialState,
        selectedOwners: tenants.map((tenant) => tenant.uid)
    };
};

export const initialState: FilterState = {
    selectedOwners: [],
    showOnlyExpiring: false,
    sortBy: 'date'
};

export const reducer = (state: FilterState, action: FilterActions): FilterState => {
    switch (action.type) {
        case 'CHANGE_SORTED_BY': {
            return {
                ...state,
                sortBy: action.sortBy
            };
        }

        case 'CHANGE_SHOW_ONLY_EXPIRED': {
            return {
                ...state,
                showOnlyExpiring: action.onlyShowExpired
            };
        }

        case 'TOGGLE_SELECTED_OWNER': {
            if (state.selectedOwners.includes(action.ownerId)) {
                return {
                    ...state,
                    selectedOwners: state.selectedOwners.filter((id) => id !== action.ownerId)
                };
            } else {
                return {
                    ...state,
                    selectedOwners: [...state.selectedOwners, action.ownerId]
                };
            }
        }

        case 'RESET': {
            return init(initialState, action.tenants);
        }

        default:
            return state;
    }
};
