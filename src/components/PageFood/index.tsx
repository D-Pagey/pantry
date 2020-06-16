import React, { FC, useCallback, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import arraySort from 'array-sort';

import { FoodType } from '../../types';
import { getExpiringItems, filterFridgeByCategory } from '../../utils';
import { FirebaseContext } from '../ProviderFirebase';
import { Loading } from '../Loading';
import { Layout } from '../Layout';
import { CategoryFilter } from '../CategoryFilter';
import { ExpiringPill } from '../ExpiringPill';
import { FoodCard } from '../FoodCard';
import { Button } from '../Button';
import { DisposeFood } from '../DisposeFood';
import * as S from './styles';

export const PageFood: FC = () => {
    const [selectedFood, setSelectedFood] = useState<FoodType[]>();
    const [category, setCategory] = useState('all');
    const [isExpiring, setIsExpiring] = useState(false);
    const [editingItem, setEditingItem] = useState<string | undefined>();
    const { fridge, deleteFoodItem } = useContext(FirebaseContext);

    const filterFood = useCallback(
        (selectedCategory: string, expiring: boolean): void => {
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

    const handleFoodDelete = (option: string) => {
        deleteFoodItem(editingItem);
        setEditingItem(undefined);
    };

    const handleFoodClick = (food: string) => () => {
        if (!editingItem || editingItem !== food) setEditingItem(food);
        if (editingItem === food) setEditingItem(undefined);
    };

    if (!fridge) return <Loading isLoading />;

    return (
        <Layout>
            <CategoryFilter selected={category} setSelected={handleCategoryClick} />

            <S.Wrapper>
                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem 0" />

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && selectedFood?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no {isExpiring && 'expiring'} food that falls under the category of {category}
                    </p>
                )}

                {selectedFood &&
                    arraySort(selectedFood, 'name').map((item: FoodType) => {
                        if (item.batches.length > 0) {
                            return (
                                <FoodCard
                                    key={item.name}
                                    handleClick={handleFoodClick(item.name)}
                                    batches={item.batches}
                                    name={item.name}
                                    margin="0 0 1rem"
                                    isSelected={item.name === editingItem}
                                />
                            );
                        }

                        return null;
                    })}

                <Link to="/add">
                    <Button>Add Item</Button>
                </Link>
            </S.Wrapper>

            {editingItem && <DisposeFood handleClick={handleFoodDelete} />}
        </Layout>
    );
};
