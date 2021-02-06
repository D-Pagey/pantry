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
import * as S from './styles';

type PageFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageFood: FC<PageFoodProps> = ({ fridge, tenants }) => {
    // TODO: Delete this category state, move to reducer
    const [category] = useState('all');
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const [foodState, dispatch] = useReducer(foodReducer, initialFoodState, (initialFoodState) =>
        init(initialFoodState, tenants, fridge)
    );
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
                    <FilterButton>Sorted by {foodState.filters.sortBy}</FilterButton>
                    {foodState.filters.showOnlyExpiring && (
                        <FilterButton onClick={() => dispatch({ type: 'REMOVE_EXPIRING_FILTER', fridge })}>
                            Expiring Soon
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

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && foodState.food?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no food that falls under the category of {category}
                    </p>
                )}

                <S.FoodCardGrid>
                    {foodState.food.map((item: FoodType) => (
                        <FoodCard
                            handleClick={handleFoodClick(item)}
                            isSelected={item.name === editingItem?.name}
                            item={item}
                            key={item.name}
                            tenants={tenants}
                        />
                    ))}
                </S.FoodCardGrid>
            </S.Wrapper>

            {!isTabletOrLarger && (
                <MobileFoodMenu
                    handleFoodDelete={handleFoodDelete}
                    handleApplyFilters={handleApplyFilters}
                    tenants={tenants}
                    editingItemName={editingItem?.name}
                />
            )}
        </Layout>
    );
};
