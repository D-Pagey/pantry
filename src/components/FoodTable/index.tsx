import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import arraySort from 'array-sort';

import { CategoryType } from '../../types';
import { chooseDateColour, doesCategoryExist } from '../../utils';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import { FirebaseContext } from '../ProviderFirebase';
import { Button } from '../Button';
import * as S from './styles';

type itemTypes = {
    categories: string[];
    expires: Date;
    name: string;
    servings: number;
};

export const FoodTable = (): JSX.Element => {
    const [isValidCategory, setIsValidCategory] = useState<boolean>();
    const [data, setData] = useState([]);
    const history = useHistory();
    const [isDescendingOrder, setIsDescendingOrder] = useState(false);
    const { category } = useParams();
    const { expiringFood, categories, fridge, updateHousehold } = useContext(FirebaseContext);

    useEffect(() => {
        if (categories.length > 0 && category) {
            setIsValidCategory(doesCategoryExist(categories, category));
        }
    }, [categories, category]);

    useEffect(() => {
        switch (category) {
            case 'all':
                setData(fridge);
                break;
            case 'expiring':
                setData(expiringFood);
                break;
            default: {
                // find the id of the category label in the url
                const categoryId = categories.reduce((acc, curr: CategoryType) => {
                    if (curr.label.toLowerCase() === category?.toLowerCase()) return curr.id;

                    return acc;
                }, '');

                const hasMatchingId = (item: itemTypes) => {
                    return item.categories.reduce((acc, curr) => {
                        if (curr === categoryId) {
                            return true;
                        }

                        return acc;
                    }, false);
                };

                // if the food category id matches the table category id then keep it
                const filteredFridge = fridge.reduce((acc, curr) => {
                    if (hasMatchingId(curr)) {
                        return [...acc, curr];
                    }

                    return acc;
                }, []);

                setData(filteredFridge);
            }
        }
    }, [categories, category, fridge, expiringFood]);

    const handleDelete = (id: string) => (): void => {
        const filteredItems = fridge.filter((item: { id: string }) => item.id !== id);
        updateHousehold({ key: 'fridge', values: filteredItems, isDeleting: true });
    };

    const handleEdit = (params: itemTypes) => (): void => {
        history.push('/add', params);
    };

    const expiresColumn = (item: itemTypes): JSX.Element => (
        <S.Item colour={chooseDateColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
    );

    const sortData = (property: string) => (): void => {
        const sorted = arraySort([...data], property, { reverse: isDescendingOrder });

        setIsDescendingOrder(!isDescendingOrder);
        setData(sorted);
    };

    if (isValidCategory === false) return <Redirect to="/not-found" />;

    return (
        <div>
            <h1>{category}</h1>

            <table>
                <thead>
                    <tr>
                        <S.Header onClick={sortData('name')}>Name</S.Header>
                        <S.Header onClick={sortData('expires')}>Expires</S.Header>
                        <S.Header onClick={sortData('servings')}>Servings</S.Header>
                        <S.Header>Amend</S.Header>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: itemTypes) => (
                        <tr key={item.name}>
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
                                    onClick={handleDelete(item.name)}
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
};
