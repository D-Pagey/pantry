import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import arraySort from 'array-sort';
import { toast } from 'react-toastify';

import { db } from '../../services';
import { FoodCardType } from '../../types';
import { getExpiringItems, filterFridgeByCategory } from '../../utils';
import { Loading } from '../Loading';
import { Layout } from '../Layout';
import { CategoryFilter } from '../CategoryFilter';
import { ExpiringPill } from '../ExpiringPill';
import { FoodCard } from '../FoodCard';
import { DisposeFood } from '../DisposeFood';
import { AuthContext } from '../ProviderAuth';
import * as S from './styles';

type PageFoodProps = {
    fridge?: FoodCardType[];
};

export const PageFood: FC<PageFoodProps> = ({ fridge }) => {
    const [selectedFood, setSelectedFood] = useState<FoodCardType[]>();
    const [category, setCategory] = useState('all');
    const [isExpiring, setIsExpiring] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodCardType | undefined>();
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const deleteFoodItem = (id: string): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({ [`fridge.${id}.batches`]: [] })
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
        history.push(`/${editingItem?.name}/edit`, editingItem);
    };

    const handleFoodClick = (item: FoodCardType) => (): void => {
        if (!editingItem || editingItem.name !== item.name) setEditingItem(item);
        if (editingItem?.name === item.name) setEditingItem(undefined);
    };

    if (!fridge) return <Loading isLoading />;

    return (
        <Layout>
            <S.Wrapper>
                <CategoryFilter selected={category} setSelected={handleCategoryClick} />
                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem 0" />

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && selectedFood?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no {isExpiring && 'expiring'} food that falls under the category of {category}
                    </p>
                )}

                <S.FoodCardWrapper>
                    {selectedFood &&
                        arraySort(selectedFood, 'name').map((item: FoodCardType) => {
                            if (item.batches.length > 0) {
                                return (
                                    <FoodCard
                                        key={item.name}
                                        handleClick={handleFoodClick(item)}
                                        batches={item.batches}
                                        name={item.name}
                                        margin="0 0 1rem"
                                        isSelected={item.name === editingItem?.name}
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
                <DisposeFood name={editingItem.name} handleDelete={handleFoodDelete} handleEdit={handleFoodEdit} />
            )}
        </Layout>
    );
};
