import { FC, useState, useReducer } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';

import { TenantType } from '../../types';
import { Button } from '../Button';
import editImage from './edit.svg';
import deleteImage from './delete.svg';
import filterImage from './filter.svg';
import { reducer, initialState, SortOptions, init } from './reducer';
import * as S from './styles';

export type MobileFoodMenuProps = {
    handleFoodDelete: () => void;
    tenants: TenantType[];
    editingItemName?: string;
};

export const MobileFoodMenu: FC<MobileFoodMenuProps> = ({ editingItemName, handleFoodDelete, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState, (initialState) => init(initialState, tenants));
    const history = useHistory();

    const handleSortByClick = (sortOption: SortOptions) => () => {
        dispatch({
            type: 'CHANGE_SORTED_BY',
            sortBy: sortOption
        });
    };

    const handleShowExpiredClick = (onlyShowExpired: boolean) => () => {
        dispatch({
            type: 'CHANGE_SHOW_ONLY_EXPIRED',
            onlyShowExpired
        });
    };

    const handleOwnerToggleClick = (ownerId: string) => () => {
        dispatch({
            type: 'TOGGLE_SELECTED_OWNER',
            ownerId
        });
    };

    const handleAddClick = () => history.push('/add');

    const handleFoodEdit = (): void => {
        history.push(`/${editingItemName}/edit`);
    };

    const handleCancelClick = () => {
        dispatch({
            type: 'RESET',
            tenants
        });

        setIsModalOpen(true);
    };

    return (
        <>
            <ReactModal isOpen={isModalOpen} style={S.ModalStyles}>
                <div>
                    <S.Title>Set Filters</S.Title>

                    <S.OptionWrapper>
                        <S.Subtitle>Owners:</S.Subtitle>
                        {tenants.map(({ uid, email, photo }) => (
                            <S.ProfilePhoto
                                key={uid}
                                photo={photo}
                                email={email}
                                selected={state.selectedOwners.includes(uid)}
                                onClick={handleOwnerToggleClick(uid)}
                            />
                        ))}
                    </S.OptionWrapper>

                    <S.OptionWrapper>
                        <S.Subtitle>Sort By:</S.Subtitle>
                        <S.Button onClick={handleSortByClick('date')} selected={state.sortBy === 'date'}>
                            Date
                        </S.Button>
                        <S.Button onClick={handleSortByClick('name')} selected={state.sortBy === 'name'}>
                            Name
                        </S.Button>
                    </S.OptionWrapper>

                    <S.OptionWrapper>
                        <S.Subtitle>Show:</S.Subtitle>
                        <S.Button onClick={handleShowExpiredClick(true)} selected={state.showOnlyExpiring}>
                            Expiring Soon
                        </S.Button>
                        <S.Button onClick={handleShowExpiredClick(false)} selected={!state.showOnlyExpiring}>
                            All Items
                        </S.Button>
                    </S.OptionWrapper>

                    <S.Subtitle>Categories:</S.Subtitle>
                    <p>Vegetables</p>

                    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button>Apply Filters</Button>
                </div>
            </ReactModal>

            <S.Wrapper>
                {!!editingItemName && (
                    <>
                        <S.FilterButton onClick={handleFoodDelete} data-testid="filterMenuButton">
                            <S.FilterImage src={deleteImage} alt="filter menu" />
                        </S.FilterButton>

                        <S.FilterButton onClick={handleFoodEdit} data-testid="filterMenuButton">
                            <S.FilterImage src={editImage} alt="filter menu" />
                        </S.FilterButton>
                    </>
                )}

                <S.FilterButton onClick={handleCancelClick} data-testid="filterMenuButton">
                    <S.FilterImage src={filterImage} alt="filter menu" />
                </S.FilterButton>

                <Button onClick={handleAddClick}>Add Item</Button>
            </S.Wrapper>
        </>
    );
};
