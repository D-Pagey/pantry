import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

import deleteIcon from '../../assets/delete.svg';
import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { deleteBatch, updateBatch } from '../../services/firestore';
import { mediaQuery } from '../../tokens';
import { AuthContext } from '../ProviderAuth';
// import { ModalChangeOwner } from '../ModalChangeOwner';
import { ModalChangeDate } from '../ModalChangeDate';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

type EditFoodServingsProps = {
    item: FoodType;
    tenants: TenantType[];
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ item, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState<boolean>();
    const [selectedBatch, setSelectedBatch] = useState<BatchType>();
    const { user } = useContext(AuthContext);
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const handleDelete = (batch: BatchType) => async () => {
        const updatedServings = batch.quantity - 1;

        if (updatedServings === 0) {
            try {
                await deleteBatch({ name: item.name, batchId: batch.id, userHousehold: user!.household! });
                toast.success(`Batch deleted for ${name}`);
            } catch {
                toast.error('Error with deleting batch');
            }
        } else {
            await updateBatch({
                userHousehold: user!.household!,
                name: item.name,
                batch: { ...batch, quantity: updatedServings }
            });
        }
    };

    // const handleChangeOwnerClick = (tenantId: string) => () => {
    //     if (tenantId !== selectedBatch?.ownerId) {
    //         const updatedBatch = selectedBatch && { ...selectedBatch, ownerId: tenantId };

    //         if (updatedBatch) updateBatch({ name: item.name, batch: updatedBatch, userHousehold: user!.household! });
    //     }

    //     setIsModalOpen(false);
    // };

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
            updateBatch({ name: item.name, batch: updatedBatch, userHousehold: user!.household! });
        }

        setIsModalOpen(false);
    };

    return (
        <>
            {selectedBatch && (
                <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                    {/* {!isEditingDate && (
                        <ModalChangeOwner
                            closeModal={handleModalClose}
                            handleChangeOwnerClick={handleChangeOwnerClick}
                            ownerId={selectedBatch.ownerId}
                            tenants={tenants}
                        />
                    )} */}

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
                    return [...Array(batch.quantity)].map((e, i) => {
                        const currentOwner = getOwnerFromId(batch.ownerId, tenants);
                        return (
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

                                {isTabletOrLarger && currentOwner.email && (
                                    <ProfilePhoto
                                        email={currentOwner.email}
                                        name={currentOwner.name}
                                        photo={currentOwner.photo}
                                    />
                                )}

                                <S.DeleteButton type="button" onClick={handleDelete(batch)} data-testid="deleteServing">
                                    <img src={deleteIcon} alt="delete" />
                                </S.DeleteButton>
                            </S.Item>
                        );
                    });
                })}
            </S.List>
        </>
    );
};
