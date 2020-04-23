import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../ProviderFirebase';
import { CategoryList } from '../CategoryList';
import { Loading } from '../Loading';
import { Button } from '../Button';

export const PageCategories = (): JSX.Element => {
    const { isAuthed, isCheckingAuth } = useContext(FirebaseContext);

    if (isCheckingAuth) return <Loading isLoading />;

    return (
        <div data-testid="pageCategories">
            {isAuthed && <CategoryList />}

            <Link to="/add">
                <Button>Add Item</Button>
            </Link>
        </div>
    );
};
