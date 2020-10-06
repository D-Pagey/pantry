import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';

import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { db, firebase } from '../../services';
import deleteIcon from '../../assets/delete.svg';
import { AuthContext } from '../ProviderAuth';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

type EditFoodServingsProps = {
    item: FoodType;
    tenants: TenantType[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBatch: ({ name, batch }: { name: string; batch: BatchType }) => void;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item, tenants, updateBatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState<BatchType>();
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

    const handleChangeOwnerClick = (tenantId: string) => () => {
        if (tenantId !== selectedBatch?.ownerId) {
            const updatedBatch = selectedBatch && { ...selectedBatch, ownerId: tenantId };

            if (updatedBatch) updateBatch({ name: item.name, batch: updatedBatch });
        }

        setIsModalOpen(false);
    };

    const handleOwnerClick = (batch: BatchType) => () => {
        setIsModalOpen(true);
        setSelectedBatch(batch);
    };

    return (
        <S.Wrapper>
            <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                <h2>Change Owner</h2>
                <p>3 servings expiring in: 2 days</p>
                <p>Current Owner:</p>
                {selectedBatch && <ProfilePhoto owner={getOwnerFromId(selectedBatch.ownerId, tenants)} width="50px" />}
                <p>Click owner:</p>
                <ul>
                    {tenants.map((tenant) => (
                        <li key={tenant.uid}>
                            <ProfilePhoto
                                onClick={handleChangeOwnerClick(tenant.uid)}
                                owner={getOwnerFromId(tenant.uid, tenants)}
                                width="50px"
                            />
                        </li>
                    ))}
                </ul>

                <button onClick={() => setIsModalOpen(false)} type="button">
                    Close
                </button>
            </ReactModal>

            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={`${batch.id}-${i}`}>
                            <S.Text colour={getColourFromDate(batch.expires)}>
                                Expires in {formatDistanceToNowStrict(batch.expires)}
                            </S.Text>
                            <ProfilePhoto
                                onClick={handleOwnerClick(batch)}
                                owner={getOwnerFromId(batch.ownerId, tenants)}
                                width="50px"
                            />
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
