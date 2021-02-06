export type SortOptions = 'name' | 'date';

type ChangeSortAction = {
    type: 'CHANGE_SORTED_BY';
    payload: SortOptions;
};

type FilterState = {
    sortBy: SortOptions;
};

type FilterActions = ChangeSortAction;

export const initialState: FilterState = {
    sortBy: 'date'
};

export const reducer = (state: FilterState, action: FilterActions): FilterState => {
    switch (action.type) {
        case 'CHANGE_SORTED_BY': {
            return {
                ...state,
                sortBy: action.payload
            };
        }

        default:
            return state;
    }
};
