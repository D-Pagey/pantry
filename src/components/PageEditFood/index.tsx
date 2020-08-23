import 'rc-checkbox/assets/index.css';
import React, { FC, useEffect, useState, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import arraySort from 'array-sort';
import { FoodType, BatchType } from '../../types';
import { Layout } from '../Layout';
import { getColourFromDate } from '../../utils';
import { Button } from '../Button';
import { reducer } from './reducer';
import * as S from './styles';

type PageEditFoodProps = {
    fridge?: FoodType[];
};

// How to edit multiple nested firebase keys
// if together then can we comma seperate them?
// if seperately, need to build multiple update firebase calls and Promise.all (check Trello ticket)

export const PageEditFood: FC<PageEditFoodProps> = ({ fridge }) => {
    const [item, setItem] = useState<FoodType>();
    const [state, dispatch] = useReducer(reducer, { count: 0, updatedBatches: [] });
    const history = useHistory();
    const { name } = useParams<{ name: string }>();

    console.log({ state });

    useEffect(() => {
        if (fridge) {
            const editingItem = fridge.filter((x) => x.name === name)[0];

            if (editingItem) {
                const sortedBatches = arraySort(editingItem.batches, 'expires');

                dispatch({ type: 'initialBatches', payload: sortedBatches });
                setItem({ ...editingItem, batches: sortedBatches });
            }
        }
    }, [fridge, name]);

    const handleChecked = (batch: BatchType) => (event: any): void => {
        const action = event.target.checked ? 'checked' : 'unchecked';

        dispatch({ type: action, payload: batch });
    };

    const handleEdit = () => {
        console.log({ edited: 'hello edit' });
        // updateFridge({ ...item, batches: state.updatedBatches });
        // history.push('/food');
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <Layout title="Edit servings">
            <S.Wrapper>
                {item && (
                    <>
                        <S.Title>How many {item.name} servings are you eating?</S.Title>

                        <S.List>
                            {item.batches.map((batch) => {
                                return [...Array(batch.servings)].map((e, i) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <S.Item key={`${batch.id}-${i}`}>
                                        <S.Checkbox onChange={handleChecked(batch)} data-testid={batch.id} />
                                        <S.Image src={batch.owner.photo} alt="owner" />
                                        <S.Text colour={getColourFromDate(batch.expires)}>
                                            Expiring {format(batch.expires, 'do MMM')}
                                        </S.Text>
                                    </S.Item>
                                ));
                            })}
                        </S.List>

                        <Button
                            // disabled={state.count === 0}
                            margin="0 0 1rem"
                            onClick={handleEdit}
                            data-testid="EditFoodServingsSubmit"
                        >
                            {/* Eat {state.count} {item.name} */}
                            Eat {item.name}
                        </Button>
                        <Button secondary onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                )}
            </S.Wrapper>
        </Layout>
    );
};
