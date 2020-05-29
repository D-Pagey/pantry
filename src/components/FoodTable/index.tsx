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
            <S.Table>
                <S.TableHead>
                    <tr>
                        <S.Header onClick={sortData('name')}>Name</S.Header>
                        <S.Header onClick={sortData('expires')}>Expires</S.Header>
                        <S.Header data-testid="foodTableCategoryColumn" onClick={sortData('category.label')}>
                            Categories
                        </S.Header>
                        <S.Header onClick={sortData('servings')}>Servings</S.Header>
                        <S.Header>Amend</S.Header>
                        <S.Header>Owner</S.Header>
                    </tr>
                </S.TableHead>
                <tbody>
                    {food.map((item, index) => (
                        <S.TableRow key={item.id} isOdd={index % 2 !== 0}>
                            <S.TableData data-testid="foodTableName">{item.name}</S.TableData>
                            <S.TableData>{expiresColumn(item)}</S.TableData>
                            <S.TableData>
                                {item.categories.map((name) => (
                                    <S.Link key={name} to={`/food/${name.toLowerCase()}`}>
                                        {name}
                                    </S.Link>
                                ))}
                            </S.TableData>
                            <S.TableData>{item.servings}</S.TableData>
                            <S.TableData>
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
                            </S.TableData>
                            <S.TableData>{item.owner}</S.TableData>
                        </S.TableRow>
                    ))}
                </tbody>
            </S.Table>
        </S.Wrapper>
    );
};
