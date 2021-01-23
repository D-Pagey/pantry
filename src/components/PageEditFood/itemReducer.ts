import { FoodType } from '../../types';

type LoadingAction = { type: 'TOGGLE_LOADING' };

type InitialiseAction = {
    type: 'INITIALISE';
    item: FoodType;
};

type ChangeUnitAction = {
    type: 'CHANGE_UNIT';
    unit: string;
};

type ChangeCategoryAction = {
    type: 'CHANGE_CATEGORY';
    category: string;
};

type ChangeNameAction = {
    type: 'CHANGE_NAME';
    name: string;
};

type ActionType = LoadingAction | InitialiseAction | ChangeUnitAction | ChangeCategoryAction | ChangeNameAction;

type EditState = {
    loading: boolean;
    editedItem: FoodType;
    originalItem: FoodType;
    hasItemChanged: boolean;
};

export const initialState = {
    loading: true,
    editedItem: {} as FoodType,
    originalItem: {} as FoodType,
    hasItemChanged: false
};

export const itemReducer = (state: EditState, action: ActionType): EditState => {
    switch (action.type) {
        case 'TOGGLE_LOADING': {
            return {
                ...state,
                loading: !state.loading
            };
        }

        case 'INITIALISE': {
            return {
                ...state,
                loading: false,
                originalItem: action.item,
                editedItem: action.item
            };
        }

        case 'CHANGE_UNIT': {
            return {
                ...state,
                hasItemChanged: action.unit !== state.originalItem.unit,
                editedItem: {
                    ...state.editedItem,
                    unit: action.unit
                }
            };
        }

        case 'CHANGE_CATEGORY': {
            return {
                ...state,
                hasItemChanged: action.category !== state.originalItem.category,
                editedItem: {
                    ...state.editedItem,
                    category: action.category
                }
            };
        }

        case 'CHANGE_NAME': {
            return {
                ...state,
                hasItemChanged: action.name !== state.originalItem.name,
                editedItem: {
                    ...state.editedItem,
                    name: action.name.toLowerCase()
                }
            };
        }

        default:
            return state;
    }
};
