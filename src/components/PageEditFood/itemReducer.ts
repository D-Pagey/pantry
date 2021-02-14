import { BatchType, FoodType } from '../../types';
import { sortBatches } from '../FoodCard/utils';

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

type DecrementBatchQuantityAction = {
    type: 'DECREMENT_BATCH_QUANTITY';
    batchId: string;
};

export type EditItemAction =
    | LoadingAction
    | InitialiseAction
    | ChangeUnitAction
    | ChangeCategoryAction
    | ChangeNameAction
    | DecrementBatchQuantityAction;

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

export const init = (initialItemState: EditState, fridge: FoodType[], name: string): EditState => {
    const foodItem = fridge.filter((food) => food.name === name)[0];
    const sortedBatches = sortBatches(foodItem.batches);
    const itemWithSortedBatches = {
        ...foodItem,
        batches: sortedBatches
    };

    return {
        ...initialItemState,
        loading: false,
        originalItem: itemWithSortedBatches,
        editedItem: itemWithSortedBatches
    };
};

export const itemReducer = (state: EditState, action: EditItemAction): EditState => {
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

        case 'DECREMENT_BATCH_QUANTITY': {
            const clickedBatch = state.editedItem.batches.filter((batch) => batch.id === action.batchId)[0];
            const updatedQuantity = clickedBatch.quantity - 1;

            if (updatedQuantity > 0) {
                const updatedBatches = state.editedItem.batches.reduce((acc, curr) => {
                    if (curr.id === action.batchId) {
                        return [...acc, { ...curr, quantity: updatedQuantity }];
                    }

                    return [...acc, curr];
                }, [] as BatchType[]);

                return {
                    ...state,
                    hasItemChanged: true,
                    editedItem: {
                        ...state.editedItem,
                        batches: updatedBatches
                    }
                };
            }

            // if the new quantity is 0 then just remove it from the batches
            return {
                ...state,
                hasItemChanged: true,
                editedItem: {
                    ...state.editedItem,
                    batches: state.editedItem.batches.filter((batch) => batch.id !== action.batchId)
                }
            };
        }
    }
};
