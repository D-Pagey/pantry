import React, { FC, useContext } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';

import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { db, firebase } from '../../services';
import deleteIcon from '../../assets/delete.svg';
import { AuthContext } from '../ProviderAuth';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

type EditFoodServingsProps = {
    item: FoodType;
    tenants: TenantType[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBatch: ({ name, batch }: { name: string; batch: BatchType }) => void;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item, tenants, updateBatch }) => {
    const { user } = useContext(AuthContext);

    const deleteBatch = ({ name, batchId }: { name: string; batchId: string }): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({
                    [`fridge.${name}.batches.${batchId}`]: firebase.firestore.FieldValue.delete()
                })
                .then(() => toast.success(`Batch deleted for ${name}`))
                .catch(() => toast.error('Error with deleting batch'));
        }
    };

    const handleDelete = (batch: BatchType) => () => {
        const updatedServings = batch.servings - 1;

        if (updatedServings === 0) {
            deleteBatch({ name: item.name, batchId: batch.id });
        } else {
            updateBatch({ name: item.name, batch: { ...batch, servings: updatedServings } });
        }
    };

    return (
        <S.Wrapper>
            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={`${batch.id}-${i}`}>
                            <S.Text colour={getColourFromDate(batch.expires)}>
                                Expires in {formatDistanceToNowStrict(batch.expires)}
                            </S.Text>
                            <ProfilePhoto owner={getOwnerFromId(batch.ownerId, tenants)} width="50px" />
                            <button type="button" onClick={handleDelete(batch)}>
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </S.Item>
                    ));
                })}
            </S.List>
        </S.Wrapper>
    );
};
