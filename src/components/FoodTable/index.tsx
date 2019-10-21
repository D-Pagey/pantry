import 'react-table/react-table.css';
import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import ReactTable from 'react-table';
import deleteIcon from '../../assets/delete.svg';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

type FoodTableTypes = {
    match: {
        params: {
            category: string;
        };
    };
};

type itemTypes = {
    category: string;
    expires: Date;
    name: string;
    servings: number;
};

const chooseColour = (date: Date): string => {
    const difference = differenceInDays(date, new Date());

    if (difference < 1) return 'red';
    if (difference <= 2) return 'blue';

    return 'black';
};

const FoodTable = ({ match }: FoodTableTypes): JSX.Element => {
    const { category } = match.params;
    const { fridge, updateFridge } = useContext(FirebaseContext);

    const filteredData =
        category === 'all'
            ? fridge
            : fridge.filter((item: { category: string }) => {
                  return item.category === category;
              });

    const handleDelete = (name: string) => (): void => {
        const filteredItems = fridge.filter((item: { name: string }) => item.name !== name);
        updateFridge(filteredItems);
    };

    const expiresColumn = (item: itemTypes): JSX.Element => (
        <S.Item colour={chooseColour(item.expires)}>{format(item.expires, 'do MMM')}</S.Item>
    );

    const actionsColumn = (item: itemTypes): JSX.Element => (
        <button
            type="button"
            onClick={handleDelete(item.name)}
            style={{ cursor: 'pointer' }}
            data-testid="deleteButton"
        >
            <img src={deleteIcon} alt="delete" />
        </button>
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
            <h1>{match.params.category}</h1>

            <ReactTable columns={getColumns()} data={filteredData} defaultPageSize={10} />
        </div>
    );
};

FoodTable.propTypes = {
    match: shape({
        params: shape({
            category: string.isRequired
        }).isRequired
    }).isRequired
};

export default FoodTable;
