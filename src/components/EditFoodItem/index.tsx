import 'rc-checkbox/assets/index.css';
import React, { FC, useReducer, useContext } from 'react';
import { format } from 'date-fns';
import { BatchType, FoodType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { Button } from '../Button';
import { reducer } from './reducer';
import * as S from './styles';

type EditFoodItemProps = {
    item: FoodType;
};

export const EditFoodItem: FC<EditFoodItemProps> = ({ item }) => {
    const [state, dispatch] = useReducer(reducer, { updatedBatches: item.batches, count: 0 });
    const { updateFridge } = useContext(FirebaseContext);

    const handleChecked = (batch: BatchType) => (event: any): void => {
        const dispatchType = event.target.checked ? 'checked' : 'unchecked';

        dispatch({ type: dispatchType, payload: batch });
    };

    const handleEdit = () => updateFridge({ ...item, batches: state.updatedBatches });

    return (
        <S.Wrapper>
            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={i}>
                            <S.Checkbox onChange={handleChecked(batch)} data-testid={`${batch.owner}-${i}`} />
                            Expired {format(batch.expires, 'do MMM')}
                        </S.Item>
                    ));
                })}
            </S.List>

            <Button
                disabled={state.count === 0}
                margin="0 0 1rem"
                onClick={handleEdit}
                data-testid="editFoodItemSubmit"
            >
                Eat {state.count} Carrots
            </Button>
            <Button secondary>Cancel</Button>
        </S.Wrapper>
    );
};
