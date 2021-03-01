import { FC, useState, Fragment } from 'react';
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';
import ReactModal from 'react-modal';

import deleteIcon from '../../assets/delete.svg';
import { BatchType, FoodType, TenantType } from '../../types';
import { getColourFromDate, getOwnerFromId } from '../../utils';
import { EditItemAction } from '../PageEditFood/itemReducer';
import { ModalChangeDate } from '../ModalChangeDate';
import { ModalChangeOwner } from '../ModalChangeOwner';
import { ProfilePhoto } from '../ProfilePhoto';
import * as S from './styles';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

export type EditFoodServingsProps = {
    dispatch: (action: EditItemAction) => void;
    item: FoodType;
    tenants: TenantType[];
};

export const EditFoodServings: FC<EditFoodServingsProps> = ({ dispatch, item, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState<'date' | 'owner'>();
    const [selectedBatch, setSelectedBatch] = useState<BatchType>();

    const getDate = (date: Date) => {
        const difference = differenceInDays(date, Date.now());
        const isLessThanOneDay = difference === 0;
        const quantity = isLessThanOneDay ? 1 : parseInt(formatDistanceToNowStrict(date).split(' ')[0], 10);
        const unitOfTime = formatDistanceToNowStrict(date).split(' ')[1];
        const unit = isLessThanOneDay ? 'day' : unitOfTime;

        return `${quantity} ${unit}`;
    };

    const handleEditServingClick = (batch: BatchType, editMode: 'owner' | 'date') => () => {
        setIsModalOpen(true);
        setSelectedBatch(batch);
        setEditMode(editMode);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditMode(undefined);
    };

    const handleDateChange = (newDate: Date) => {
        if (selectedBatch) {
            dispatch({ type: 'CHANGE_BATCH_DATE', newDate, batchId: selectedBatch.id });
        }
        setIsModalOpen(false);
    };

    const handleDelete = (batchId: string) => () => {
        dispatch({ type: 'DECREMENT_BATCH_QUANTITY', batchId });
    };

    const handleOwnerClick = (ownerId: string, batchId: string) => {
        dispatch({ type: 'CHANGE_BATCH_OWNER', newOwnerId: ownerId, batchId });
        setIsModalOpen(false);
    };

    return (
        <>
            {selectedBatch && (
                <S.ReactModal isOpen={isModalOpen}>
                    {editMode === 'date' && (
                        <ModalChangeDate
                            expires={selectedBatch.expires}
                            handleDateChange={handleDateChange}
                            handleModalClose={handleModalClose}
                        />
                    )}

                    {editMode === 'owner' && (
                        <ModalChangeOwner
                            itemName={item.name}
                            unit={item.unit}
                            tenants={tenants}
                            selectedBatch={selectedBatch}
                            handleModalClose={handleModalClose}
                            handleOwnerChange={handleOwnerClick}
                        />
                    )}
                </S.ReactModal>
            )}

            <S.Grid>
                <S.ServingsTitles>Expires in</S.ServingsTitles>
                <S.ServingsTitles>Owner</S.ServingsTitles>
                <S.ServingsTitles>Delete</S.ServingsTitles>
                {item.batches.map((batch) => {
                    return [...Array(batch.quantity)].map((_, i) => {
                        const currentOwner = getOwnerFromId(batch.ownerId, tenants);

                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={`${batch.id}-${i}`}>
                                <S.DateButton
                                    secondary
                                    onClick={handleEditServingClick(batch, 'date')}
                                    borderColour={getColourFromDate(batch.expires)}
                                >
                                    <S.Text colour={getColourFromDate(batch.expires)}>{getDate(batch.expires)}</S.Text>
                                </S.DateButton>

                                {currentOwner.email && (
                                    <ProfilePhoto
                                        email={currentOwner.email}
                                        name={currentOwner.name}
                                        photo={currentOwner.photo}
                                        onClick={handleEditServingClick(batch, 'owner')}
                                    />
                                )}

                                <S.DeleteButton
                                    type="button"
                                    onClick={handleDelete(batch.id)}
                                    data-testid="deleteServing"
                                >
                                    <img src={deleteIcon} alt="delete" />
                                </S.DeleteButton>
                            </Fragment>
                        );
                    });
                })}
            </S.Grid>
        </>
    );
};
