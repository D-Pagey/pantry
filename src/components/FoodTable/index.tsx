import React, { FC, useContext, useState } from 'react';
import { format } from 'date-fns';
import arraySort from 'array-sort';

import { FoodTypes } from '../../types';
import { chooseDateColour } from '../../utils';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

type FoodTableTypes = {
    food: FoodTypes[];
    handleEdit: (params: FoodTypes) => () => void;
    setFood: (fridge: FoodTypes[]) => void;
};

export const FoodTable: FC<FoodTableTypes> = ({ food, handleEdit, setFood }) => {
    const [isDescendingOrder, setIsDescendingOrder] = useState(false);
    const { deleteFoodItem } = useContext(FirebaseContext);

    const expiresColumn = (item: FoodTypes): JSX.Element => (
        <S.Item colour={chooseDateColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
    );

    const sortData = (property: string) => (): void => {
        const sorted = arraySort([...food], property, { reverse: isDescendingOrder });

        setIsDescendingOrder(!isDescendingOrder);
        setFood(sorted);
    };

    const handleDelete = (id: string) => () => deleteFoodItem(id);

    return (
        <S.Wrapper>
            <table>
                <thead>
                    <tr>
                        <S.Header onClick={sortData('name')}>Name</S.Header>
                        <S.Header data-testid="foodTableCategoryColumn" onClick={sortData('category.label')}>
                            Categories
                        </S.Header>
                        <S.Header onClick={sortData('expires')}>Expires</S.Header>
                        <S.Header onClick={sortData('servings')}>Servings</S.Header>
                        <S.Header>Amend</S.Header>
                    </tr>
                </thead>
                <tbody>
                    {food.map((item, index) => (
                        <tr key={item.id}>
                            <td data-testid="foodTableName">{item.name}</td>
                            <td>
                                {item.categories.map((name) => (
                                    <S.Link key={name} to={`/food/${name.toLowerCase()}`}>
                                        {name}
                                    </S.Link>
                                ))}
                            </td>
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
                                    data-testid={`deleteButton${index}`}
                                >
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </S.Wrapper>
    );
};
