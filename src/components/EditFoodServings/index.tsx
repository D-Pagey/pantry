import React, { FC, useContext, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import ReactModal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

import deleteIcon from '../../assets/delete.svg';
import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { updateBatch } from '../../services/firestore';
import { mediaQuery } from '../../tokens';
import { EditItemAction } from '../PageEditFood/itemReducer';
import { AuthContext } from '../ProviderAuth';
import { ModalChangeDate } from '../ModalChangeDate';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

type EditFoodServingsProps = {
    dispatch: (action: EditItemAction) => void;
    item: FoodType;
    tenants: TenantType[];
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ dispatch, item, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState<boolean>();
    const [selectedBatch, setSelectedBatch] = useState<BatchType>();
    const { user } = useContext(AuthContext);
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

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

    const handleDelete = (batchId: string) => () => {
        dispatch({ type: 'DECREMENT_BATCH_QUANTITY', batchId });
    };

    return (
        <>
            {selectedBatch && (
                <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
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

                                <S.DeleteButton
                                    type="button"
                                    onClick={handleDelete(batch.id)}
                                    data-testid="deleteServing"
                                >
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
