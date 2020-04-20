import React, { useContext } from 'react';
import { DatabaseCategoryType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

export const PageProfile = (): JSX.Element => {
    const { categories, signOut, user } = useContext(FirebaseContext);

    return (
        <div data-testid="pageProfile">
            <p>
                Welcome
                {user.name}
            </p>
            <p>
                Your email is:
                {user.email}
            </p>
            <button onClick={(): null => signOut()} data-testid="pageProfileButton" type="button">
                Sign Out
            </button>

            <h2>Your Food Categories</h2>

            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Colour</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: DatabaseCategoryType) => (
                        <tr key={category.name}>
                            <td>{category.name}</td>
                            <td>
                                <S.ColourSquare colour={category.colour} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
