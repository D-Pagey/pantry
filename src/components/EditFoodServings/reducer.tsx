import { BatchType } from '../../types';

type StateType = {
    count: number;
    updatedBatches: BatchType[];
};

type ActionType = {
    payload: BatchType;
    type: string;
};

export const reducer = (state: StateType, action: ActionType): StateType => {
    const currentBatch = state.updatedBatches.filter((batch) => batch.expires === action.payload.expires);
    const filteredOut = state.updatedBatches.filter((batch) => batch.expires !== action.payload.expires);

    switch (action.type) {
        case 'checked': {
            const updated = { ...currentBatch[0], servings: currentBatch[0].servings - 1 };
            const updatedBatches = [...filteredOut, updated];
            return { updatedBatches, count: state.count + 1 };
        }
        case 'unchecked': {
            const updated = { ...currentBatch[0], servings: currentBatch[0].servings + 1 };
            const updatedBatches = [...filteredOut, updated];
            return { updatedBatches, count: state.count - 1 };
        }
        default:
            throw new Error('Wrong type');
    }
};
