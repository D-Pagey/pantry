import 'react-table/react-table.css';
import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';
import ReactTable from 'react-table';
import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import { FirestoreContext } from '../ProviderFirestore';
import * as S from './styles';

type itemTypes = {
    category: string;
    expires: Date;
    id: string;
    name: string;
    servings: number;
};

const chooseColour = (date: Date): string => {
    const difference = differenceInDays(date, new Date());

    if (difference < 1) return 'red';
    if (difference <= 2) return 'blue';

    return 'black';
};

const FoodTable = (): JSX.Element => {
    const history = useHistory();
    const { category } = useParams();
    const { fridge, updateFridge } = useContext(FirestoreContext);

    const filteredData =
        category === 'all'
            ? fridge
            : fridge.filter((item: { category: string }) => {
                  return item.category === category;
              });

    const handleDelete = (id: string) => (): void => {
        const filteredItems = fridge.filter((item: { id: string }) => item.id !== id);
        updateFridge(filteredItems);
    };

    const handleEdit = (params: itemTypes) => (): void => {
        history.push('/add', params);
    };

    const expiresColumn = (item: itemTypes): JSX.Element => (
        <S.Item colour={chooseColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
    );

    const actionsColumn = (item: itemTypes): JSX.Element => (
        <div>
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
        </div>
    );

    const getColumns = (): { Header: string; id?: string }[] => {
        const baseColumns = [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                id: 'expires',
                Header: 'Expires',
                accessor: expiresColumn
            },
            {
                id: 'servings',
                Header: 'Servings',
                accessor: (item: itemTypes): number => item.servings
            },
            {
                id: 'amend',
                Header: 'Amend',
                accessor: actionsColumn
            }
        ];

        const categoryColumn = {
            id: 'category',
            Header: 'Category',
            accessor: (item: itemTypes): string => item.category,
            getHeaderProps: (): { 'data-testid': string } => ({
                'data-testid': 'foodTableCategoryColumn'
            })
        };

        const [name, expires, ...rest] = baseColumns;

        if (category === 'all') return [name, expires, categoryColumn, ...rest];

        return baseColumns;
    };

    return (
        <div>
            <h1>{category}</h1>

            <ReactTable columns={getColumns()} data={filteredData} defaultPageSize={10} />
        </div>
    );
};

export default FoodTable;
