import React, { FC, useEffect, useContext, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import arraySort from 'array-sort';

import { Batches } from '../../fixtures';
import { DatabaseCategoryType, FoodTypes } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { ExpiringPill } from '../ExpiringPill';
import { CategoryFilter } from '../CategoryFilter';
// import { FoodTable } from '../FoodTable';
import { FoodCard } from '../FoodCard';
import { Loading } from '../Loading';
import { Layout } from '../Layout';
import { Button } from '../Button';
import { filterFridge, swapIdsForNames } from './utils';
import * as S from './styles';

export const PageFood: FC = () => {
    const [food, setFood] = useState<FoodTypes[]>([]);
    const [isValidCategory, setIsValidCategory] = useState<boolean | undefined>();
    const [isExpiring, setIsExpiring] = useState(false);
    const { category } = useParams();
    const { categories, fridge, isCheckingAuth } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        // this seems wierd, reset just to rerun another func?
        setIsValidCategory(undefined);
    }, [category]);

    useEffect(() => {
        switch (category) {
            case 'all': {
                if (fridge.length !== 0 && categories.length !== 0) {
                    setFood(swapIdsForNames(fridge, categories));
                    setIsValidCategory(true);
                } else if (categories.length !== 0) {
                    setFood([]);
                    setIsValidCategory(true);
                }
                break;
            }
            default: {
                if (fridge.length !== 0 && categories.length !== 0) {
                    const currentCategory = categories.reduce((acc, curr: DatabaseCategoryType) => {
                        if (curr.name === category) {
                            return curr;
                        }

                        return acc;
                    }, undefined as DatabaseCategoryType | undefined);

                    if (currentCategory === undefined) {
                        setIsValidCategory(false);
                    } else {
                        const filtered = filterFridge(fridge, currentCategory);
                        const formatted = swapIdsForNames(filtered, categories);

                        setFood(formatted);
                        setIsValidCategory(true);
                    }
                }
                break;
            }
        }
    }, [category, categories, fridge, isValidCategory]);

    const handleExpiringClick = () => setIsExpiring(!isExpiring);

    // const handleEdit = (params: FoodTypes) => (): void => {
    //     const formatted = swapNamesForIds([params], categories);
    //     history.push('/add', formatted[0]);
    // };

    if (isValidCategory === undefined || isCheckingAuth) return <Loading isLoading />;
    if (isValidCategory === false) return <Redirect to="/not-found" />;

    return (
        <Layout>
            <CategoryFilter selected={category} setSelected={(select) => history.push(`/food/${select}`)} />

            <S.Wrapper>
                <ExpiringPill handleClick={handleExpiringClick} isEnabled={isExpiring} margin="1rem 0" />

                {food.length === 0 ? (
                    <p data-testid="pageFoodNoData">There is no food that falls under the category of {category}</p>
                ) : (
                    <>
                        {/* <FoodTable handleEdit={handleEdit} food={food} setFood={setFood} /> */}
                        {arraySort(food, 'name').map((item) => (
                            <FoodCard key={item.id} batches={Batches} name={item.name} margin="0 0 1rem" />
                        ))}
                    </>
                )}

                <Link to="/add">
                    <Button>Add Item</Button>
                </Link>
            </S.Wrapper>
        </Layout>
    );
};
