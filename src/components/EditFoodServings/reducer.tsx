import { BatchWithPhotoType } from '../../types';

type StateType = {
    count: number;
    updatedBatches: BatchWithPhotoType[];
};

type ActionType = {
    payload: BatchWithPhotoType;
    type: string;
};

export const reducer = (state: StateType, action: ActionType): StateType => {
    const currentBatch = state.updatedBatches.filter((batch) => batch.expires === action.payload.expires);
    const filteredOut = state.updatedBatches.filter((batch) => batch.expires !== action.payload.expires);

    switch (action.type) {
        case 'checked': {
            if (currentBatch[0].servings === 1) {
                const updatedBatches = state.updatedBatches.filter((batch) => batch.expires !== action.payload.expires);

                return { updatedBatches, count: state.count + 1 };
            }

            const updated = { ...currentBatch[0], servings: currentBatch[0].servings - 1 };
            const updatedBatches = [...filteredOut, updated];
            return { updatedBatches, count: state.count + 1 };
        }
        case 'unchecked': {
            if (currentBatch.length === 0) {
                const updatedBatches = [...state.updatedBatches, { ...action.payload, servings: 1 }];

                return { updatedBatches, count: state.count - 1 };
            }

            const updated = { ...currentBatch[0], servings: currentBatch[0].servings + 1 };
            const updatedBatches = [...filteredOut, updated];
            return { updatedBatches, count: state.count - 1 };
        }
        default:
            throw new Error('Wrong type');
    }
};
