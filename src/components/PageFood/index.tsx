import { FC, useContext, useState, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import { FoodType, TenantType } from '../../types';
import { deleteItemBatches } from '../../services/firestore';
import { FilterState } from '../MobileFoodMenu/filterReducer';
import { mediaQuery } from '../../tokens';
import { Layout } from '../Layout';
import { FoodCard } from '../FoodCard';
import { AuthContext } from '../ProviderAuth';
import { FilterButton } from '../FilterButton';
import { MobileFoodMenu } from '../MobileFoodMenu';
import { foodReducer, initialFoodState, init } from './foodReducer';
import { getOwnersButtonText } from './utils';
import * as S from './styles';

type PageFoodProps = {
    categories: string[];
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageFood: FC<PageFoodProps> = ({ categories, fridge, tenants }) => {
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const [foodState, dispatch] = useReducer(foodReducer, initialFoodState, (initialFoodState) =>
        init(initialFoodState, tenants, fridge)
    );
    const { food, filters } = foodState;
    const { user } = useContext(AuthContext);

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

    const handleApplyFilters = (filterState: FilterState) => {
        dispatch({ type: 'APPLY_FILTERS', filters: filterState, fridge });
    };

    return (
        <Layout>
            <S.Wrapper>
                <S.FilterButtonsWrapper>
                    <FilterButton>Sorted by {filters.sortBy}</FilterButton>
                    {filters.showOnlyExpiring && (
                        <FilterButton onClick={() => dispatch({ type: 'REMOVE_EXPIRING_FILTER', fridge })}>
                            Expiring Soon
                        </FilterButton>
                    )}
                    {filters.selectedOwners.length > 0 && filters.selectedOwners.length !== tenants.length && (
                        <FilterButton onClick={() => dispatch({ type: 'REMOVE_SELECTED_OWNERS', fridge, tenants })}>
                            {getOwnersButtonText(filters.selectedOwners, tenants)}
                        </FilterButton>
                    )}
                </S.FilterButtonsWrapper>
                {/* {isTabletOrLarger && (
                    <CategoryFilterDesktop
                        categories={getCategoriesAndCounts(fridge)}
                        selected={category}
                        handleCategoryClick={handleCategoryClick}
                    />
                )} */}

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
                    categories={categories}
                    foodPageFilters={filters}
                    handleFoodDelete={handleFoodDelete}
                    handleApplyFilters={handleApplyFilters}
                    tenants={tenants}
                    editingItemName={editingItem?.name}
                />
            )}
        </Layout>
    );
};
