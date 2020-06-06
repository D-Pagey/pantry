import React, { FC, useContext } from 'react';
import { CategoryType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import { Layout } from '../Layout';
import * as S from './styles';

export const PageProfile: FC = () => {
    const { categories, signOut, user } = useContext(FirebaseContext);

    return (
        <Layout title="Profile">
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
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category: CategoryType) => (
                            <tr key={category.name}>
                                <td>{category.name}</td>
                                <td>
                                    <S.ColourSquare colour={category.colour} />
                                </td>
                                <td>{category.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};
