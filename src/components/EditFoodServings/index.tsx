import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { db, firebase } from '../../services';
import deleteIcon from '../../assets/delete.svg';
import { AuthContext } from '../ProviderAuth';
import { ProfilePhoto } from '../ProfilePhoto';
import { ModalChangeOwner } from '../ModalChangeOwner';
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

    const handleOwnerClick = (batch: BatchType) => () => {
        setIsModalOpen(true);
        setSelectedBatch(batch);
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
        <S.Wrapper>
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
                        <>
                            <p>Edit the expiry date for this batch</p>
                            <DatePicker selected={selectedBatch.expires} onChange={handleDateChange} inline />
                            <button type="button" onClick={handleModalClose}>
                                Back
                            </button>
                        </>
                    )}
                </ReactModal>
            )}

            <S.Title>How many {item.name} servings are you eating?</S.Title>

            <S.List>
                {item.batches.map((batch) => {
                    return [...Array(batch.servings)].map((e, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.Item key={`${batch.id}-${i}`}>
                            <S.DateButton secondary onClick={handleDateClick(batch)} borderColour={getColourFromDate(batch.expires)}>
                                <S.Text colour={getColourFromDate(batch.expires)}>
                                    Expires in {formatDistanceToNowStrict(batch.expires)}
                                </S.Text>
                            </S.DateButton>
                            <ProfilePhoto
                                onClick={handleOwnerClick(batch)}
                                owner={getOwnerFromId(batch.ownerId, tenants)}
                                width="50px"
                            />
                            <S.DeleteButton type="button" onClick={handleDelete(batch)}>
                                <img src={deleteIcon} alt="delete" />
                            </S.DeleteButton>
                        </S.Item>
                    ));
                })}
            </S.List>
        </S.Wrapper>
    );
};
