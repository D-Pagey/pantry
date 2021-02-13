import { FC } from 'react';

import { DropdownOptionType, TenantType } from '../../types';
import { formatDropdownOptions } from '../../utils';
import { SortOptions, FoodActions, FilterState } from '../PageFood/foodReducer';
import { Button } from '../Button';
import * as S from './styles';

type ModalFoodFiltersProps = {
    categories: string[];
    dispatch: (action: FoodActions) => void;
    filters: FilterState;
    handleApplyFiltersClick: () => void;
    handleCancelClick: () => void;
    isModalOpen: boolean;
    tenants: TenantType[];
};

export const ModalFoodFilters: FC<ModalFoodFiltersProps> = ({
    categories,
    dispatch,
    filters,
    handleApplyFiltersClick,
    handleCancelClick,
    isModalOpen,
    tenants
}) => {
    const { sortBy, showOnlyExpiring, selectedOwners } = filters;
    const nonPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

    const handleCategoryChange = (category: DropdownOptionType | null) => {
        if (category !== null) {
            dispatch({
                type: 'CHANGE_CATEGORY',
                category: category.value
            });
        }
    };

    const handleOwnerToggleClick = (ownerId: string) => () => {
        dispatch({
            type: 'TOGGLE_SELECTED_OWNER',
            ownerId
        });
    };

    const handleShowExpiredClick = (onlyShowExpired: boolean) => () => {
        dispatch({
            type: 'CHANGE_SHOW_ONLY_EXPIRED',
            onlyShowExpired
        });
    };

    const handleSortByClick = (sortOption: SortOptions) => () => {
        dispatch({
            type: 'CHANGE_SORTED_BY',
            sortBy: sortOption
        });
    };

    return (
        <S.ReactModal isOpen={isModalOpen}>
            <S.Title>Set Filters</S.Title>

            <S.Subtitle>Owners:</S.Subtitle>
            <S.PhotoWrapper>
                {nonPendingTenants.map(({ uid, email, photo }) => (
                    <S.ProfilePhoto
                        key={uid}
                        photo={photo}
                        email={email}
                        selected={selectedOwners.includes(uid)}
                        onClick={handleOwnerToggleClick(uid)}
                        data-testid={`photo-${uid}`}
                    />
                ))}
            </S.PhotoWrapper>

            <S.Subtitle>Category:</S.Subtitle>
            <S.ReactSelect
                options={formatDropdownOptions(categories)}
                onChange={handleCategoryChange}
                isSearchable
                isClearable
            />

            <S.Subtitle>Sort By:</S.Subtitle>
            <S.ButtonWrapper>
                <S.Button onClick={handleSortByClick('date')} selected={sortBy === 'date'}>
                    Date
                </S.Button>
                <S.Button onClick={handleSortByClick('name')} selected={sortBy === 'name'}>
                    Name
                </S.Button>
            </S.ButtonWrapper>

            <S.Subtitle>Show:</S.Subtitle>
            <S.ButtonWrapper>
                <S.Button onClick={handleShowExpiredClick(true)} selected={showOnlyExpiring}>
                    Expiring Soon
                </S.Button>
                <S.Button onClick={handleShowExpiredClick(false)} selected={!showOnlyExpiring}>
                    All Items
                </S.Button>
            </S.ButtonWrapper>

            <S.ButtonWrapper margin="2rem 0 0">
                <Button onClick={handleCancelClick} secondary>
                    Cancel
                </Button>
                <Button onClick={handleApplyFiltersClick}>Apply Filters</Button>
            </S.ButtonWrapper>
        </S.ReactModal>
    );
};
