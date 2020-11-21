import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import arraySort from 'array-sort';
import { toast } from 'react-toastify';

import { db } from '../../services';
import { FoodType, TenantType } from '../../types';
import { getExpiringItems, filterFridgeByCategory, getCategoriesAndCounts } from '../../utils';
import { mediaQuery } from '../../tokens';
import { Layout } from '../Layout';
import { CategoryFilterMobile } from '../CategoryFilterMobile';
import { CategoryFilterDesktop } from '../CategoryFilterDesktop';
import { ExpiringPill } from '../ExpiringPill';
import { FoodCard } from '../FoodCard';
import { FoodOptions } from '../FoodOptions';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

type PageFoodProps = {
    fridge: FoodType[];
    tenants: TenantType[];
};

export const PageFood: FC<PageFoodProps> = ({ fridge, tenants }) => {
    const [selectedFood, setSelectedFood] = useState<FoodType[]>();
    const [category, setCategory] = useState('all');
    const [isExpiring, setIsExpiring] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodType | undefined>();
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const isTabletOrLarger = useMediaQuery({
        query: mediaQuery.tablet
    });

    const deleteFoodItem = (name: string): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({ [`fridge.${name}.batches`]: {} })
                .then(() => toast.error('Food deleted'))
                .catch(() => toast.error('Error with deleting food'));
        }
    };

    const filterFood = useCallback(
        (selectedCategory: string, expiring: boolean): void => {
            if (fridge) {
                const isCategoryAll = selectedCategory === 'all';

                if (isCategoryAll && !expiring) {
                    setSelectedFood(fridge);
                }

                if (isCategoryAll && expiring) {
                    const allExpiringItems = getExpiringItems(fridge);
                    setSelectedFood(allExpiringItems);
                }

                if (!isCategoryAll && !expiring) {
                    const filtered = filterFridgeByCategory(fridge, selectedCategory);
                    setSelectedFood(filtered);
                }

                if (!isCategoryAll && expiring) {
                    const filtered = filterFridgeByCategory(fridge, selectedCategory);
                    const expiredFilteredItems = getExpiringItems(filtered);
                    setSelectedFood(expiredFilteredItems);
                }
            }
        },
        [fridge]
    );

    useEffect(() => {
        if (fridge) {
            filterFood(category, isExpiring);
        }
    }, [fridge, category, isExpiring, filterFood]);

    const handleCategoryClick = (selectedCategory: string): void => {
        filterFood(selectedCategory, isExpiring);

        setCategory(selectedCategory);
    };

    const handleExpiringClick = (): void => {
        filterFood(category, !isExpiring);

        setIsExpiring(!isExpiring);
    };

    const handleFoodDelete = (): void => {
        if (editingItem?.name) {
            deleteFoodItem(editingItem.name);
            setEditingItem(undefined);
        }
    };

    const handleFoodEdit = (): void => {
        history.push(`/${editingItem?.name}/edit`);
    };

    const handleFoodClick = (item: FoodType) => (): void => {
        if (!editingItem || editingItem.name !== item.name) setEditingItem(item);
        if (editingItem?.name === item.name) setEditingItem(undefined);
    };

    return (
        <Layout title="Your Food:">
            <S.Wrapper>
                {isTabletOrLarger ? (
                    <CategoryFilterDesktop
                        categories={getCategoriesAndCounts(fridge)}
                        selected={category}
                        handleCategoryClick={handleCategoryClick}
                    />
                ) : (
                    <CategoryFilterMobile selected={category} setSelected={handleCategoryClick} />
                )}

                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem" />

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && selectedFood?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no {isExpiring && 'expiring'} food that falls under the category of {category}
                    </p>
                )}

                <S.FoodCardWrapper>
                    {selectedFood &&
                        arraySort(selectedFood, 'name').map((item: FoodType) => {
                            if (item.batches.length > 0) {
                                return (
                                    <FoodCard
                                        handleClick={handleFoodClick(item)}
                                        isSelected={item.name === editingItem?.name}
                                        item={item}
                                        key={item.name}
                                        margin="0 0 1rem"
                                        tenants={tenants}
                                    />
                                );
                            }

                            return null;
                        })}
                </S.FoodCardWrapper>

                <S.Button size="sm">
                    <S.RouterLink to="/add">Add Item</S.RouterLink>
                </S.Button>
            </S.Wrapper>

            {editingItem && (
                <FoodOptions name={editingItem.name} handleDelete={handleFoodDelete} handleEdit={handleFoodEdit} />
            )}
        </Layout>
    );
};
