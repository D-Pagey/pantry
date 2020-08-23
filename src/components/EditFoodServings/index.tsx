import 'rc-checkbox/assets/index.css';
import React, { FC, useReducer } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { BatchType, FoodType } from '../../types';
import { getColourFromDate } from '../../utils';
import { Button } from '../Button';
import { reducer } from './reducer';
import * as S from './styles';

type EditFoodServingsProps = {
    updateFridge: (food: FoodType) => void;
    item: FoodType;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item, updateFridge }) => {
    const [state, dispatch] = useReducer(reducer, { updatedBatches: item.batches, count: 0 });
    const history = useHistory();

    const handleChecked = (batch: BatchType) => (event: any): void => {
        const dispatchType = event.target.checked ? 'checked' : 'unchecked';

        dispatch({ type: dispatchType, payload: batch });
    };

    const handleEdit = () => {
        updateFridge({ ...item, batches: state.updatedBatches });
        history.push('/food');
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <S.Wrapper>
            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        <S.Item key={batch.id}>
                            <S.Checkbox onChange={handleChecked(batch)} data-testid={batch.id} />
                            <S.Text colour={getColourFromDate(batch.expires)}>
                                Expired {format(batch.expires, 'do MMM')}
                            </S.Text>
                            <img src={batch.owner.photo} alt="owner" />
                        </S.Item>
                    ));
                })}
            </S.List>

            <Button
                disabled={state.count === 0}
                margin="0 0 1rem"
                onClick={handleEdit}
                data-testid="EditFoodServingsSubmit"
            >
                Eat {state.count} {item.name}
            </Button>
            <Button secondary onClick={handleCancel}>
                Cancel
            </Button>
        </S.Wrapper>
    );
};
