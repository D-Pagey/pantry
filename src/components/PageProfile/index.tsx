import React, { useContext } from 'react';
import { FirebaseContext } from '../ProviderFirebase';
import ReactTable from 'react-table';
import * as S from './styles';

const PageProfile = (): JSX.Element => {
    const { categories, signOut, user } = useContext(FirebaseContext);

    const getColumns = () => {
        return [
            {
                Header: 'Category',
                accessor: 'label'
            },
            {
                Header: 'Colour',
                id: 'colour',
                accessor: (item: { colour: string }): JSX.Element => (
                    <S.ColourSquare colour={item.colour} />
                )
            }
        ];
    };

    return (
        <div data-testid="pageProfile">
            <p>Welcome {user.name}</p>
            <p>Your email is: {user.email}</p>
            <button onClick={() => signOut()} data-testid="pageProfileButton">
                Sign Out
            </button>

            <h2>Your Food Categories</h2>

            <ReactTable columns={getColumns()} data={categories} defaultPageSize={10} />
        </div>
    );
};

export default PageProfile;
