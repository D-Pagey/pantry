import { FC, useContext, useState, Fragment } from 'react';
import { differenceInDays, formatDistanceToNowStrict } from 'date-fns';
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

export type EditFoodServingsProps = {
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

    const getDate = (date: Date) => {
        const difference = differenceInDays(date, Date.now());
        const isLessThanOneDay = difference === 0;
        const quantity = isLessThanOneDay ? 1 : parseInt(formatDistanceToNowStrict(date).split(' ')[0], 10);
        const unitOfTime = formatDistanceToNowStrict(date).split(' ')[1];
        const unit = isLessThanOneDay ? 'day' : unitOfTime;

        return `${quantity} ${unit}`;
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

            <S.Grid>
                <S.ServingsTitles>Expires in</S.ServingsTitles>
                <S.ServingsTitles>Owner</S.ServingsTitles>
                <S.ServingsTitles>Action</S.ServingsTitles>
                {item.batches.map((batch) => {
                    return [...Array(batch.quantity)].map((e, i) => {
                        const currentOwner = getOwnerFromId(batch.ownerId, tenants);
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={`${batch.id}-${i}`}>
                                <S.DateButton
                                    secondary
                                    onClick={handleDateClick(batch)}
                                    borderColour={getColourFromDate(batch.expires)}
                                >
                                    <S.Text colour={getColourFromDate(batch.expires)}>{getDate(batch.expires)}</S.Text>
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
                            </Fragment>
                        );
                    });
                })}
            </S.Grid>
        </>
    );
};
