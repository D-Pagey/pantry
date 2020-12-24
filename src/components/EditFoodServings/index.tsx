import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';

import deleteIcon from '../../assets/delete.svg';
import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate } from '../../utils';
import { db, firebase } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { ModalChangeOwner } from '../ModalChangeOwner';
import { ModalChangeDate } from '../ModalChangeDate';
import * as S from './styles';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

type EditFoodServingsProps = {
    item: FoodType;
    tenants: TenantType[];
    updateBatch: ({ name, batch }: { name: string; batch: BatchType }) => void;
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item, tenants, updateBatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState<boolean>();
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

    const handleDateClick = (batch: BatchType) => () => {
        setIsModalOpen(true);
        setSelectedBatch(batch);
        setIsEditingDate(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsEditingDate(undefined);
    };

    const handleDateChange = (date: Date) => {
        if (selectedBatch) {
            const updatedBatch = { ...selectedBatch, expires: date };
            updateBatch({ name: item.name, batch: updatedBatch });
        }

        setIsModalOpen(false);
    };

    return (
        <>
            {selectedBatch && (
                <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                    {!isEditingDate && (
                        <ModalChangeOwner
                            closeModal={handleModalClose}
                            handleChangeOwnerClick={handleChangeOwnerClick}
                            ownerId={selectedBatch.ownerId}
                            tenants={tenants}
                        />
                    )}

                    {isEditingDate && (
                        <ModalChangeDate
                            expires={selectedBatch.expires}
                            handleDateChange={handleDateChange}
                            handleModalClose={handleModalClose}
                        />
                    )}
                </ReactModal>
            )}

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={`${batch.id}-${i}`}>
                            <S.DateButton
                                secondary
                                onClick={handleDateClick(batch)}
                                borderColour={getColourFromDate(batch.expires)}
                            >
                                <S.Text colour={getColourFromDate(batch.expires)}>
                                    Expires in {formatDistanceToNowStrict(batch.expires)}
                                </S.Text>
                            </S.DateButton>

                            <S.DeleteButton type="button" onClick={handleDelete(batch)} data-testid="deleteServing">
                                <img src={deleteIcon} alt="delete" />
                            </S.DeleteButton>
                        </S.Item>
                    ));
                })}
            </S.List>
        </>
    );
};
