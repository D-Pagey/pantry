import { FC, useContext, useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { deleteItemBatches } from '../../services/firestore';
import { DropdownOptionType, FoodType, TenantType } from '../../types';
import { formatDropdownOptions } from '../../utils';
import { mediaQuery } from '../../tokens';
import { Layout } from '../Layout';
import { FoodCard } from '../FoodCard';
import { AuthContext } from '../ProviderAuth';
import { FilterButton } from '../FilterButton';
import { MobileFoodMenu } from '../MobileFoodMenu';
import { Button } from '../Button';
import { foodReducer, initialFoodState, init, SortOptions } from './foodReducer';
import { getOwnersButtonText } from './utils';
import * as S from './styles';

type PageFoodProps = {
    categories: string[];
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageFood: FC<PageFoodProps> = ({ categories, fridge, tenants }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const [state, dispatch] = useReducer(foodReducer, initialFoodState, (initialFoodState) =>
        init(initialFoodState, tenants, fridge)
    );
    const { food, appliedFilters, pendingFilters } = state;
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const nonPendingTenants = tenants.filter((tenant) => tenant.houseRole !== 'pending');

    useEffect(() => {
        dispatch({ type: 'UPDATE_FRIDGE', fridge });
    }, [fridge]);

    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const handleFoodClick = (item: FoodType) => (): void => {
        if (!editingItem || editingItem.name !== item.name) setEditingItem(item);
        if (editingItem?.name === item.name) setEditingItem(undefined);
    };

    const handleFoodDelete = async () => {
        if (editingItem) {
            try {
                await deleteItemBatches(editingItem.name, user!.household!);
            } catch (error) {
                toast.error(`Something went wrong deleting ${editingItem.name}`);
            }
            setEditingItem(undefined);
        }
    };

    const handleOwnerToggleClick = (ownerId: string) => () => {
        dispatch({
            type: 'TOGGLE_SELECTED_OWNER',
            ownerId
        });
    };

    const handleCategoryChange = (category: DropdownOptionType | null) => {
        if (category !== null) {
            dispatch({
                type: 'CHANGE_CATEGORY',
                category: category.value
            });
        }
    };

    const handleCancelClick = () => {
        dispatch({ type: 'RESET' });

        setIsModalOpen(false);
    };

    const handleApplyFiltersClick = () => {
        dispatch({ type: 'APPLY_FILTERS', fridge: food });
        setIsModalOpen(false);
    };

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

    const handleFoodEdit = (): void => {
        if (editingItem) {
            history.push(`/${editingItem.name}/edit`);
        }
    };

    return (
        <Layout>
            <S.Wrapper>
                <S.ReactModal isOpen={isModalOpen}>
                    <S.Title>Set Filters</S.Title>

                    <S.Subtitle>Owners:</S.Subtitle>
                    <S.PhotoWrapper>
                        {nonPendingTenants.map(({ uid, email, photo }) => (
                            <S.ProfilePhoto
                                key={uid}
                                photo={photo}
                                email={email}
                                selected={pendingFilters.selectedOwners.includes(uid)}
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
                        <S.Button onClick={handleSortByClick('date')} selected={pendingFilters.sortBy === 'date'}>
                            Date
                        </S.Button>
                        <S.Button onClick={handleSortByClick('name')} selected={pendingFilters.sortBy === 'name'}>
                            Name
                        </S.Button>
                    </S.ButtonWrapper>

                    <S.Subtitle>Show:</S.Subtitle>
                    <S.ButtonWrapper>
                        <S.Button onClick={handleShowExpiredClick(true)} selected={pendingFilters.showOnlyExpiring}>
                            Expiring Soon
                        </S.Button>
                        <S.Button onClick={handleShowExpiredClick(false)} selected={!pendingFilters.showOnlyExpiring}>
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

                <S.TopButtonsWrapper>
                    <S.FilterButtonsWrapper>
                        <FilterButton>Sorted by {appliedFilters.sortBy}</FilterButton>
                        {appliedFilters.showOnlyExpiring && (
                            <FilterButton onClick={() => dispatch({ type: 'REMOVE_EXPIRING_FILTER', fridge })}>
                                Expiring Soon
                            </FilterButton>
                        )}
                        {appliedFilters.selectedOwners.length > 0 &&
                            appliedFilters.selectedOwners.length !== tenants.length && (
                                <FilterButton
                                    onClick={() => dispatch({ type: 'REMOVE_SELECTED_OWNERS', fridge, tenants })}
                                >
                                    {getOwnersButtonText(appliedFilters.selectedOwners, tenants)}
                                </FilterButton>
                            )}

                        {appliedFilters.category && (
                            <FilterButton onClick={() => dispatch({ type: 'REMOVE_CATEGORY', fridge })}>
                                {appliedFilters.category}
                            </FilterButton>
                        )}
                    </S.FilterButtonsWrapper>

                    {isTabletOrLarger && (
                        <div>
                            {editingItem && (
                                <>
                                    <Button colour="red" onClick={handleFoodDelete} secondary>
                                        Delete
                                    </Button>
                                    <Button colour="blue" onClick={handleFoodEdit} secondary>
                                        Edit
                                    </Button>
                                </>
                            )}
                            <Button onClick={() => setIsModalOpen(true)} secondary>
                                Filters
                            </Button>
                        </div>
                    )}
                </S.TopButtonsWrapper>

                {food.length === 0 ? (
                    <p>No food for the above filters, click the X to remove a filter</p>
                ) : (
                    <S.FoodCardGrid>
                        {food.map((item: FoodType) => (
                            <FoodCard
                                handleClick={handleFoodClick(item)}
                                isSelected={item.name === editingItem?.name}
                                item={item}
                                key={item.name}
                                tenants={tenants}
                            />
                        ))}
                    </S.FoodCardGrid>
                )}
            </S.Wrapper>

            {!isTabletOrLarger && (
                <MobileFoodMenu
                    handleFoodDelete={handleFoodDelete}
                    handleFoodEdit={handleFoodEdit}
                    showItemMenu={!!editingItem?.name}
                    openModal={() => setIsModalOpen(true)}
                />
            )}
        </Layout>
    );
};
