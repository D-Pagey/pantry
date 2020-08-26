import 'rc-checkbox/assets/index.css';
import React, { FC, useReducer, useContext } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { firebase, db } from '../../services';
import { BatchType, FoodType } from '../../types';
import { getColourFromDate } from '../../utils';
import { AuthContext } from '../ProviderAuth';
import { Button } from '../Button';
import { reducer } from './reducer';
import * as S from './styles';

type EditFoodServingsProps = {
    item: FoodType;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item }) => {
    const [state, dispatch] = useReducer(reducer, { updatedBatches: item.batches, count: 0 });
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const handleChecked = (batch: BatchType) => (event: any): void => {
        const dispatchType = event.target.checked ? 'checked' : 'unchecked';

        dispatch({ type: dispatchType, payload: batch });
    };

    const handleEditSubmit = () => {
        const batchesToUpdate = state.updatedBatches.reduce((acc, curr) => {
            if (curr.servings === 0) {
                return {
                    ...acc, 
                    [`fridge.${item.name}.batches.${curr.id}`]: firebase.firestore.FieldValue.delete()
                };
            }

            return {
                ...acc,
                [`fridge.${item.name}.batches.${curr.id}`]: curr
            };
        }, {});
        
        if (user) {
            db.collection('households')
            .doc(user.household)
            .update(batchesToUpdate)
            .then(() => {
                toast.success('Batch updated');
                history.push('/food');
            })
            .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const handleCancel = () => history.goBack();

    return (
        <S.Wrapper>
            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={`${batch.id}-${i}`}>
                            <S.Checkbox onChange={handleChecked(batch)} data-testid={batch.id} />
                            <S.Image src={batch.owner.photo} alt="owner" />
                            <S.Text colour={getColourFromDate(batch.expires)}>
                                Expired {format(batch.expires, 'do MMM')}
                            </S.Text>
                        </S.Item>
                    ));
                })}
            </S.List>

            <Button
                disabled={state.count === 0}
                margin="0 0 1rem"
                onClick={handleEditSubmit}
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
