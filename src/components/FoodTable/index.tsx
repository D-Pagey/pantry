import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import arraySort from 'array-sort';

import { chooseDateColour } from '../../utils';
import { DatabaseCategoryType, FoodTypes } from '../../types';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import { FirebaseContext } from '../ProviderFirebase';
import { Button } from '../Button';
import * as S from './styles';

export const FoodTable = (): JSX.Element => {
    const [foodCategory, setFoodCategory] = useState<DatabaseCategoryType>();
    const [isValidCategory, setIsValidCategory] = useState<boolean>();
    const [data, setData] = useState([]);
    const [isDescendingOrder, setIsDescendingOrder] = useState(false);
    const history = useHistory();
    const { category } = useParams();
    const { categories, fridge, updateFridge } = useContext(FirebaseContext);

    useEffect(() => {
        if (categories.length > 0 && category && !foodCategory) {
            const currentCategory = categories.reduce((acc, curr: DatabaseCategoryType) => {
                if (curr.name === category) {
                    return curr;
                }

                return acc;
            }, undefined as DatabaseCategoryType | undefined);

            setFoodCategory(currentCategory);
            setIsValidCategory(currentCategory !== undefined);
        }
    }, [categories, category, foodCategory]);

    useEffect(() => {
        if (foodCategory) {
            switch (category) {
                case 'all':
                    setData(fridge);
                    break;
                default: {
                    const filteredData = fridge.filter((food: FoodTypes) => {
                        if (food.categories.includes(foodCategory.id)) {
                            return true;
                        }

                        return false;
                    });

                    setData(filteredData);
                    break;
                }
            }
        }
    }, [categories, category, foodCategory, fridge]);

    const handleDelete = (id: string) => (): void => {
        const filteredItems = fridge.filter((item: { id: string }) => item.id !== id);
        updateFridge({ key: 'fridge', values: filteredItems, isDeleting: true });
    };

    const handleEdit = (params: FoodTypes) => (): void => {
        history.push('/add', params);
    };

    const expiresColumn = (item: FoodTypes): JSX.Element => (
        <S.Item colour={chooseDateColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
    );

    const sortData = (property: string) => (): void => {
        const sorted = arraySort([...data], property, { reverse: isDescendingOrder });

        setIsDescendingOrder(!isDescendingOrder);
        setData(sorted);
    };

    if (isValidCategory === false) return <Redirect to="/not-found" />;

    if (isValidCategory) {
        return (
            <div>
                <h1>{category}</h1>

                <table>
                    <thead>
                        <tr>
                            <S.Header onClick={sortData('name')}>Name</S.Header>
                            <S.Header onClick={sortData('expires')}>Expires</S.Header>
                            {category === 'all' && (
                                <S.Header data-testid="foodTableCategoryColumn" onClick={sortData('category.label')}>
                                    Category
                                </S.Header>
                            )}
                            <S.Header onClick={sortData('servings')}>Servings</S.Header>
                            <S.Header>Amend</S.Header>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: FoodTypes) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{expiresColumn(item)}</td>
                                <td>{item.servings}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={handleEdit(item)}
                                        style={{ cursor: 'pointer', margin: '0 1rem 0 0' }}
                                        data-testid="editButton"
                                    >
                                        <img src={editIcon} alt="edit" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete(item.id)}
                                        style={{ cursor: 'pointer' }}
                                        data-testid="deleteButton"
                                    >
                                        <img src={deleteIcon} alt="delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link to="/add">
                    <Button>Add Item</Button>
                </Link>
            </div>
        );
    }

    return <div />;
};
