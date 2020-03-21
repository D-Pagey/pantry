import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import { format } from 'date-fns';
import arraySort from 'array-sort';

import { chooseDateColour, doesCategoryExist } from '../../utils';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import { FirebaseContext } from '../ProviderFirebase';
import Button from '../Button';
import * as S from './styles';

type itemTypes = {
    category: { label: string; colour: string };
    expires: Date;
    id: string;
    name: string;
    servings: number;
};

const FoodTable = (): JSX.Element => {
    const [isValidCategory, setIsValidCategory] = useState<boolean>();
    const [data, setData] = useState([]);
    const history = useHistory();
    const [isDescendingOrder, setIsDescendingOrder] = useState(false);
    const { category } = useParams();
    const { categories, fridge, updateHousehold } = useContext(FirebaseContext);

    useEffect(() => {
        if (categories.length > 0 && category) {
            setIsValidCategory(doesCategoryExist(categories, category));
        }
    }, [categories, category]);

    useEffect(() => {
        if (data.length === 0) {
            const filteredData =
                category === 'all'
                    ? fridge
                    : fridge.filter((item: { category: { label: string; colour: string } }) => {
                          return item.category.label === category;
                      });

            setData(filteredData);
        }
    }, [data.length, category, fridge]);

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
                        {category === 'all' && (
                            <S.Header
                                data-testid="foodTableCategoryColumn"
                                onClick={sortData('category.label')}
                            >
                                Category
                            </S.Header>
                        )}
                        <S.Header onClick={sortData('servings')}>Servings</S.Header>
                        <S.Header>Amend</S.Header>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: itemTypes) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{expiresColumn(item)}</td>
                                {category === 'all' && (
                                    <td>
                                        <Link to={`/food/${item.category.label}`}>
                                            {item.category.label}
                                        </Link>
                                    </td>
                                )}
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
                        );
                    })}
                </tbody>
            </table>

            <Link to="/add">
                <Button>Add Item</Button>
            </Link>
        </div>
    );
};

export default FoodTable;
