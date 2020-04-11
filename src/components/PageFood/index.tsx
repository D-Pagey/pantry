import React, { FC, useEffect, useContext, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import { DatabaseCategoryType, FoodTypes } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { FoodTable } from '../FoodTable';
import { Loading } from '../Loading';
import { Button } from '../Button';
import { filterFridge, swapIdsForNames, swapNamesForIds } from './utils';

export const PageFood: FC = () => {
    const [food, setFood] = useState<FoodTypes[]>([]);
    const [isValidCategory, setIsValidCategory] = useState<boolean | undefined>();
    const { category } = useParams();
    const { categories, fridge, updateFridge } = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        setIsValidCategory(undefined);
    }, [category]);

    useEffect(() => {
        if (fridge.length > 0 && categories.length > 0 && isValidCategory === undefined) {
            switch (category) {
                case 'all': {
                    setFood(swapIdsForNames(fridge, categories));
                    setIsValidCategory(true);
                    break;
                }
                default: {
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

                    break;
                }
            }
        }
    }, [category, categories, fridge, isValidCategory]);

    const handleDelete = (id: string) => (): void => {
        const filteredItems = fridge.filter((item: { id: string }) => item.id !== id);
        updateFridge({ key: 'fridge', values: filteredItems, isDeleting: true });
    };

    const handleEdit = (params: FoodTypes) => (): void => {
        const formatted = swapNamesForIds([params], categories);
        history.push('/add', formatted[0]);
    };

    if (isValidCategory === undefined) return <Loading isLoading />;
    if (isValidCategory === false) return <Redirect to="/not-found" />;

    return (
        <div>
            <h1>{category}</h1>

            {food.length === 0 ? (
                <p data-testid="pageFoodNoData">There is no food that falls under the category of {category}</p>
            ) : (
                <FoodTable handleDelete={handleDelete} handleEdit={handleEdit} food={food} setFood={setFood} />
            )}

            <Link to="/add">
                <Button>Add Item</Button>
            </Link>
        </div>
    );
};
