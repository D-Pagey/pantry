/* eslint-disable react/display-name */
import 'react-table/react-table.css';
import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import ReactTable from 'react-table';
import deleteIcon from '../../assets/delete.svg';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

const chooseColour = (date: Date): string => {
    const difference = differenceInDays(date, new Date());

    if (difference < 1) return 'red';
    if (difference <= 2) return 'blue';

    return 'black';
};

type props = {
    match: {
        params: {
            category: string;
        };
    };
};

type itemTypes = {
    expires: Date;
    name: string;
    servings: number;
};

const FoodTable = ({ match }: props): JSX.Element => {
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

    const columns = [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            id: 'expires',
            Header: 'Expires',
            accessor: (item: itemTypes): JSX.Element => (
                <S.Item colour={chooseColour(item.expires)}>
                    {format(item.expires, 'do MMM')}
                </S.Item>
            )
        },
        {
            id: 'servings',
            Header: 'Servings',
            accessor: (item: itemTypes): number => item.servings
        },
        {
            id: 'amend',
            Header: 'Amend',
            accessor: (item: itemTypes): JSX.Element => (
                <button
                    type="button"
                    onClick={handleDelete(item.name)}
                    style={{ cursor: 'pointer' }}
                    data-testid="deleteButton"
                >
                    <img src={deleteIcon} alt="delete" />
                </button>
            )
        }
    ];

    return (
        <div>
            <h1>{match.params.category}</h1>

            <ReactTable columns={columns} data={filteredData} defaultPageSize={10} />
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
