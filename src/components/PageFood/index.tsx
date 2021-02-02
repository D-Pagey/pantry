import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import { FoodType, TenantType } from '../../types';
import { deleteItemBatches } from '../../services/firestore';
import { filterFridgeByCategory, getCategoriesAndCounts } from '../../utils';
import { mediaQuery } from '../../tokens';
import { Layout } from '../Layout';
import { CategoryFilterDesktop } from '../CategoryFilterDesktop';
import { FoodCard } from '../FoodCard';
import { AuthContext } from '../ProviderAuth';
import { FilterButton } from '../FilterButton';
import { MobileFoodMenu } from '../MobileFoodMenu';
import { sortByOldestExpiryDate } from './utils';
import * as S from './styles';

type PageFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageFood: FC<PageFoodProps> = ({ fridge, tenants }) => {
    const [selectedFood, setSelectedFood] = useState<FoodType[]>();
    const [category, setCategory] = useState('all');
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const { user } = useContext(AuthContext);

    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const filterFood = useCallback(() => {
        const isCategoryAll = category === 'all';

        let filteredFridge = [...fridge];

        if (!isCategoryAll) {
            filteredFridge = filterFridgeByCategory(filteredFridge, category);
        }

        return filteredFridge;
    }, [category, fridge]);

    useEffect(() => {
        if (fridge.length > 0 && tenants.length > 0) {
            const sortedByDate = sortByOldestExpiryDate(filterFood());

            setSelectedFood(sortedByDate);
        }
    }, [category, filterFood, fridge, tenants]);

    const handleCategoryClick = (selectedCategory: string): void => {
        setCategory(selectedCategory);
    };

    const handleFoodClick = (item: FoodType) => (): void => {
        if (!editingItem || editingItem.name !== item.name) setEditingItem(item);
        if (editingItem?.name === item.name) setEditingItem(undefined);
    };

    const handleFoodDelete = async () => {
        if (editingItem) {
            try {
                await deleteItemBatches(editingItem?.name, user!.household!);
            } catch (error) {
                toast.error(`Something went wrong deleting ${editingItem.name}`);
            }
            setEditingItem(undefined);
        }
    };

    return (
        <Layout>
            <S.Wrapper>
                <S.FilterButtonsWrapper>
                    <FilterButton>Sorted by expiry date</FilterButton>
                </S.FilterButtonsWrapper>
                {isTabletOrLarger && (
                    <CategoryFilterDesktop
                        categories={getCategoriesAndCounts(fridge)}
                        selected={category}
                        handleCategoryClick={handleCategoryClick}
                    />
                )}

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && selectedFood?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no food that falls under the category of {category}
                    </p>
                )}

                <S.FoodCardGrid>
                    {selectedFood &&
                        selectedFood.map((item: FoodType) => {
                            if (item.batches.length > 0) {
                                return (
                                    <FoodCard
                                        handleClick={handleFoodClick(item)}
                                        isSelected={item.name === editingItem?.name}
                                        item={item}
                                        key={item.name}
                                        tenants={tenants}
                                    />
                                );
                            }

                            return null;
                        })}
                </S.FoodCardGrid>
            </S.Wrapper>

            {!isTabletOrLarger && (
                <MobileFoodMenu
                    handleFoodDelete={handleFoodDelete}
                    tenants={tenants}
                    editingItemName={editingItem?.name}
                />
            )}
        </Layout>
    );
};
