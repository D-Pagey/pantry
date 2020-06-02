import React, { FC, useEffect, useContext, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { DatabaseCategoryType, FoodTypes } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '../CategoryList';
import { FoodTable } from '../FoodTable';
import { Loading } from '../Loading';
import { Header } from '../Header';
import { Button } from '../Button';
import { filterFridge, swapIdsForNames, swapNamesForIds } from './utils';
import * as S from './styles';

export const PageFood: FC = () => {
    const [food, setFood] = useState<FoodTypes[]>([]);
    const [isValidCategory, setIsValidCategory] = useState<boolean | undefined>();
    const { category } = useParams();
    const { categories, fridge, isCheckingAuth } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
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

    const handleEdit = (params: FoodTypes) => (): void => {
        const formatted = swapNamesForIds([params], categories);
        history.push('/add', formatted[0]);
    };

    if (isValidCategory === undefined || isCheckingAuth) return <Loading isLoading />;
    if (isValidCategory === false) return <Redirect to="/not-found" />;

    return (
        <>
            <Header />
            <S.Wrapper>
                <h1>{`Food: ${category}`}</h1>

                <CategoryList />

                {food.length === 0 ? (
                    <p data-testid="pageFoodNoData">There is no food that falls under the category of {category}</p>
                ) : (
                    <FoodTable handleEdit={handleEdit} food={food} setFood={setFood} />
                )}

                <Link to="/add">
                    <Button>Add Item</Button>
                </Link>
            </S.Wrapper>
        </>
    );
};
