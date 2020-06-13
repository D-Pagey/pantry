import React, { FC, useContext, useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import arraySort from 'array-sort';

import { FoodType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { Loading } from '../Loading';
import { Layout } from '../Layout';
import { CategoryFilter } from '../CategoryFilter';
import { ExpiringPill } from '../ExpiringPill';
import { FoodCard } from '../FoodCard';
// import { Button } from '../Button';
import * as S from './styles';

export const PageFood: FC = () => {
    const [selectedFood, setSelectedFood] = useState<FoodType[]>();
    const [category, setCategory] = useState('all');
    const [isExpiring, setIsExpiring] = useState(false);
    const { fridge } = useContext(FirebaseContext);

    useEffect(() => {
        if (!selectedFood && fridge?.length > 0) {
            setSelectedFood(fridge);
        }
    }, [fridge, selectedFood, setSelectedFood]);

    const handleFilter = (selectedCategory: string): void => {
        if (selectedFood) {
            const filtered = fridge.filter((item: FoodType) => item.category === selectedCategory);
            setSelectedFood(filtered);
        }

        if (selectedCategory === 'all') setSelectedFood(fridge);

        setCategory(selectedCategory);
    };

    const handleExpiringClick = (): void => {
        if (selectedFood && !isExpiring) {
            const expiringFoods = selectedFood.filter((item) => {
                return item.batches.reduce((acc, curr) => {
                    if (acc) return acc;

                    const difference = differenceInDays(curr.expires, new Date());

                    return difference < 2;
                }, false as boolean);
            });

            setSelectedFood(expiringFoods);
        } else if (isExpiring) {
            handleFilter(category);
        }

        setIsExpiring(!isExpiring);
    };

    if (!fridge) return <Loading isLoading />;

    return (
        <Layout>
            <CategoryFilter selected={category} setSelected={handleFilter} />

            <S.Wrapper>
                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem 0" />

                {fridge?.length === 0 && <p data-testid="pageFoodNoData">You have no food in your fridge.</p>}

                {fridge?.length !== 0 && selectedFood?.length === 0 && (
                    <p data-testid={`pageFoodNoData${category}`}>
                        There is no {isExpiring && 'expiring'} food that falls under the category of {category}
                    </p>
                )}

                {selectedFood &&
                    arraySort(selectedFood, 'name').map((item: FoodType) => (
                        <FoodCard key={item.name} batches={item.batches} name={item.name} margin="0 0 1rem" />
                    ))}

                {/* <Link to="/add">
                    <Button>Add Item</Button>
                </Link> */}
            </S.Wrapper>
        </Layout>
    );
};
