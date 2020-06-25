import 'rc-checkbox/assets/index.css';
import React, { FC, useReducer, useContext } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { BatchType, FoodType } from '../../types';
import { chooseDateColour } from '../../utils';
import { FirebaseContext } from '../ProviderFirebase';
import { Button } from '../Button';
import { reducer } from './reducer';
import * as S from './styles';

type EditFoodServingsProps = {
    item: FoodType;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item }) => {
    const [state, dispatch] = useReducer(reducer, { updatedBatches: item.batches, count: 0 });
    const { updateFridge } = useContext(FirebaseContext);
    const history = useHistory();

    const handleChecked = (batch: BatchType) => (event: any): void => {
        const dispatchType = event.target.checked ? 'checked' : 'unchecked';

        dispatch({ type: dispatchType, payload: batch });
    };

    const handleEdit = () => {
        updateFridge({ ...item, batches: state.updatedBatches });
        history.push('/food');
    };

    return (
        <S.Wrapper>
            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={i}>
                            <S.Checkbox onChange={handleChecked(batch)} data-testid={`${batch.ownerId}-${i}`} />
                            <S.Text colour={chooseDateColour(batch.expires)}>
                                Expired {format(batch.expires, 'do MMM')}
                            </S.Text>
                            <S.Text>OwnerId: {batch.ownerId}</S.Text>
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
            <Button secondary>Cancel</Button>
        </S.Wrapper>
    );
};
