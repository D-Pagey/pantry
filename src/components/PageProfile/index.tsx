import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import deleteIcon from '../../assets/delete.svg';
import { CategoryType } from '../../types';
import { FirebaseContext } from '../ProviderFirebase';
import * as S from './styles';

export const PageProfile = (): JSX.Element => {
    const { categories, deleteCategory, signOut, user } = useContext(FirebaseContext);

    const handleDelete = (id: string, count: number) => (): void => {
        if (count !== 0) {
            toast.error('Not allowed to delete categories that have food items in');
        } else {
            deleteCategory(id);
        }
    };

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
                        <th>Count</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: CategoryType, index) => (
                        <tr key={category.name}>
                            <td>{category.name}</td>
                            <td>
                                <S.ColourSquare colour={category.colour} />
                            </td>
                            <td>{category.count}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={handleDelete(category.id, category.count)}
                                    style={{ cursor: 'pointer' }}
                                    data-testid={`profileCategoryDeleteButton${index}`}
                                >
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
